import React from 'react';

export default function MenuHamburger({
    isOpen,
    toggleMenu
}: {
    isOpen: boolean;
    toggleMenu: () => void;
}) {
    return (!isOpen ?
        <button
            className="menu-hamburger"
            onClick={toggleMenu}
        >Menu closed</button> :
        <button className="menu-hamburger">Menu Open</button>);
}




