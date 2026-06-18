interface StripeDonationPayload {
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StripeDonationPayload;

    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL ||
      process.env.STRAPI_URL ||
      "http://localhost:1337";
    const response = await fetch(`${strapiUrl}/api/payments/stripe/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok || !data?.url) {
      return Response.json(
        { error: data?.error || "Unable to create Stripe checkout URL." },
        { status: response.status || 500 }
      );
    }

    return Response.json({ url: data.url });
  } catch (error) {
    console.error("Stripe checkout creation failed:", error);
    return Response.json(
      { error: "Failed to initialize Stripe checkout." },
      { status: 500 }
    );
  }
}

