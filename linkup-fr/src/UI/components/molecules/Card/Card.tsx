import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonMore from '../../atoms/ButtonMore/ButtonMore';
import "./cardStyles.css";
import { ICoder, ICoders } from '@/UI/interfaces/ICoderInterface';
import { useState } from 'react';

interface ICardProps{
    url_image: string,
    alt_image: string,
    name_user: string,
    age_user: string,
}
export default function Card({url_image,alt_image,name_user,age_user}:ICardProps):React.ReactNode{

    const handleClickUpdate = () =>{
        console.log("Update coders"); // Agregar lógica para actualizar y navegar a la vista única
    }

    const handleClickDelete = () =>{
        console.log("Delete coders"); // Agregar lógica para borrar y mostrar modal
    }
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
                    <EditIcon onClick={handleClickUpdate}/>
                    <DeleteIcon onClick={handleClickDelete} />
                </div>
            </div>
            <div className="card-body">
                <div className='body-information'>
                    <h3 className="body-title">{name_user}</h3>
                    <h5 className="body-subtitle" style={{fontWeight: "400"}}>{age_user}</h5>
                </div>
                <ButtonMore />
            </div>
        </div>
    )
}