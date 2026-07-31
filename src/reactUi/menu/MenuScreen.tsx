import type {MenuTabsType} from "../../types/menuTabsType"
import SettingsMenuContent from "./SettingsMenuContent";
import InfoMenuContent from "./InfoMenuContent";
import KeybindsMenuContent from "./KeybindsMenuContent";
import HeaderButton from "./HeaderButton";
import MenuButton from "./MenuButton";
import { useState, useRef} from "react";
export default function MenuScreen({
    toggleMenu,
}: {
    toggleMenu: () => void,
}) {

	//tabs state for different menu screens.
	const [menuTab, setMenuTab] = useState<MenuTabsType>("info"); 
	const zIndex = useRef(100);
	const headerTabPassedTop= useRef(false);
	const tabs:MenuTabsType[] = ['info', 'keybinds', 'settings'];

	function retrunHeaderButtons(): React.ReactElement {
		let headerButtons: React.ReactElement[] = [];
		let localHeaderTabPassedTop: boolean = false;
		let localZIndex:number = 100;
		for (let headerButtonIndex:number = 0; headerButtonIndex < tabs.length; headerButtonIndex ++) {
			if (localHeaderTabPassedTop == true) {
				localZIndex --;
			}
			if (tabs[headerButtonIndex] == menuTab) {
				localHeaderTabPassedTop = true;
			}
			headerButtons.push(
				<HeaderButton name={tabs[headerButtonIndex]} action={gotoMenuScreen} currentTab={menuTab} zIndex={localZIndex} />);
			
		}
		return (<>
				{headerButtons}
			</>);

	}
	/*
	 *this function returns the header button, but sets the z-index based on if it is in front or behind a pervious one.
	 */
	function returnHeaderButton(nameParam:MenuTabsType, currentTabParam:MenuTabsType): React.ReactElement{
		if (headerTabPassedTop.current == true) {
			zIndex.current = zIndex.current - 1;
		}
		if (nameParam == currentTabParam) { 
			headerTabPassedTop.current = true;
		}
		return (
			<HeaderButton name={nameParam} action={gotoMenuScreen} currentTab={currentTabParam} zIndex={zIndex.current} />);

	}
	
	//function to navigate to menu screen on tab click
//the arrow syntax is more common in react and no {} are needed because it is only calling one function.
	const gotoMenuScreen = (screenName: MenuTabsType) => {
		setMenuTab(screenName);
	};

    return (<>
        <div className="menu-screen">

            <div className="menu-header">
	    	{retrunHeaderButtons()}
		{/*	    	{tabs.map(tab => returnHeaderButton(tab, menuTab))}
				*/}
		{/*//		<HeaderButton name="info" action={gotoMenuScreen} currentTab ={menuTab} />
//		<HeaderButton name="keybinds" action={gotoMenuScreen} currentTab={menuTab} />
//		<HeaderButton name="settings" action={gotoMenuScreen} currentTab={menuTab} />
//		*/}
            </div>
		{menuTab === "info" &&
			<InfoMenuContent />}
		{menuTab === "keybinds" &&
			<KeybindsMenuContent /> }
		{menuTab === "settings" &&	    
		<SettingsMenuContent />  }
		<MenuButton name="Close Menu" onClick={toggleMenu} />
        </div >
    </>)
}
