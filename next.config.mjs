/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: '3000',
                pathname: '/**'
            },
            {
                protocol: "https",
                hostname: "**.amazonaws.com",
            },
        ],
    },
};

export default nextConfig;
