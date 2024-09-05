import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./buttonMoreStyles.css"
export default function ButtonMore():React.ReactNode{
    const handleClick = () =>{
        console.log("do something"); // Agregar click para enviar a la vista única
    }
    return(
        <div className='button-more' onClick={handleClick}>
            <ExpandLessIcon sx={{color:"white"}} />
        </div>
    )
}