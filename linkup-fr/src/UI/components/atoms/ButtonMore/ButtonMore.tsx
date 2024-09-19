import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./ButtonMoreStyles.css";
import AddIcon from '@mui/icons-material/Add';

interface IButtonMoreProps{
    text?:string,
    className?:string
}

export default function ButtonMore({text,className}: IButtonMoreProps):React.ReactNode{
    const handleClick = () =>{
        console.log("do something"); // Agregar click para enviar a la vista única
    }
    return(
        <div className={className ? className : 'button-more'} onClick={handleClick}>
            <AddIcon sx={{color:"white"}} />
            {text}
        </div>
    )
}