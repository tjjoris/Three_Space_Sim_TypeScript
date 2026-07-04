import HeaderButton from "./HeaderButton";
export default function Header() {
    return (
        <>
            <div className="menu-header">
		<HeaderButton name="one" action={() => {}} tag="unselected-header-button" />
		<HeaderButton name="two" action={() => {}} tag="selected-header-button" />
		<HeaderButton name="three" action={() => {}} tag="unselected-header-button" />
            </div>
        </>
    )
}
