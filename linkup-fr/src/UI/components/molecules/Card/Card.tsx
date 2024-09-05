import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonMore from '../../atoms/ButtonMore/ButtonMore';
import "./cardStyles.css";
import { ICoder, ICoders } from '@/UI/interfaces/ICoderInterface';
import React, { useState } from 'react';
import { deleteCache } from 'next/dist/server/lib/render-server';
import { deleteCoderService } from '@/services/coderServices';

interface ICardProps{
    id_coder:number,
    url_image: string,
    alt_image: string,
    name_user: string,
    age_user: string,
}
export default function Card({id_coder,url_image,alt_image,name_user,age_user}:ICardProps):React.ReactNode{
    console.log(id_coder);

    const handleClickUpdate = async(e:React.MouseEvent) =>{
        
    }

    const handleClickDelete = async(e:React.MouseEvent): Promise<undefined> =>{
        const isConfirm: boolean = confirm("Do you want delete this coder?"); // Agregar modal de confirmación
        if(!isConfirm)return;
        const id:string | null = (e.currentTarget as HTMLButtonElement).getAttribute("data-id");
        if(!id)return;
        const data = await deleteCoderService(parseInt(id));
        console.log(data);
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
                    <EditIcon data-id={id_coder} className="edit-icon" onClick={(e)=>handleClickUpdate(e)}/>
                    <DeleteIcon data-id={id_coder} className='delete-icon' onClick={(e)=>handleClickDelete(e)} />
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