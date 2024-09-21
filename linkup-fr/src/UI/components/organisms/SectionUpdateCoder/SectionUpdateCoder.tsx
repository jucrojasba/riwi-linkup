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

export default function SectionUpateCoder():React.ReactNode{
    const [loading, setLoading] = useState<boolean> (false);
    const searchParams = useSearchParams();
    const coder_id:string | null = searchParams.get("coder");
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

    const handleChange = (e:ChangeEvent<HTMLInputElement> | SelectChangeEvent | ChangeEvent<HTMLTextAreaElement>) =>{
        const {name,value} = e.target;
        setSelectedValue({
            ...selectedValue,
            [name]: value
        });
        console.log(selectedValue)
    }

    const handleUpdate = () =>{

    }

    useEffect(()=>{
        const getCoderById = () =>{

        };
        getCoderById();
    },[])
    return (
        <>
        {loading ? <CircularLoader flag={loading} /> : null}
        <main className="modal">
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
                        values={[""]}
                        value={selectedValue.gender}
                    />
                    <SelectOptions
                        label="clans"
                        name="clan"
                        onChange={handleChange}
                        values={[""]}
                        value={selectedValue.clan}
                    />
                </div>

                <SelectOptions
                    label="softSkills"
                    name="softSkill"
                    onChange={handleChange}
                    values={[""]}
                    value={selectedValue.softSkill}
                />
                
                <div className="information-languages-techSkills">
                    <SelectOptions
                        label="languages"
                        name="language"
                        onChange={handleChange}
                        values={[""]}
                        value={selectedValue.language}
                    />
                    <SelectOptions
                        label="techSkills"
                        name="techSkill"
                        onChange={handleChange}
                        values={[""]}
                        value={selectedValue.techSkill}
                    />
                </div>
                <MainButton
                    text={"Create coder"}
                    onClick={handleUpdate}
                    icon={<CheckIcon />}
                    className="button-create"
                />
            </form>
        </main>
        </>
    );

}