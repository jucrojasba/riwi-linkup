import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./ButtonMoreStyles.css";
import AddIcon from '@mui/icons-material/Add';
export default function ButtonMore():React.ReactNode{
    const handleClick = () =>{
        console.log("do something"); // Agregar click para enviar a la vista única
    }
    return(
        <div className='button-more' onClick={handleClick}>
            <AddIcon sx={{color:"white"}} />
        </div>
    )
}