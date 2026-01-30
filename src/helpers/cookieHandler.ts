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

export function getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split('; ');
    for (const c of cookies) {
        if (c.startsWith(nameEQ)) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}