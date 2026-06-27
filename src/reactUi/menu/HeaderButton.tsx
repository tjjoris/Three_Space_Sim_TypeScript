type Props = {
    name: string;
}

export default function HeaderButton(props: Props) {
    return (
        <>
            <button className="menu-button">{props.name}</button>
        </>)
}