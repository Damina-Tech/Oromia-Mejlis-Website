const REGISTRATION_PURPOSES = [
  "halal_business_certificate",
  "halal_competency_certificate",
] as const;

interface HrmsRegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  registrationPurpose?: string;
}

interface HrmsRegisterResponse {
  accessToken?: string;
  user?: {
    roles?: string[];
    [key: string]: unknown;
  };
  message?: string;
}

const getHrmsApiBaseUrl = () =>
  process.env.HRMS_API_BASE_URL || "http://localhost:4000/api/v1";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HrmsRegisterPayload;
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return Response.json(
        { error: "firstName, lastName, email, and password are required." },
        { status: 400 }
      );
    }

    if (
      !body.registrationPurpose ||
      !REGISTRATION_PURPOSES.includes(
        body.registrationPurpose as (typeof REGISTRATION_PURPOSES)[number]
      )
    ) {
      return Response.json(
        {
          error:
            "registrationPurpose is required and must be halal_business_certificate or halal_competency_certificate.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${getHrmsApiBaseUrl()}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as HrmsRegisterResponse;
    if (!response.ok) {
      return Response.json(
        { error: data?.message || "Registration failed." },
        { status: response.status || 400 }
      );
    }

    return Response.json({
      success: true,
      message: "Registration successful. Please login.",
    });
  } catch (error) {
    console.error("HRMS register proxy error:", error);
    return Response.json(
      { error: "Unable to connect to registration service." },
      { status: 500 }
    );
  }
}

