import HeaderButton from "./HeaderButton";
export default function Header() {
    return (
        <>
            <div className="menu-header">
                <HeaderButton name="Settings" />
                <HeaderButton name="Keybinds" />
            </div>
        </>
    )
}