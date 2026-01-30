import { useState } from "react";
import MenuHamburger from "./MenuHamburger";
import MenuScreen from "./MenuScreen";

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