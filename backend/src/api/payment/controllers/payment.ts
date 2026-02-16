interface DonationPayload {
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
}

interface StripeCheckoutResponse {
  id?: string;
  url?: string;
  error?: {
    message?: string;
  };
}

interface ChapaCheckoutResponse {
  status?: string;
  message?: string;
  errors?: Array<{ message?: string; field?: string }>;
  data?: {
    checkout_url?: string;
  };
}

interface ChapaVerifyResponse {
  message?: string;
  [key: string]: unknown;
}

type DonationStatus =
  | "initiated"
  | "checkout_created"
  | "failed"
  | "verified"
  | "paid"
  | "cancelled";

interface DonationRecordData {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  currency: string;
  provider: "stripe" | "chapa";
  status: DonationStatus;
  providerReference?: string;
  checkoutUrl?: string;
  failureReason?: string;
  providerResponse?: unknown;
  paidAt?: Date;
  metadata?: unknown;
}

const getFrontendUrl = (ctx: any): string => {
  const configured = process.env.FRONTEND_URL;
  if (configured) return configured;

  const origin = ctx.request.header.origin;
  if (origin) return origin;

  return "http://localhost:3000";
};

const validatePayload = (payload: Partial<DonationPayload>) => {
  if (!payload.amount || payload.amount <= 0) {
    return "Invalid donation amount.";
  }

  if (!payload.donorName || !payload.donorEmail) {
    return "Donor name and email are required.";
  }

  return null;
};

const safeStringify = (value: unknown) => {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const normalizeEthiopianPhone = (phone?: string): string | undefined => {
  if (!phone) return undefined;

  const trimmed = phone.trim();
  if (!trimmed) return undefined;

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 9) return undefined;

  // Accept common ET formats and normalize to +2519XXXXXXXX
  if (digits.startsWith("251") && digits.length >= 12) {
    return `+${digits.slice(0, 12)}`;
  }
  if (digits.startsWith("09") && digits.length >= 10) {
    return `+251${digits.slice(1, 10)}`;
  }
  if (digits.startsWith("9") && digits.length >= 9) {
    return `+251${digits.slice(0, 9)}`;
  }

  // For other formats, omit to avoid gateway validation failures.
  return undefined;
};

const createDonationRecord = async (data: DonationRecordData) => {
  try {
    return await strapi.entityService.create("api::donation.donation", {
      data: data as any,
    });
  } catch (error) {
    strapi.log.error(`Failed to create donation record: ${safeStringify(error)}`);
    return null;
  }
};

const updateDonationRecord = async (
  donationId: string | number | undefined,
  data: Partial<DonationRecordData>
) => {
  if (!donationId) return;

  try {
    await strapi.entityService.update("api::donation.donation", donationId, {
      data: data as any,
    });
  } catch (error) {
    strapi.log.error(`Failed to update donation record ${donationId}: ${safeStringify(error)}`);
  }
};

const updateDonationByProviderReference = async (
  provider: "stripe" | "chapa",
  providerReference: string,
  data: Partial<DonationRecordData>
) => {
  try {
    const records = await strapi.entityService.findMany("api::donation.donation", {
      filters: {
        provider,
        providerReference,
      },
      sort: { createdAt: "desc" },
      limit: 1,
    });

    const record = Array.isArray(records) ? records[0] : records;
    if (!record?.id) return;

    await updateDonationRecord(record.id, data);
  } catch (error) {
    strapi.log.error(
      `Failed to update donation by provider reference ${providerReference}: ${safeStringify(error)}`
    );
  }
};

