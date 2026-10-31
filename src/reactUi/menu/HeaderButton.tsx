import type { MenuTabsType } from "../../types/menuTabsType";
/**
 *HeaderButton
 @Author: Luke Johnson
 component is the tab at the top of the menu. It has a name as props, and action for when it is clicked, and the currentTab, which is a changing state belonging to the parent. This current tab prop also determins if the tab will be on the top or below the menu content in the z-index.
 * */
type Props = {
    name: MenuTabsType;
    action: (tabName: MenuTabsType) => void;
    currentTab: MenuTabsType;
    zIndex: number;
}
//
export default function HeaderButton(props: Props) {
			
    return (
        <>
            <button 
	    className='menu-header-button' 
	    style={{zIndex: props.zIndex}}
	    onClick={
	    () => 
		  props.action(props.name)
	    }> 
	    {props.name}
	    </button>
        </>)
}
