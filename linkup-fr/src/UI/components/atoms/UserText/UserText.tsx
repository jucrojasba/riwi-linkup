interface IUserTextProps {
    title: string; // Required title prop
    paragraph: string | undefined; // Optional paragraph prop
    className: string; // Required className for styling
}

export default function UserText({ title, paragraph, className }: IUserTextProps): React.ReactNode {
    return (
        <div className={className}> {/* Apply the provided className */}
            <h4>{title}</h4> {/* Render title */}
            <p>{paragraph}</p> {/* Render paragraph */}
        </div>
    );
}
