/*
 *MenuHeader.tsx
 @Author: Luke Johnson
 this React component appears at the top of every menu screen. it contains the menu tab buttons.
 It has the function for whtne the buttons are clicked as props, and also the the list of menu buttons.
 */
import type {MenuTabsType} from "../../types/menuTabsType"
import HeaderButton from "./HeaderButton";

interface Props {
	menuTab: MenuTabsType;
	gotoMenuScreen: (screenName:MenuTabsType) => void ; 
	setMenuTab: React.Dispatch<React.SetStateAction<MenuTabsType>>;
}
export default function MenuHeader (props:Props)  {


	//tabs state for different menu screens.
	const tabs:MenuTabsType[] = ['info', 'keybinds', 'settings'];


	/*
	 *function for returning all header buttons. 
	 this function loops through all header buttons, it stores the z-index and if the button is the current one. if it passes the current one, it lowers the z-index by 1.
	 */
	function returnHeaderButtons(): React.ReactElement {
		//this is the array of react elements to return.
		let headerButtons: React.ReactElement[] = [];
		//this is the boolean to check if the button is the current menu.
		let localHeaderTabPassedTop: boolean = false;
		//this is the actual z index used in the component it is set to 100 when it is the selected button, otherwise it is 1 if before the selected button, or 49 if after and lowers by 1.
		let localZIndexToBeUsed:number = 1;
		let zIndexTrackedForStacking = 49;
		//loop all elements i the tabs array of MenuTabsType.
		for (let headerButtonIndex:number = 0; headerButtonIndex < tabs.length; headerButtonIndex ++) {
			//check if this is the button for the current tab 
			if (tabs[headerButtonIndex] == props.menuTab) {
				//set the boolean for tracking.
				localHeaderTabPassedTop = true;
				//set the z index to appear above the menu
				localZIndexToBeUsed = 100;
			}
			else {
				//set the z index behind the menu but with room to lower for additional tabs appearing behind this one.
				localZIndexToBeUsed = zIndexTrackedForStacking;
			}
			//true if has already looped past the current button.
			if (localHeaderTabPassedTop == true) {
				zIndexTrackedForStacking --;
			}
			//add a header button to the array.
			headerButtons.push(
				<HeaderButton name={tabs[headerButtonIndex]} action={props.gotoMenuScreen} currentTab={props.menuTab} zIndex={localZIndexToBeUsed} />);
			
		}
		//return the array of header buttons.
		return (<>
				{headerButtons}
			</>);

	}


	//return the actual header buttons for this component.
	return (
		<div className = "menu-header">
			{returnHeaderButtons()}
		</div>
	)
}
