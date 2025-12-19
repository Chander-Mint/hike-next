export async function apiRequest(url, method = 'GET', contentType = 'application/json', body = null, headers = {}) {
    const config = {
        method,
        headers: { ...headers },
    };

    // Don't set Content-Type for FormData, let the browser set it with the correct boundary
    if (contentType && contentType !== 'multipart/form-data') {
        config.headers['Content-Type'] = contentType;
    }

    if (body) {
        config.body = body;
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error(`API Error (${method} ${url}):`, error.message);
        throw error;
    }
}