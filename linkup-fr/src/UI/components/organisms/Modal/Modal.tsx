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
import { IClan, IClans } from "@/UI/interfaces/clanInterface";
import { getClansService } from "@/app/api/services/clanService";
import { IOptionsSelect } from "@/UI/interfaces/optionSelectInterface";

interface IModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

export function Modal({ showModal, setShowModal }: IModalProps): React.ReactNode {
    const initialGenderState: IGender = {
        id: 0,
        name: ""
    };
    const initialClanState:IClan = {
        id: 0,
        name: ""
    }
    const initialGendersState: IGenders = {
        genders: [initialGenderState]
    };

    const initialClansState: IClans = {
        clans: [initialClanState]
    }

    const initialFormData = {
        gender: "",
        clan:"",
    }
    const initialStateData: IOptionsSelect = {
        genders: [],
        clans: [],
    }

    const [selectedValue, setSelectedValue] = useState(initialFormData);
    const [dataState, setDataState] = useState<IOptionsSelect>(initialStateData)

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
        const getData = async () => {
            const genders = await getGendersService();

            if(genders){
                setDataState({
                    genders,
                })
            }
        };
        getData();
    }, [genders]);

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
                                onChange={handleChange}
                                values={genders.genders.map(gender => gender.name)}
                                value={selectedValue.gender}
                            />
                            <SelectOptions
                                label="clans"
                                name="clans"
                                onChange={handleChange}
                                values={clans.clans.map(clan =>clan.name)}
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
