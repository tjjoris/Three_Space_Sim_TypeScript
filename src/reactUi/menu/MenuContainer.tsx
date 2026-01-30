import React, { useState } from "react";
import MenuHamburger from "./MenuHamburger";
import MenuScreen from "./MenuScreen";

export default function MenuContainer() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (<>
        {isOpen ?
            <MenuScreen toggleMenu={toggleMenu} />
            : <MenuHamburger toggleMenu={toggleMenu} />}
    </>);
}