import { useState } from "react";
import MenuHamburger from "./MenuHamburger";
import MenuScreen from "./MenuScreen";
import { isPaused, setPaused } from "../../game/pause";
/**
 * @Author: Luke Johnson
 *MenuContainer.tsx this is the component which stores all the menu. it shows menu screen if toggleMenu is the isOpen state is true. it is controlled with the toggleMenu function in here and it also toggles the pause state in the game.
 */
export default function MenuContainer(
    { isVerticalInverted,
        toggleInvertVertical
    }: {
        isVerticalInverted: boolean;
        toggleInvertVertical: () => void;
    }
) {
    const [isOpen, setIsOpen] = useState(false);
    // const [isVerticalInverted, setIsVerticalInverted] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setPaused(!isPaused());
    };

    // const toggleInvertVertical = () => {
    //     setIsVerticalInverted(!isVerticalInverted);
    // };
    return (<>
        {isOpen ?
            <MenuScreen
                toggleMenu={toggleMenu}
                isVerticalInverted={isVerticalInverted}
                toggleInvertVertical={toggleInvertVertical} />
            : <MenuHamburger toggleMenu={toggleMenu} />}
    </>);
}
