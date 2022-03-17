import Cookie from "js-cookie";
export const setToken = (token: string): void => {
  Cookie.set("token", token, {
    expires: 30, // 30 days
    secure: false,
  });
};
