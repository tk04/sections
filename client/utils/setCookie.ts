import Cookie from "js-cookie";

export const setToken = (token: string) => {
  Cookie.set("token", token, {
    expires: 30,
    secure: false,
  });
};
