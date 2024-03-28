export const setCookie = (name, value) => {
    return document.cookie = `${name}=${value}`;
};
export const deleteCookie = (name) => {
    return document.cookie = `${name}=; Max-Age=0`;
};
