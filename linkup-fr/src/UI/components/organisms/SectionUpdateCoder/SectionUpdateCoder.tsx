import "./sectionUpdateCoderStyles.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CircularLoader, TextInput } from "../../atoms";
import CheckIcon from '@mui/icons-material/Check'; 
import CloseIcon from '@mui/icons-material/Close';
import TextArea from "../../atoms/TextArea/TextArea";
import SelectOptions from "../../atoms/Select/Select";
import MainButton from "../OrganismTest";
import { IForm } from "@/UI/interfaces/FormInterface";
import { useSearchParams } from "next/navigation";
import { SelectChangeEvent } from "@mui/material";
import { getCoderByIdService, updateCoderService } from "@/services/coderService";
import { ICoderBack } from "@/UI/interfaces/ICoderInterface";
import { useDataBackLoad } from "@/global-states/dataBack";
import { IStructureCreateCoder } from "@/UI/interfaces/structureCreateCoder";
import { obtainIdData } from "@/utilities/obtainIdData";
import { inputAlert } from "../../molecules/Alert/Alert";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import useNavigate from "@/utilities/NavigateTo";

export default function SectionUpateCoder():React.ReactNode{
    const [loading, setLoading] = useState<boolean> (false);
    const searchParams = useSearchParams();
    const dataBack = useDataBackLoad((state)=>state.dataBack);
    const coderId = searchParams.get("coder");
    const navigate = useNavigate();
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

    const [dataFormCoder, setDataFormCoder] = useState<IForm>(dataForm);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const handleChange = (e:ChangeEvent<HTMLInputElement> | SelectChangeEvent | ChangeEvent<HTMLTextAreaElement>) =>{
        const {name,value} = e.target;
        setDataFormCoder({
            ...dataFormCoder,
            [name]: value
        });
    }

    const handleUpdate = async() =>{
        setLoading(true);
        const {name,birthday,description,urlImage, gender, clan, softSkill, language, techSkill} = dataFormCoder;
        const genderSelectedId:number | null  = obtainIdData(dataBack.genders, gender);
        const clanSelectedId:number | null = obtainIdData(dataBack.clans, clan);
        const softSkillId:number | null = obtainIdData(dataBack.softSkills, softSkill);
        const languageId:number | null = obtainIdData(dataBack.languages, language);
        const techSkillId:number | null = obtainIdData(dataBack.techSkills, techSkill);

        if(!clanSelectedId || !softSkillId || !techSkillId || !languageId || !genderSelectedId ){
            return ({message: "Error, Is required the params selected"});
        }

        const structureCoder:IStructureCreateCoder = {
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
                technicalSkillName: techSkill ? techSkill : "java",
                levelId: 1, 
                levelName: "Avanzado"
            }]
        };
        const coderUpdate = await updateCoderService(structureCoder, parseInt(coderId!));
        if(coderUpdate === "No data received from server"){
            setLoading(false);
            inputAlert("updated coder successfully", "success");
            return;
        }
        setLoading(false);
        inputAlert("Erro to update coder", "error");
    }
    const handleBack = () =>{
        setLoading(true);
        navigate("/admin");
      }

    useEffect(()=>{
        const getCoderById = async() =>{
            if(!coderId) return;
            setLoading(true);
            const data = await getCoderByIdService(parseInt(coderId));
            if(data && "message" in data) return;
            setDataFormCoder({
                name: data.name,
                birthday: data.birthday,
                urlImage: data.urlImage,
                gender: data.genderName,
                clan: dataBack.clans[0].name,
                softSkill: data.softSkills[0],
                language: data.languageLevels[0].languageName,
                techSkill: dataBack.techSkills[0].name,
                description: data.description
            });
            setLoading(false);
        };
        getCoderById();
    },[]);
    console.log(dataFormCoder)
    return (
        <>
        {loading ? <CircularLoader flag={loading} /> : null}
        <main className="content-coder-update">
            <div className="update-image">
                <img 
                src={dataFormCoder.urlImage ? dataFormCoder.urlImage : ""} 
                alt={ dataFormCoder.name ? dataFormCoder.name : "There is not image"}
                onLoad={()=>setImageLoaded(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                {imageLoaded 
                ?
                <MainButton
                type="button"
                text={<KeyboardBackspaceIcon />}
                onClick={handleBack} />
                : null
                }
                
            </div>
            <form className="update-information">
                <div className="information-name-birthday">
                    <TextInput
                        label=""
                        name="name"
                        onChange={handleChange}
                        type="text"
                        error={false}
                        required={true} 
                        defaultValue={dataFormCoder.name ? dataFormCoder.name : ""}
                    />
                    <TextInput 
                        label=""
                        name="birthday"
                        onChange={handleChange}
                        type="date"
                        error={false}
                        required={true} 
                        defaultValue={dataFormCoder.birthday ? dataFormCoder.birthday : ""}
                    /> 
                </div>
                <TextArea
                name="description"
                onChange={handleChange}
                value={dataFormCoder.description ? dataFormCoder.description : ""}
                placeholder="Enter description"
                />

                <TextInput 
                    label=""
                    name="urlImage"
                    onChange={handleChange}
                    type="text"
                    error={false}
                    required={true} 
                    defaultValue={dataFormCoder.urlImage ? dataFormCoder.urlImage : ""}
                />

                <div className="information-gender-clans">
                    <SelectOptions
                        label="genders"
                        name="gender"
                        onChange={handleChange}
                        values={dataBack ? dataBack.genders.map((gender)=> gender.name) : ["There are not genders"]}
                        value={dataFormCoder.gender ? dataFormCoder.gender : ""}
                    />
                    <SelectOptions
                        label="clans"
                        name="clan"
                        onChange={handleChange}
                        values={dataBack ? dataBack.clans.map((clan)=> clan.name) : ["There are not clans"]}
                        value={dataFormCoder.clan ? dataFormCoder.clan : ""}
                    />
                </div>

                <SelectOptions
                    label="softSkills"
                    name="softSkill"
                    onChange={handleChange}
                    values={dataBack ? dataBack.softSkills.map((softSkill)=> softSkill.name) : ["There are not softSkills"]}
                    value={dataFormCoder.softSkill ? dataFormCoder.softSkill : ""}
                />
                
                <div className="information-languages-techSkills">
                    <SelectOptions
                        label="languages"
                        name="language"
                        onChange={handleChange}
                        values={dataBack ? dataBack.languages.map((language)=> language.name) : ["There are not languages"]}
                        value={dataFormCoder.language ? dataFormCoder.language : ""}
                    />
                    <SelectOptions
                        label="techSkills"
                        name="techSkill"
                        onChange={handleChange}
                        values={dataBack ? dataBack.techSkills.map((techSkill)=> techSkill.name) : ["There are not techSkills"]}
                        value={dataFormCoder.techSkill ? dataFormCoder.techSkill : ""}
                    />
                </div>
                <MainButton
                    text={"Update coder"}
                    onClick={handleUpdate}
                    icon={<CheckIcon />}
                    className="button-update"
                />
            </form>
        </main>
        </>
    );

}