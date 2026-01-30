export function setCookie(name: string, key: string, daysToExpire: number) {
    const date = new Date();
    date.setDate(date.getDate() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires: string = "expires=" + date.toUTCString();
    document.cookie = `${name}=${key}; ${expires}; path=/`;
}

export function logCookie() {
    console.log(document.cookie);
}