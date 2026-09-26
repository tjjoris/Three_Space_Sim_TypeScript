/**
 * setCookie.ts
 * @Author: Luke Johnson
 * source: https://www.w3schools.com/js/js_cookies.asp
 * code has been converted to typescript,variable names have been modified for clairty and comments added.
 * This function sets a cookie.
 */

export default function setCookie(cookieName: string, cookieValue: string, extendDays: number) {
  const expireyDate = new Date();
  expireyDate.setTime(expireyDate.getTime() + (extendDays*24*60*60*1000));
  let expires = "expires="+ expireyDate.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
