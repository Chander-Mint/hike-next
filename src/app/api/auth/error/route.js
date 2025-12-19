export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const error = searchParams.get("error");

    let message = "Something went wrong";

    switch (error) {
        case "CredentialsSignin":
            message = "Invalid username or password";
            break;
        case "AccessDenied":
            message = "Access denied";
            break;
        case "Configuration":
            message = "Server misconfiguration";
            break;
    }

    return new Response(JSON.stringify({
        success: false,
        error,
        message,
    }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
    });
}
