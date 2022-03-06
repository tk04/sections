/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    GOOGLE_URI: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${"447468003621-bo93halvpkgln6maei5ds58nri94ed3m.apps.googleusercontent.com"}&redirect_uri=http://localhost:3000/cb&scope=openid%20email%20profile&response_type=code&prompt=consent`,
  },
};

module.exports = nextConfig;
