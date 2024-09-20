interface IUserTextProps {
    title:string,
    paragraph:string,
    className: string
}

export default function UserText({title,paragraph,className}:IUserTextProps): React.ReactNode {
    return (
        <div className={className}>
            <h4>{title}</h4>
            <p>{paragraph}</p>
        </div>
    );
}