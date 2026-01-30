/**
 * sets a cookie for a key value pair expiring in days.
 * @param name the key name
 * @param value the value 
 * @param daysToExpire days to expire from today.
 */
export function setCookie(name: string, value: string, daysToExpire: number) {
    const date = new Date();
    date.setDate(date.getDate() + (daysToExpire));
    const expires: string = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

/**
 * logs the cookies.
 */
export function logCookie() {
    console.log(document.cookie);
}

/**
 * deletes the cookie for the key.
 * @param name the key name for the cookie to delete.
 */
export function deleteCookie(name: string) {
    setCookie(name, "", -1);
}

/**
 * return the value for the key of the cookie.
 * @param name the key name for the cookie
 * @returns the value of the key.
 */
export function getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split('; ');
    for (const c of cookies) {
        if (c.startsWith(nameEQ)) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}