/*
 * getCookie.ts
 * @Author: Luke Johnson
 * Source: https://www.w3schools.com/js/js_cookies.asp
 * This script has been modified for Typescript, variable names have been modified for clarity, and comments added.
 * This function gets a cookie based on the key name.
 */
export default function getCookie(cookieName: string): string {
	//the substring which is the cookie name plus "="
  let substringName = cookieName + "=";
  //decodes the cookie, handling any special characters like $
  let decodedCookie = decodeURIComponent(document.cookie);
  //splits the cookie using semicolon delemiters turning it into an array.
  let splitCookie: string[] = decodedCookie.split(';');
//loops through each split cookie array element. 
  for(let cookieIndex = 0; cookieIndex <splitCookie.length; cookieIndex++) {
    let keyValueCookieElement = splitCookie[cookieIndex];
    //skip any whitespace
    while (keyValueCookieElement.charAt(0) == ' ') {
      keyValueCookieElement = keyValueCookieElement.substring(1);
    }
    //if the first index of the substring name in c is 0, that means the key matches the substring, so return it.
    if (keyValueCookieElement.indexOf(substringName) == 0) {
      return keyValueCookieElement.substring(substringName.length, keyValueCookieElement.length);
    }
  }
  //else return nothing
  return "";
}
