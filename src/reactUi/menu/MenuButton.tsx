// import React from 'react';

export default function MenuButton({
    name,
    onClick
}: {
    name: string;
    onClick: () => void;
}) {
    return (
        <button
            className="menu-button"
            onClick={onClick}
        >
            {name}
        </button>
    )
}