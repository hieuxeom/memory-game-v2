export const setCookie = (name: string, value: string) => {
    return document.cookie = `${name}=${value}`
}

export const deleteCookie = (name: string) => {
    return document.cookie = `${name}=; Max-Age=0`
}