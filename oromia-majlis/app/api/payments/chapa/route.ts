interface ChapaDonationPayload {
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChapaDonationPayload;
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(`${strapiUrl}/api/payments/chapa/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok || !data?.url) {
      console.error("Chapa proxy error:", data);
      return Response.json(
        { error: data?.error || "Failed to initialize Chapa checkout." },
        { status: response.status || 500 }
      );
    }

    return Response.json({
      url: data.url,
      txRef: data.txRef,
    });
  } catch (error) {
    console.error("Chapa checkout creation failed:", error);
    return Response.json(
      { error: "Failed to initialize Chapa checkout." },
      { status: 500 }
    );
  }
}

