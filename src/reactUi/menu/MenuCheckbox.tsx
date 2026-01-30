import React from "react";

export default function MenuCheckbox({
    name,
    isChecked,
    onToggle
}: {
    name: string;
    isChecked: boolean;
    onToggle: () => void;
}) {
    return (
        <label className="menu-checkbox-label">
            <input className="menu-checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={onToggle}
            />
            {name}
        </label>
    );
}