import "./modalStyles.css";
import CloseIcon from '@mui/icons-material/Close';
import { TextInput } from "../../atoms";
import { ChangeEvent, useEffect, useState } from "react";
import { MainButton } from "../../atoms";
import CheckIcon from '@mui/icons-material/Check'; 
import { SelectChangeEvent } from "@mui/material";
import SelectOptions from "../../atoms/Select/Select";
import { IForm } from "@/UI/interfaces/FormInterface";
import { useDataBackLoad } from "@/global-states/dataBack";
import TextArea from "../../atoms/TextArea/TextArea";
import { obtainIdData } from "@/utilities/obtainIdData";
import { IStructureCreateCoder } from "@/UI/interfaces/structureCreateCoder";
import { createCoderService } from "@/services/coderService";
import { inputAlert } from "../../molecules/Alert/Alert";
import { CircularLoader } from "../../atoms";
import { ICoders } from "@/UI/interfaces/ICoderInterface";

interface IModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}


export function Modal({ showModal, setShowModal,     }: IModalProps): React.ReactNode {
    const dataBack = useDataBackLoad((state) => state.dataBack);
    const {genders, clans, languages, softSkills, techSkills} = dataBack;
    const [loading, setLoading] = useState<boolean>(false);
    const dataForm: IForm = {
        name: "",
        birthday: "",
        urlImage: "",
        gender: "",
        clan: "",
        softSkill: "",
        language: "",
        techSkill: "",
        description:""
    }

    const [selectedValue, setSelectedValue] = useState(dataForm);
    const handleChange = (e: SelectChangeEvent | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = e.target; 
        setSelectedValue((prevState) => ({
            ...prevState,
            [name]: name === "birthday" ? new Date(value) : value,
        }))
    };

    const handleClickCreate = async() => {
        setLoading(true);
        const {name,birthday,description,urlImage,gender, clan, softSkill, language,techSkill} = selectedValue;
        const genderSelectedId:number | null  = obtainIdData(genders, gender);
        const clanSelectedId:number | null = obtainIdData(clans, clan);
        const softSkillId:number | null = obtainIdData(softSkills, softSkill);
        const languageId:number | null = obtainIdData(languages, language);
        const techSkillId:number | null = obtainIdData(techSkills, techSkill);

        if(!clanSelectedId || !softSkillId || !techSkillId || !languageId || !genderSelectedId ){
            return ({message: "Error, Is required the params selected"});
        }
        const coder:IStructureCreateCoder = {
            name,
            birthday,
            description,
            urlImage,
            genderId: genderSelectedId,
            clanId: clanSelectedId,
            softSkillIds: [softSkillId],
            languages: [{
                id: languageId,
                name: language,
                levelId: 1
            }],
            technicalSkills: [{
                id: techSkillId,
                technicalSkillName:techSkill,
                levelId: 1,
                levelName: "Avanzado"
            }]
        };

        const coderCreated = await createCoderService(coder);
        console.log(coderCreated);
        if(!coderCreated){
            inputAlert("Error to create user", "error");
            return ({message: coderCreated})
        };
        inputAlert("Coder created successfully", "success");
        setLoading(false);
        setShowModal(false);
    };


    const handleClickClose = () => {
        console.log("close");
        setShowModal(false);
    };

    if (showModal) {
        return (
            <>
            {loading ? <CircularLoader flag={loading} /> : null}
                <div className="content-modal">
                    <div className="modal">
                        <div onClick={handleClickClose}>
                            <CloseIcon sx={
                                {position: "absolute", top: "15px", right: "15px", backgroundColor: "var(--red-color)", borderRadius: "5px", color: "var(--white-color)", padding: "2px", cursor: "pointer"}
                                } />
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
                            <TextArea
                            name="description"
                            onChange={handleChange}
                            value={selectedValue.description}
                            placeholder="Enter description"
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
                                className="button-create"
                            />
                        </form>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
}
