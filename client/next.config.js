/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination:
            process.env.NODE_ENV === "production"
              ? `https://sections-be.herokuapp.com/graphql`
              : "http://localhost:4000/graphql",
        },
      ],
    };
  },
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "pbs.twimg.com"],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    GOOGLE_CLIENT_ID:
      "447468003621-bo93halvpkgln6maei5ds58nri94ed3m.apps.googleusercontent.com",
    GOOGLE_URI: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${"447468003621-bo93halvpkgln6maei5ds58nri94ed3m.apps.googleusercontent.com"}&redirect_uri=https://sections1.vercel.app/cb&scope=openid%20email%20profile&response_type=code&prompt=consent`,
    TWITTER_URI:
      "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TkZvYWJ2QkdaUW9FYlZjYmtSTTM6MTpjaQ&redirect_uri=https://sections1.vercel.app/twitter_cb&scope=tweet.read%20users.read%20follows.read&state=state&code_challenge=challenge&code_challenge_method=plain",
  },
};

module.exports = nextConfig;
