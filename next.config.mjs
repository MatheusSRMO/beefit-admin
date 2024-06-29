/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                port: "",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
