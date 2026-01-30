export function setCookie(name: string, key: string, daysToExpire: number) {
    const date = new Date();
    date.setDate(date.getDate() + (daysToExpire));
    const expires: string = "expires=" + date.toUTCString();
    document.cookie = `${name}=${key}; ${expires}; path=/`;
}

export function logCookie() {
    console.log(document.cookie);
}

export function deleteCookie(name: string) {
    setCookie(name, "", -1);
}

export function getCookie(name: string): string {
    return "hello";
}