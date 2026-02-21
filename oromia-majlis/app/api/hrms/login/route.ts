interface HrmsLoginPayload {
  email: string;
  password: string;
}

interface HrmsAuthResponse {
  accessToken?: string;
  redirectTo?: string;
  user?: {
    roles?: string[];
    [key: string]: unknown;
  };
  message?: string;
}

const getHrmsApiBaseUrl = () =>
  process.env.HRMS_API_BASE_URL || "http://localhost:4000/api/v1";

const getHrmsWebBaseUrl = () =>
  process.env.HRMS_FRONTEND_URL ||
  process.env.HRMS_WEB_BASE_URL ||
  "http://localhost:8080";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HrmsLoginPayload;
    if (!body.email || !body.password) {
      return Response.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${getHrmsApiBaseUrl()}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as HrmsAuthResponse;
    if (!response.ok || !data?.accessToken) {
      return Response.json(
        { error: data?.message || "Invalid credentials." },
        { status: response.status || 401 }
      );
    }

    const isHalalBusiness = data.user?.roles?.includes("HALAL_BUSINESS");
    const redirectPath = data.redirectTo || (isHalalBusiness ? "/halal/dashboard" : "/dashboard");
    const redirectUrl = `${getHrmsWebBaseUrl()}/auth/callback?redirect=${encodeURIComponent(
      redirectPath
    )}#accessToken=${encodeURIComponent(data.accessToken)}`;

    return Response.json({ redirectUrl, user: data.user });
  } catch (error) {
    console.error("HRMS login proxy error:", error);
    return Response.json(
      { error: "Unable to connect to authentication service." },
      { status: 500 }
    );
  }
}

