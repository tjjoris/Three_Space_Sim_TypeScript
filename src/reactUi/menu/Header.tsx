import HeaderButton from "./HeaderButton";
export default function Header() {
    return (
        <>
            <div className="menu-header">
		<HeaderButton name="info" action={() => {}} currentTab ="unselected-header-button" />
		<HeaderButton name="keybinds" action={() => {}} currentTab ="selected-header-button" />
		<HeaderButton name="settings" action={() => {}} currentTab ="unselected-header-button" />
            </div>
        </>
    )
}
