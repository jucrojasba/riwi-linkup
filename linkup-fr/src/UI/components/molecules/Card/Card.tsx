import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./cardStyles.css";

interface ICardProps{
    url_image: string,
    alt_image: string,
    name_user: string,
    age_user: string,
}
export default function Card({url_image,alt_image,name_user,age_user}:ICardProps):React.ReactNode{
    return(
        <div className="card">
            <div className="card-header">
                <img
                src={url_image}
                alt={alt_image}
                width={100}
                height={80}
                />
                <div className="header-buttons">
                    <EditIcon />
                    <DeleteIcon />
                </div>
            </div>
            <div className="car-body">
                <h3 className="body-title">{name_user}Name</h3>
                <h5 className="body-subtitle">{age_user}AGE</h5>
            </div>
        </div>
    )
}