/**Vertical inverter
 *@Author: Luke Johnson
 *component knows if vertical joystick has been inverted, and re-renders if there is a change.
 *on render reads cookie to get vertical inverted state
 *on clicking the checkbox sets the cookie, and tells the game to invert vertical.
 *
 */

import { useState} from "react";
import MenuCheckbox from "./MenuCheckbox"
import { setVerticalInversion } from '../../main';
import { setCookie, getCookie } from '../../helpers/cookieHandler.ts';
export default function VerticalInverter() {

    //read cookie for vertical inversion.
	//note: the getCookie only runs on mount.
    const isVerticalCookieBool: string | null = getCookie('isVerticalInverted');
    //initially set to false
    let isVerticalBool: boolean = false;
    //if true set
    if (isVerticalCookieBool === "true") {
        isVerticalBool = true;
    }
    

    //set vertical inversoin for game from the cookie value.
    setVerticalInversion(isVerticalBool);
    //state for vertical inverstion
    const [isVerticalInverted, setIsVerticalInverted] = useState(isVerticalBool);

    //function to toggle vertical inversion
    const toggleInvertVertical = () => {
	    //the inverted value of the current inversion variable
        const newVertical = !isVerticalInverted;
	//set state for this component
        setIsVerticalInverted(newVertical);
	//call the ts function to invert vertical in the game.
        setVerticalInversion(newVertical);
	//set the cookie so it's stored.
        setCookie('isVerticalInverted', newVertical.toString(), 365);
    };

    //the component which contains the state of the inversion, and the function for when it's clicked.
return (

                        <MenuCheckbox
                            name="Invert Vertical"
                            isChecked={isVerticalInverted}
                            onToggle={toggleInvertVertical} />
)
}
