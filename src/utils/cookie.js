export const getCookie = (name) => {
  const cookieString = typeof document !== "undefined" ? document.cookie : "";
  const cookieArray = cookieString.split("; ");

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i];
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return undefined;
};

export const setCookie = (name, value, options) => {
  options = { path: "/", ...options };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie = `${name}=${value}`;
  for (let optionKey in options) {
    updatedCookie += `; ${optionKey}=${options[optionKey]}`;
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, "", { expires: new Date(0) });
};
