import React, { useState } from "react";
import MenuHamburger from "./MenuHamburger";

export default function MenuContainer() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return <MenuHamburger isOpen={isOpen} toggleMenu={toggleMenu} />;
}