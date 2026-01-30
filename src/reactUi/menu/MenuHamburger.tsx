import React from 'react';

export default function MenuHamburger({
    toggleMenu
}: {
    toggleMenu: () => void;
}) {
    return (
        <button
            className="menu-hamburger"
            onClick={toggleMenu}
        >Menu closed</button>);
}




