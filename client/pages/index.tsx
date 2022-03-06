import React from "react";

interface indexProps {}
const GOOGLE_CLIENT_ID =
  "447468003621-bo93halvpkgln6maei5ds58nri94ed3m.apps.googleusercontent.com";
const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/cb&scope=openid%20email&response_type=code`;

const Index: React.FC<indexProps> = ({}) => {
  const handleLogin = () => {
    window.location.href = GOOGLE_URI;
  };
  return <button onClick={handleLogin}>Sign in with google</button>;
};

export default Index;
