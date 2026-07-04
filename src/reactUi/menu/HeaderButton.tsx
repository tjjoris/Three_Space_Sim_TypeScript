type Props = {
    name: string;
    action: (tabName: string) => void;
    currentTab: string;
}
//
export default function HeaderButton(props: Props) {
	//if passed props for tab matches name, set tag to put in front.
	let tag = "unselected-header-button"  
	if (props.currentTab === props.name) {
		tag = "selected-header-button"
	}		
    return (
        <>
            <button className={`menu-header-button ${tag}`} onClick={
	    () => 
		  props.action(props.name)
	    }> 
	    {props.name}
	    </button>
        </>)
}
