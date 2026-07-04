type Props = {
    name: string;
    action: () => void;
    tag: string;
}

export default function HeaderButton(props: Props) {
    return (
        <>
            <button className={`"menu-header-button " ${props.tag}`} onClick={props.action} >{props.name}
	    {props.name}
	    </button>
        </>)
}
