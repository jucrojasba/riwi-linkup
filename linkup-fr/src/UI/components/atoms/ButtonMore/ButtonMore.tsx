import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./ButtonMoreStyles.css";
import AddIcon from '@mui/icons-material/Add';

interface IButtonMoreProps{
    text?:string,
    className?:string,
    onClick?: () =>void;
}

export default function ButtonMore({text,className, onClick}: IButtonMoreProps):React.ReactNode{
    return(
        <div className={className ? className : 'button-more'} onClick={onClick}>
            <AddIcon sx={{color:"white"}} />
            {text}
        </div>
    )
}