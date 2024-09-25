import AddIcon from '@mui/icons-material/Add';
import "./ButtonMoreStyles.css";

interface IButtonMoreProps {
    text?: string,
    className?: string,
    onClick?: () => void;
    iconColor?: string; // Optional color for the icon
}

export default function ButtonMore({ text, className, onClick, iconColor = "white" }: IButtonMoreProps): React.ReactNode {
    return (
        <div className={className ? className : 'button-more'} onClick={onClick}>
            <AddIcon sx={{color:"white"}} />
            {text}
        </div>
    );
}
