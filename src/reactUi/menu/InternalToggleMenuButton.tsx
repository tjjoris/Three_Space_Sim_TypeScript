import MenuButton from "./MenuButton";
import { ToggleMenuContext } from "../contexts/ToggleMenuContext";
import { useContext } from "react";
/*
 * @Author: Luke Johnson
 * this is the button component for toggleing if the menu is open or closed form inside the menu, it uses usecontext for the function to set the menu open or closed.
 */

export default function InternalToggleMenuButton() {
    const toggleMenu = useContext(ToggleMenuContext);
	    return (
		<MenuButton name="Close Menu" onClick={toggleMenu} />
	    )
}
