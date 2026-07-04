type Props = {
    name: string;
    action: () => void;
    tag: string;
}

export default function HeaderButton(props: Props) {
    return (
        <>
            <button className="menu-header-button" onClick={props.action} >{props.name}</button>
        </>)
}