export default {
  async createStripeCheckout(ctx: any) {
    try {
      const secretKey = process.env.STRIPE_SECRET_KEY;
      if (!secretKey) {
        return ctx.internalServerError("Stripe is not configured.");
      }

      const payload = ctx.request.body as DonationPayload;
      const validationError = validatePayload(payload);
      if (validationError) {
        return ctx.badRequest(validationError);
      }

      const donationRecord = await createDonationRecord({
        donorName: payload.donorName,
        donorEmail: payload.donorEmail,
        donorPhone: payload.donorPhone,
        amount: payload.amount,
        currency: (payload.currency || "USD").toUpperCase(),
        provider: "stripe",
        status: "initiated",
        metadata: {
          source: "web",
        },
      });

      const normalizedCurrency = (payload.currency || "USD").toLowerCase();
      if (normalizedCurrency !== "usd") {
        await updateDonationRecord(donationRecord?.id, {
          status: "failed",
          failureReason: "Stripe checkout currently supports USD only.",
        });
        return ctx.badRequest("Stripe checkout currently supports USD only.");
      }

      const frontendUrl = getFrontendUrl(ctx);
      const successUrl =
        process.env.PAYMENT_SUCCESS_URL ||
        `${frontendUrl}/donate?payment=success&provider=stripe`;
      const cancelUrl =
        process.env.PAYMENT_CANCEL_URL ||
        `${frontendUrl}/donate?payment=cancelled&provider=stripe`;

      const form = new URLSearchParams();
      form.append("mode", "payment");
      form.append("payment_method_types[]", "card");
      form.append("customer_email", payload.donorEmail);
      form.append("line_items[0][quantity]", "1");
      form.append("line_items[0][price_data][currency]", normalizedCurrency);
      form.append(
        "line_items[0][price_data][unit_amount]",
        String(Math.round(payload.amount * 100))
      );
      form.append(
        "line_items[0][price_data][product_data][name]",
        "Donation to Oromia Majlis"
      );
      form.append(
        "line_items[0][price_data][product_data][description]",
        "Community support donation"
      );
      form.append("metadata[donorName]", payload.donorName);
      form.append("metadata[donorEmail]", payload.donorEmail);
      form.append("metadata[donorPhone]", payload.donorPhone || "");
      form.append("success_url", successUrl);
      form.append("cancel_url", cancelUrl);

      const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      });

      const stripeData = (await stripeResponse.json()) as StripeCheckoutResponse;
      if (!stripeResponse.ok || !stripeData?.url) {
        strapi.log.error("Stripe checkout init failed", stripeData);
        await updateDonationRecord(donationRecord?.id, {
          status: "failed",
          failureReason: stripeData?.error?.message || "Stripe checkout initialization failed.",
          providerResponse: stripeData,
        });
        return ctx.internalServerError(
          stripeData?.error?.message || "Failed to initialize Stripe checkout."
        );
      }

      await updateDonationRecord(donationRecord?.id, {
        status: "checkout_created",
        providerReference: stripeData.id,
        checkoutUrl: stripeData.url,
        providerResponse: stripeData,
      });

      ctx.send({ url: stripeData.url, sessionId: stripeData.id, donationId: donationRecord?.id });
    } catch (error) {
      strapi.log.error("Stripe checkout exception", error);
      return ctx.internalServerError("Failed to initialize Stripe checkout.");
    }
  },

  async createChapaCheckout(ctx: any) {
    try {
      const secretKey = process.env.CHAPA_SECRET_KEY;
      if (!secretKey) {
        return ctx.internalServerError("Chapa is not configured.");
      }

      const payload = ctx.request.body as DonationPayload;
      const validationError = validatePayload(payload);
      if (validationError) {
        return ctx.badRequest(validationError);
      }

      const donationRecord = await createDonationRecord({
        donorName: payload.donorName,
        donorEmail: payload.donorEmail,
        donorPhone: payload.donorPhone,
        amount: payload.amount,
        currency: (payload.currency || "ETB").toUpperCase(),
        provider: "chapa",
        status: "initiated",
        metadata: {
          source: "web",
        },
      });

      const normalizedCurrency = (payload.currency || "ETB").toUpperCase();
      if (normalizedCurrency !== "ETB") {
        await updateDonationRecord(donationRecord?.id, {
          status: "failed",
          failureReason: "Chapa checkout currently supports ETB only.",
        });
        return ctx.badRequest("Chapa checkout currently supports ETB only.");
      }

      const frontendUrl = getFrontendUrl(ctx);
      const successUrl =
        process.env.PAYMENT_SUCCESS_URL ||
        `${frontendUrl}/donate?payment=success&provider=chapa`;
      const callbackUrl =
        process.env.PAYMENT_CALLBACK_URL ||
        `${frontendUrl}/donate?payment=success&provider=chapa`;

      const [firstName, ...restName] = payload.donorName.trim().split(" ");
      const lastName = restName.join(" ");
      const txRef = `DON-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

      const chapaPayload = {
        amount: payload.amount.toFixed(2),
        currency: normalizedCurrency,
        email: payload.donorEmail,
        first_name: firstName || "Donor",
        last_name: lastName || "Supporter",
        phone_number: normalizeEthiopianPhone(payload.donorPhone),
        tx_ref: txRef,
        callback_url: callbackUrl,
        return_url: successUrl,
        customization: {
          title: "Majlis Donation",
          description: "Community support donation",
        },
      };

      const chapaResponse = await fetch("https://api.chapa.co/v1/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chapaPayload),
        signal: AbortSignal.timeout(25000),
      });

      const chapaData = (await chapaResponse.json()) as ChapaCheckoutResponse;
      if (!chapaResponse.ok || chapaData?.status !== "success") {
        const providerMessage =
          chapaData?.message ||
          chapaData?.errors?.[0]?.message ||
          "Failed to initialize Chapa checkout.";

        strapi.log.error(
          `Chapa checkout init failed: status=${chapaResponse.status} body=${safeStringify(chapaData)}`
        );

        const statusCode =
          chapaResponse.status >= 400 && chapaResponse.status < 500 ? 400 : 500;
        ctx.status = statusCode;
        ctx.body = {
          error: providerMessage,
          providerStatus: chapaResponse.status,
          providerResponse: chapaData,
        };

        await updateDonationRecord(donationRecord?.id, {
          status: "failed",
          providerReference: txRef,
          failureReason: providerMessage,
          providerResponse: chapaData,
        });
        return;
      }

      await updateDonationRecord(donationRecord?.id, {
        status: "checkout_created",
        providerReference: txRef,
        checkoutUrl: chapaData?.data?.checkout_url,
        providerResponse: chapaData,
      });

      ctx.send({ url: chapaData?.data?.checkout_url, txRef, donationId: donationRecord?.id });
    } catch (error) {
      strapi.log.error(`Chapa checkout exception: ${safeStringify(error)}`);
      return ctx.internalServerError(
        "Failed to initialize Chapa checkout. Please verify network access and callback URLs."
      );
    }
  },

  async verifyChapaTransaction(ctx: any) {
    try {
      const secretKey = process.env.CHAPA_SECRET_KEY;
      if (!secretKey) {
        return ctx.internalServerError("Chapa is not configured.");
      }

      const txRef =
        (ctx.params?.txRef as string | undefined) ||
        (ctx.request.body?.txRef as string | undefined);

      if (!txRef) {
        return ctx.badRequest("txRef is required.");
      }

      const verifyResponse = await fetch(
        `https://api.chapa.co/v1/transaction/verify/${txRef}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const verifyData = (await verifyResponse.json()) as ChapaVerifyResponse;
      if (!verifyResponse.ok) {
        await updateDonationByProviderReference("chapa", txRef, {
          status: "failed",
          failureReason: verifyData?.message || "Chapa verification failed.",
          providerResponse: verifyData,
        });
        return ctx.internalServerError(verifyData?.message || "Verification failed.");
      }

      const verifyDataAny = verifyData as any;
      const chapaStatus = verifyDataAny?.data?.status || verifyDataAny?.status;
      const isPaid =
        typeof chapaStatus === "string" &&
        ["success", "successful", "completed"].includes(chapaStatus.toLowerCase());

      await updateDonationByProviderReference("chapa", txRef, {
        status: isPaid ? "paid" : "verified",
        paidAt: isPaid ? new Date() : undefined,
        providerResponse: verifyData,
      });

      ctx.send(verifyData);
    } catch (error) {
      strapi.log.error("Chapa verification exception", error);
      return ctx.internalServerError("Failed to verify Chapa transaction.");
    }
  },
};

