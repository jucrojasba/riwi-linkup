import "./modalStyles.css";
import CloseIcon from '@mui/icons-material/Close';
import { TextInput } from "../../atoms";
import Textarea from '@mui/joy/Textarea';
import { useEffect, useState } from "react";
import { IGender, IGenders } from "@/UI/interfaces/GenderInterface";
import { MainButton } from "../../atoms";
import CheckIcon from '@mui/icons-material/Check'; 
import { SelectChangeEvent } from "@mui/material";
import SelectOptions from "../../atoms/Select/Select";
import { IOptionsSelect } from "@/UI/interfaces/optionSelectInterface";
import { IForm } from "@/UI/interfaces/FormInterface";
import { useDataBackLoad } from "@/global-states/dataBack";

interface IModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

export function Modal({ showModal, setShowModal }: IModalProps): React.ReactNode {
    const dataBack = useDataBackLoad((state) => state.dataBack);
    const {genders, clans, languages, softSkills, techSkills} = dataBack;
    const dataForm: IForm = {
        name: "",
        birthday: "",
        urlImage: "",
        gender: "",
        clan: "",
        softSkill: "",
        language: "",
        techSkill: "",
    }

    const [selectedValue, setSelectedValue] = useState(dataForm);

    const handleChange = (e: SelectChangeEvent) => {
        const {name, value} = e.target; 
        setSelectedValue((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(selectedValue);
    };

    const handleClickCreate = () => {
        console.log("create");
    };

    const handleClickClose = () => {
        console.log("close");
        setShowModal(false);
    };

    if (showModal) {
        return (
            <div className="content-modal">
                <div className="modal">
                    <div onClick={handleClickClose}>
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
                                required={true} 
                            />
                            <TextInput 
                                label=""
                                name="birthday"
                                onChange={handleChange}
                                type="date"
                                error={false}
                                required={true} 
                            />
                        </div>

                        <Textarea 
                            placeholder="description"
                        />

                        <TextInput 
                            label="url-image"
                            name="urlImage"
                            onChange={handleChange}
                            type="text"
                            error={false}
                            required={true} 
                        />

                        <div className="information-gender-clans">
                            <SelectOptions
                                label="genders"
                                name="gender"
                                onChange={handleChange}
                                values={genders.map((gender)=>gender.name)}
                                value={selectedValue.gender}
                            />
                            <SelectOptions
                                label="clans"
                                name="clan"
                                onChange={handleChange}
                                values={clans.map((clan)=>clan.name)}
                                value={selectedValue.clan}
                            />
                        </div>

                        <SelectOptions
                            label="softSkills"
                            name="softSkill"
                            onChange={handleChange}
                            values={softSkills.map((softSkill)=>softSkill.name)}
                            value={selectedValue.softSkill}
                        />
                        
                        <div className="information-languages-techSkills">
                            <SelectOptions
                                label="languages"
                                name="language"
                                onChange={handleChange}
                                values={languages.map((language)=>language.name)}
                                value={selectedValue.language}
                            />
                            <SelectOptions
                                label="techSkills"
                                name="techSkill"
                                onChange={handleChange}
                                values={techSkills.map((techSkill)=>techSkill.name)}
                                value={selectedValue.techSkill}
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
        );
    } else {
        return null;
    }
}
