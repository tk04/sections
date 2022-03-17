import Cookie from "js-cookie";

export const setToken = (token: string): void => {
  Cookie.set("token", token, {
    expires: 30,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
  });
};
