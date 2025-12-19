const TIMEOUT = 30000;

export const fetchApiData = async (
    url,
    method = 'GET',
    contentType = 'application/json',
    body = null,
    headers = {}
) => {
    try {
        if (!url || typeof url !== 'string') {
            throw new Error(`Invalid URL provided: ${url}`);
        }

        const baseUrl = process.env.NEXTAUTH_URL || 'https://hike.minterminds.in';
        const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

        const defaultHeaders = {
            'Content-Type': contentType,
            ...headers,
        };

        const config = {
            method,
            headers: defaultHeaders,
            cache: 'no-store',
            signal: AbortSignal.timeout(TIMEOUT),
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(fullUrl, config);

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};