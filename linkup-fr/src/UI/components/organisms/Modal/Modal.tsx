import "./modalStyles.css";
import CloseIcon from '@mui/icons-material/Close';
import { TextInput } from "../../atoms";
import Textarea from '@mui/joy/Textarea';
import SelectOptions from "../../atoms/Select/Select";
import { useEffect, useState } from "react";
import { IGender, IGenders } from "@/UI/interfaces/GenderInterface";
import {MainButton} from "../../atoms";
import CheckIcon from '@mui/icons-material/Check';
interface IModalProps{
    showModal:boolean,
    setShowModal: (value:boolean) => void;
}
export function Modal({showModal,setShowModal}: IModalProps):React.ReactNode{
    const initialGenderState:IGender = { // States for initial genders
        id: 0,
        name:""
    }
    const initialGendersState: IGenders = {
        genders:[initialGenderState]
    }

    const [genders,setGenders] = useState<IGenders>(initialGendersState);
    const handleChange = () =>{
        console.log("change")
    }

    const handleClickCreate = () =>{
        console.log("create")
    }
    const handleCLickClose = () =>{
        console.log("close");
        setShowModal(false);
    }

    useEffect(()=>{
        const getGenders = () =>{
            console
        };
        getGenders();
    })
    if(showModal){
        return(
            <div className="content-modal">
                <div className="modal">
                    <div onClick={handleCLickClose}>
                        <CloseIcon />
                    </div>
                    <form className="modal-information">
                        <div className="information-name-birthday">
                            <TextInput 
                            label="name"
                            name="name"
                            onChange={handleChange}
                            type="text"
                            error={false}
                            required={true} />

                            <TextInput 
                            label=""
                            name="birthday"
                            onChange={handleChange}
                            type="date"
                            error={false}
                            required={true} />
                        </div>

                        <Textarea 
                        placeholder="description"
                        onChange={handleChange}
                        />

                        <TextInput 
                        label="url-image"
                        name="urlImage"
                        onChange={handleChange}
                        type="text"
                        error={false}
                        required={true} />

                        <div className="information-gender-clans">
                            <SelectOptions
                            name="gender"
                            onchange={handleChange}
                            values={["male", "female"]}
                            value={"Genders"}
                            />
                            <SelectOptions
                            name="clans"
                            onchange={handleChange}
                            values={["berness lee", "ritchie"]}
                            value="Clans"
                            />
                        </div>

                        <SelectOptions
                        name="softSkills"
                        onchange={handleChange}
                        values={["berness lee", "ritchie"]}
                        value="SoftSkills"
                        />
                        
                        <div className="information-languages-techSkills">
                            <SelectOptions
                            name="langiages"
                            onchange={handleChange}
                            values={["berness lee", "ritchie"]}
                            value="Languages"
                            />

                            <SelectOptions
                            name="techSkills"
                            onchange={handleChange}
                            values={["berness lee", "ritchie"]}
                            value="techSkills"
                            />
                        </div>
                        <MainButton
                        text={"Create coder"}
                        onClick={handleClickCreate}
                        icon={<CheckIcon />}
                        className=""
                        />
                    </form>
                </div>
            </div>
        )
    }else{
        return null;
    }
}