import "./modalStyles.css";
import CloseIcon from '@mui/icons-material/Close';
import { TextInput } from "../../atoms";
import Textarea from '@mui/joy/Textarea';
import { useEffect, useState } from "react";
import { IGender, IGenders } from "@/UI/interfaces/GenderInterface";
import { MainButton } from "../../atoms";
import CheckIcon from '@mui/icons-material/Check'; 
import { getGendersService } from "@/services/genderService";
import { SelectChangeEvent } from "@mui/material";
import SelectOptions from "../../atoms/Select/Select";

interface IModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

export function Modal({ showModal, setShowModal }: IModalProps): React.ReactNode {
    const initialGenderState: IGender = {
        id: 0,
        name: ""
    };
    const initialGendersState: IGenders = {
        genders: [initialGenderState]
    };

    const initialFormData = {
        gender: "",
        clan:""
    }

    const [genders, setGenders] = useState<IGenders>(initialGendersState);
    const [selectedValue, setSelectedValue] = useState(initialFormData);

    const handleChange = (e: SelectChangeEvent) => {
        const {name, value} = e.target; 
        setSelectedValue((prev)=>({
            ...prev,
            [name]: value
        }))
        console.log("Selected value:",value);
    };

    const handleClickCreate = () => {
        console.log("create");
    };

    const handleClickClose = () => {
        console.log("close");
        setShowModal(false);
    };

    useEffect(() => {
        const getGenders = async () => {
            const data = await getGendersService();
            if (!data) return;
            setGenders({
                genders: data
            });   
        };
        getGenders();
    }, []);

    console.log(genders);

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
                                onChange={handleChange} // Cambié a onChange
                                values={genders.genders.map(gender => gender.name)}
                                value={selectedValue.gender}
                            />
                            <SelectOptions
                                label="clans"
                                name="clans"
                                onChange={handleChange}
                                values={["berness lee", "ritchie"]}
                                value={selectedValue.clan}
                            />
                        </div>

                        <SelectOptions
                            name="softSkills"
                            onChange={handleChange}
                            values={["berness lee", "ritchie"]}
                            value=""
                        />
                        
                        <div className="information-languages-techSkills">
                            <SelectOptions
                                name="languages"
                                onChange={handleChange}
                                values={["berness lee", "ritchie"]}
                                value=""
                            />
                            <SelectOptions
                                name="techSkills"
                                onChange={handleChange}
                                values={["berness lee", "ritchie"]}
                                value=""
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
