import React from 'react';

export default function MenuHamburger({ isOpen }: { isOpen: boolean }) {
    return (isOpen ? <p className="menu-hamburger">Menu Open</p> : <p>Menu Closed</p>);
}