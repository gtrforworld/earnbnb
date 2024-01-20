/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // nextScriptWorkers: true,
    },
    reactStrictMode: true,
    webpack: (config, { dev, isServer }) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        if (isServer) {
            config.externals.push('mysql');
        }
    
        return config;
    },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: process.env.NEXT_PUBLIC_API_ENDPOINT + '/:path*',
          },
        ]
    },
}

module.exports = nextConfig
