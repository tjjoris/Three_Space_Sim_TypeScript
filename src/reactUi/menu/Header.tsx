import HeaderButton from "./HeaderButton";
export default function Header() {
    return (
        <>
            <div className="menu-header">
		<HeaderButton name="one" action={() => {}} currentTab ="unselected-header-button" />
		<HeaderButton name="two" action={() => {}} currentTab ="selected-header-button" />
		<HeaderButton name="three" action={() => {}} currentTab ="unselected-header-button" />
            </div>
        </>
    )
}
