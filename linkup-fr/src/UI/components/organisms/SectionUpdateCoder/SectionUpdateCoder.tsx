import "./sectionUpdateCoderStyles.css"; // Importing styles
import React, { ChangeEvent, useEffect, useState } from "react"; // React and hooks
import { CircularLoader, TextInput } from "../../atoms"; // Importing atoms
import CheckIcon from '@mui/icons-material/Check'; 
import CloseIcon from '@mui/icons-material/Close';
import TextArea from "../../atoms/TextArea/TextArea"; // Importing TextArea component
import SelectOptions from "../../atoms/Select/Select"; // Importing Select component
import MainButton from "../OrganismTest"; // Importing main button component
import { IForm } from "@/UI/interfaces/FormInterface"; // Interface for form structure
import { useSearchParams } from "next/navigation"; // Hook for search params
import { SelectChangeEvent } from "@mui/material"; // Type for select change event
import { getCoderByIdService, updateCoderService } from "@/services/coderService"; // Service functions
import { ICoderBack } from "@/UI/interfaces/ICoderInterface"; // Interface for coder data
import { useDataBackLoad } from "@/global-states/dataBack"; // Global state for data
import { IStructureCreateCoder } from "@/UI/interfaces/structureCreateCoder"; // Interface for creating coder structure
import { obtainIdData } from "@/utilities/obtainIdData"; // Utility function to obtain IDs
import { inputAlert } from "../../molecules/Alert/Alert"; // Alert component
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'; // Back icon
import useNavigate from "@/utilities/NavigateTo"; // Custom navigation utility

// Main functional component
export default function SectionUpdateCoder(): React.ReactNode {
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const searchParams = useSearchParams(); // Hook to get URL search parameters
    const dataBack = useDataBackLoad((state) => state.dataBack); // Fetch data from global state
    const coderId = searchParams.get("coder"); // Get coder ID from URL
    const navigate = useNavigate(); // Navigation function
    const dataForm: IForm = { // Initial form data
        name: "",
        birthday: "",
        urlImage: "",
        gender: "",
        clan: "",
        softSkill: "",
        language: "",
        techSkill: "",
        description: ""
    };

    const [dataFormCoder, setDataFormCoder] = useState<IForm>(dataForm); // State for form data
    const [imageLoaded, setImageLoaded] = useState<boolean>(false); // State to track image loading

    // Handle changes in form inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDataFormCoder({
            ...dataFormCoder,
            [name]: value
        });
    };

    // Function to update coder
    const handleUpdate = async () => {
        setLoading(true);
        const { name, birthday, description, urlImage, gender, clan, softSkill, language, techSkill } = dataFormCoder;

        // Obtain selected IDs
        const genderSelectedId: number | null = obtainIdData(dataBack.genders, gender);
        const clanSelectedId: number | null = obtainIdData(dataBack.clans, clan);
        const softSkillId: number | null = obtainIdData(dataBack.softSkills, softSkill);
        const languageId: number | null = obtainIdData(dataBack.languages, language);
        const techSkillId: number | null = obtainIdData(dataBack.techSkills, techSkill);

        // Check if all required parameters are selected
        if (!clanSelectedId || !softSkillId || !techSkillId || !languageId || !genderSelectedId) {
            setLoading(false);
            inputAlert("Error, all parameters must be selected", "error");
            return;
        }

        // Prepare the structure for updating the coder
        const structureCoder: IStructureCreateCoder = {
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

        // Update coder service call
        const coderUpdate = await updateCoderService(structureCoder, parseInt(coderId!));
        setLoading(false); // Stop loading

        // Handle update response
        if (!coderUpdate) {
            inputAlert("Error updating coder", "error");
            return;
        }
        inputAlert("Coder updated successfully", "success");
    };

    // Handle back navigation
    const handleBack = () => {
        setLoading(true);
        navigate("/admin");
    };

    // Fetch coder data by ID
    useEffect(() => {
        const getCoderById = async () => {
            if (!coderId) return;
            setLoading(true);
            const data = await getCoderByIdService(parseInt(coderId));
            if (data && "message" in data) return;
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
    }, [coderId, dataBack.clans, dataBack.techSkills]);

    return (
        <>
            {loading ? <CircularLoader flag={loading} /> : null}
            <main className="content-coder-update">
                <div className="update-image">
                    <img 
                        src={dataFormCoder.urlImage ? dataFormCoder.urlImage : ""} 
                        alt={dataFormCoder.name ? dataFormCoder.name : "No image available"}
                        onLoad={() => setImageLoaded(true)}
                        style={{ display: imageLoaded ? 'block' : 'none' }}
                    />
                    {imageLoaded ? (
                        <MainButton
                            type="button"
                            text={<KeyboardBackspaceIcon />}
                            onClick={handleBack}
                        />
                    ) : null}
                </div>
                <form className="update-information">
                    <div className="information-name-birthday">
                        <TextInput
                            label=""
                            name="name"
                            onChange={handleChange}
                            type="text"
                            required={true} 
                            defaultValue={dataFormCoder.name || ""}
                        />
                        <TextInput 
                            label=""
                            name="birthday"
                            onChange={handleChange}
                            type="date"
                            required={true} 
                            defaultValue={dataFormCoder.birthday || ""}
                        /> 
                    </div>
                    <TextArea
                        name="description"
                        onChange={handleChange}
                        value={dataFormCoder.description || ""}
                        placeholder="Enter description"
                    />

                    <TextInput 
                        label=""
                        name="urlImage"
                        onChange={handleChange}
                        type="text"
                        required={true} 
                        defaultValue={dataFormCoder.urlImage || ""}
                    />

                    <div className="information-gender-clans">
                        <SelectOptions
                            label="Genders"
                            name="gender"
                            onChange={handleChange}
                            values={dataBack ? dataBack.genders.map(gender => gender.name) : ["No genders available"]}
                            value={dataFormCoder.gender || ""}
                        />
                        <SelectOptions
                            label="Clans"
                            name="clan"
                            onChange={handleChange}
                            values={dataBack ? dataBack.clans.map(clan => clan.name) : ["No clans available"]}
                            value={dataFormCoder.clan || ""}
                        />
                    </div>

                    <SelectOptions
                        label="Soft Skills"
                        name="softSkill"
                        onChange={handleChange}
                        values={dataBack ? dataBack.softSkills.map(softSkill => softSkill.name) : ["No soft skills available"]}
                        value={dataFormCoder.softSkill || ""}
                    />
                    
                    <div className="information-languages-techSkills">
                        <SelectOptions
                            label="Languages"
                            name="language"
                            onChange={handleChange}
                            values={dataBack ? dataBack.languages.map(language => language.name) : ["No languages available"]}
                            value={dataFormCoder.language || ""}
                        />
                        <SelectOptions
                            label="Tech Skills"
                            name="techSkill"
                            onChange={handleChange}
                            values={dataBack ? dataBack.techSkills.map(techSkill => techSkill.name) : ["No tech skills available"]}
                            value={dataFormCoder.techSkill || ""}
                        />
                    </div>
                    <MainButton
                        text={"Update Coder"}
                        onClick={handleUpdate}
                        icon={<CheckIcon />}
                        className="button-update"
                    />
                </form>
            </main>
        </>
    );
}
