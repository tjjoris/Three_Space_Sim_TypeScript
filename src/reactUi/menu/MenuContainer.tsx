import { useState} from "react";
import { ToggleMenuContext } from "../contexts/ToggleMenuContext";
import MenuHamburger from "./MenuHamburger";
import MenuScreen from "./MenuScreen";
import { isPaused, setPaused } from "../../game/pause";
/**
 * @Author: Luke Johnson
 *MenuContainer.tsx this is the component which stores all the menu. it shows menu screen if toggleMenu is the isOpen state is true. it is controlled with the toggleMenu function in here and it also toggles the pause state in the game.
 */
export default function MenuContainer(
    ) {
    const [isOpen, setIsOpen] = useState(false);
    // const [isVerticalInverted, setIsVerticalInverted] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setPaused(!isPaused());
    };

    //context for toggling menu.
    return (<>
	<ToggleMenuContext.Provider value = {toggleMenu}  >
	    {isOpen ?
		<MenuScreen
		    toggleMenu={toggleMenu} />
		: <MenuHamburger toggleMenu={toggleMenu} />}
	</ToggleMenuContext.Provider>
    </>);
}
