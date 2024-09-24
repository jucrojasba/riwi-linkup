import "./modalStyles.css"; // Import styles for the modal
import CloseIcon from '@mui/icons-material/Close'; // Import close icon
import { TextInput } from "../../atoms"; // Import TextInput component
import { ChangeEvent, useEffect, useState } from "react"; // Import React hooks
import { MainButton } from "../../atoms"; // Import MainButton component
import CheckIcon from '@mui/icons-material/Check'; // Import check icon
import { SelectChangeEvent } from "@mui/material"; // Import types for select change events
import SelectOptions from "../../atoms/Select/Select"; // Import SelectOptions component
import { IForm } from "@/UI/interfaces/FormInterface"; // Import IForm interface
import { useDataBackLoad } from "@/global-states/dataBack"; // Hook to fetch data
import TextArea from "../../atoms/TextArea/TextArea"; // Import TextArea component
import { obtainIdData } from "@/utilities/obtainIdData"; // Utility function to obtain IDs
import { IStructureCreateCoder } from "@/UI/interfaces/structureCreateCoder"; // Import interface for coder structure
import { createCoderService } from "@/services/coderService"; // Service to create a coder
import { inputAlert } from "../../molecules/Alert/Alert"; // Alert utility
import { CircularLoader } from "../../atoms"; // Loader component
import { ICoders } from "@/UI/interfaces/ICoderInterface"; // Import coder interface

// Define the props for the Modal component
interface IModalProps {
    showModal: boolean; // State to control modal visibility
    setShowModal: (value: boolean) => void; // Function to set modal visibility
}

// Main Modal component
export function Modal({ showModal, setShowModal }: IModalProps): React.ReactNode {
    // Fetch data from global state
    const dataBack = useDataBackLoad((state) => state.dataBack);
    const { genders, clans, languages, softSkills, techSkills } = dataBack;

    const [loading, setLoading] = useState<boolean>(false); // Loading state
    // Initial form data
    const dataForm: IForm = {
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

    const [selectedValue, setSelectedValue] = useState(dataForm); // State to hold form values

    // Handle changes in input fields
    const handleChange = (e: SelectChangeEvent | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target; 
        setSelectedValue((prevState) => ({
            ...prevState,
            [name]: name === "birthday" ? new Date(value) : value, // Convert birthday to Date object
        }));
    };

    // Handle the creation of a new coder
    const handleClickCreate = async () => {
        setLoading(true); // Start loading
        const { name, birthday, description, urlImage, gender, clan, softSkill, language, techSkill } = selectedValue;

        // Obtain IDs for selected values
        const genderSelectedId: number | null = obtainIdData(genders, gender);
        const clanSelectedId: number | null = obtainIdData(clans, clan);
        const softSkillId: number | null = obtainIdData(softSkills, softSkill);
        const languageId: number | null = obtainIdData(languages, language);
        const techSkillId: number | null = obtainIdData(techSkills, techSkill);

        // Check if all required fields are selected
        if (!clanSelectedId || !softSkillId || !techSkillId || !languageId || !genderSelectedId) {
            return ({ message: "Error, required parameters are missing" });
        }

        // Prepare coder object for creation
        const coder: IStructureCreateCoder = {
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
                technicalSkillName: techSkill,
                levelId: 1,
                levelName: "Advanced"
            }]
        };

        // Call service to create coder
        const coderCreated = await createCoderService(coder);
        console.log(coderCreated);
        if (!coderCreated) {
            inputAlert("Error creating user", "error");
            return ({ message: coderCreated });
        }
        inputAlert("Coder created successfully", "success");
        setLoading(false); // Stop loading
        setShowModal(false); // Close modal
    };

    // Handle modal close
    const handleClickClose = () => {
        console.log("close");
        setShowModal(false); // Close modal
    };

    // Render the modal if showModal is true
    if (showModal) {
        return (
            <>
                {loading ? <CircularLoader flag={loading} /> : null} {/* Show loader if loading */}
                <div className="content-modal">
                    <div className="modal">
                        <div onClick={handleClickClose}>
                            <CloseIcon sx={{
                                position: "absolute", 
                                top: "15px", 
                                right: "15px", 
                                backgroundColor: "var(--red-color)", 
                                borderRadius: "5px", 
                                color: "var(--white-color)", 
                                padding: "2px", 
                                cursor: "pointer"
                            }} />
                        </div>
                        <form className="modal-information">
                            <div className="information-name-birthday">
                                <TextInput 
                                    label="Name"
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
                                label="URL Image"
                                name="urlImage"
                                onChange={handleChange}
                                type="text"
                                error={false}
                                required={true} 
                            />
                            <div className="information-gender-clans">
                                <SelectOptions
                                    label="Genders"
                                    name="gender"
                                    onChange={handleChange}
                                    values={genders.map((gender) => gender.name)}
                                    value={selectedValue.gender}
                                />
                                <SelectOptions
                                    label="Clans"
                                    name="clan"
                                    onChange={handleChange}
                                    values={clans.map((clan) => clan.name)}
                                    value={selectedValue.clan}
                                />
                            </div>
                            <SelectOptions
                                label="Soft Skills"
                                name="softSkill"
                                onChange={handleChange}
                                values={softSkills.map((softSkill) => softSkill.name)}
                                value={selectedValue.softSkill}
                            />
                            <div className="information-languages-techSkills">
                                <SelectOptions
                                    label="Languages"
                                    name="language"
                                    onChange={handleChange}
                                    values={languages.map((language) => language.name)}
                                    value={selectedValue.language}
                                />
                                <SelectOptions
                                    label="Tech Skills"
                                    name="techSkill"
                                    onChange={handleChange}
                                    values={techSkills.map((techSkill) => techSkill.name)}
                                    value={selectedValue.techSkill}
                                />
                            </div>
                            <MainButton
                                text={"Create Coder"}
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
        return null; // If modal is not shown, return null
    }
}
