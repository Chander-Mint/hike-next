export function sendSuccess(data, status = 200) {
    return new Response(JSON.stringify({
        ...data, status
    }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

export function sendError(message, status = 500) {
    return new Response(JSON.stringify({
        error: message, status
    }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}