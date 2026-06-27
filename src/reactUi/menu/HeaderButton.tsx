type Props = {
    name: string;
}

export default function HeaderButton(props: Props) {
    return (
        <>
            <button className="menu-header-button">{props.name}</button>
        </>)
}