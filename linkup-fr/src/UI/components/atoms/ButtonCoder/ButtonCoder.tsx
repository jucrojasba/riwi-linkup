import "./buttonCoderStyles.css";

interface IButtonCoderProps{
    content:string | React.ReactElement,
    onClick: () => void,
    className?:string
}

export default function ButtonCoder({content, onClick, className}:IButtonCoderProps):React.ReactNode{
    return (
        <button onClick={onClick} className={className || "button-coder"}>
            {content}
        </button>
    )
}