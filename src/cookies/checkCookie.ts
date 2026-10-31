import getCookie from "./getCookie";
import setCookie from "./setCookie";
/*
 * checkCookie.ts
  @Author: Luke Johnson
 * source: https://www.w3schools.com/js/js_cookies.asp
 * this script has been modified from the source. It has been changed from JS to TS, and variable names have been changed for clarity. comments have been added.
 */
export default function checkCookie() {
	console.log("check cookie");
	//get username from cookie of key=username 
	const username : string = getCookie("username");
	//if the cookie value returned is not empty, show an alert with the user name value.
  	if (username != "") {
   		alert("Welcome again " + username);
	//else, prompt for the name, which could be null or empty.
  	} else {
    		const nameFromPrompt: string | null = prompt("Please enter your name:", "");
		//if the name is not null or empty, set it in the cookie for username.
    		if (nameFromPrompt != "" && nameFromPrompt != null) {
      			setCookie("username", nameFromPrompt, 365);
    		}
	}
}
