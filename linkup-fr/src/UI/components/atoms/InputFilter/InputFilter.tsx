import { useState } from "react";
import "./inputFilterStyles.css";
interface InputFilterProps{
    label: string,
    name: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void,
    checked:boolean
}

export default function InputFilter({label, name, onChange, checked}:InputFilterProps):React.ReactNode{

    return(
        <div>
            <label htmlFor={name}> {label} 
                <input className={checked ? "checked-filter": ""} type="checkbox" checked={checked} id={name} name={name} onChange={onChange} />  
            </label>
        </div>
    )
}