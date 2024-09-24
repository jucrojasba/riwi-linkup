import "./cardStyles.css"; // Importing CSS styles for the card component
import DeleteIcon from "@mui/icons-material/Delete"; // Importing delete icon
import EditIcon from "@mui/icons-material/Edit"; // Importing edit icon
import ButtonMore from "../../atoms/ButtonMore/ButtonMore"; // Importing ButtonMore component
import React, { useState } from "react"; // Importing React and useState hook
import { deleteCoderService } from "@/services/coderService"; // Importing service to delete coder
import { CircularLoader } from "../../atoms/loaders/Loaders"; // Importing loading spinner
import { useRouter } from "next/navigation"; // Importing router from Next.js
import { confirmDeleteAlert, inputAlert } from "../Alert/Alert"; // Importing alert utilities
import { ICoder, ICoders } from "@/UI/interfaces/ICoderInterface"; // Importing interfaces for coders
import { capitalizeSentece } from "@/utilities/CapitalizeSentence"; // Importing utility to capitalize sentences
import useNavigate from "@/utilities/NavigateTo"; // Custom hook for navigation
import { useLanguage } from "@/global-states/language-mode"; // Importing language state

// Interface for card props
interface ICardProps {
  id?: string; // Aquí se define la propiedad 'id'
  id_coder?: number; // Optional coder ID
  url_image?: string; // Optional image URL
  alt_image?: string; // Optional alt text for image
  name_user?: string; // Optional user name
  age_user?: string; // Optional user age
  status: boolean; // Status indicating if the coder is active
  techSkill?: string; // Optional technical skills
  isDarkMode: boolean; // Flag for dark mode
  setCoders: (value: ICoders) => void; // Function to set coders state
  coders: ICoders; // Coders data
}

// Functional component for Card
export default function Card({
  id,
  id_coder,
  url_image,
  alt_image,
  name_user,
  age_user,
  status,
  isDarkMode,
  coders,
  setCoders,
}: ICardProps): React.ReactNode {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const language = useLanguage((state) => state.language);

  const handleClickDelete = async (id_coder: number): Promise<void> => {
    const isConfirm: boolean = await confirmDeleteAlert(
      `${
        language
          ? "¿Deseas eliminar al desarrollador?"
          : "Do you want to delete the developer?"
      }`,
      language
    );
    setLoading(true);
  const router = useRouter(); // Initialize the router
  const [loading, setLoading] = useState<boolean>(false); // Loading state for async actions
  const navigate = useNavigate(); // Initialize custom navigation hook
  const language = useLanguage((state) => state.language); // Get current language from global state

  // Function to handle coder deletion
  const handleClickDelete = async (id_coder: number): Promise<void> => {
    // Confirm deletion with user
    const isConfirm: boolean = await confirmDeleteAlert(
      `${language ? '¿Deseas eliminar al desarrollador?' : 'Do you want to delete the developer?'}`,
      language
    );

    // Set loading state to true during deletion process
    setLoading(true);
    
    // If user cancels deletion, reset loading and exit function
    if (!isConfirm) {
      setLoading(false);
      return;
    }

    // If no coder ID is provided, exit function
    if (!id_coder) return;

    // Call the service to delete the coder
    await deleteCoderService(id_coder);
    setLoading(false); // Reset loading state

    // Show success alert to the user
    inputAlert("Coder deleted correctly", "success");

    // Filter out the deleted coder from the coders list and update state
    const codersFilter = coders.coders.filter((coder: ICoder) => coder.id !== id_coder);
    setCoders({
      coders: codersFilter,
    });
  };

  const handleUpdate = (coder_id: number) => {
    setLoading(true);
    navigate(`admin/updateCoder?coder=${coder_id}`);
  };

  const handleClickMore = (id_coder: number | undefined) => {
    console.log(id_coder);
    router.push(`/admin/coder?coder=${id_coder}`);
  // Function to handle coder update
  const handleUpdate = (coder_id: number) => {
    setLoading(true); // Set loading state
    navigate(`admin/updateCoder?coder=${coder_id}`); // Navigate to update page
  };

  // Function to handle navigation to coder details
  const handleClickMore = (id_coder: number | undefined) => {
    console.log(id_coder); // Log coder ID for debugging
    router.push(`/admin/coder?coder=${id_coder}`); // Navigate to coder details
  };

  // If the status is false, show a loading spinner
  if (!status) {
    return <CircularLoader flag={true} />;
  }

  return (
    <>
      {loading ? <CircularLoader flag={loading} /> : null}
      <div id={id} className={isDarkMode ? "card dark-mode" : "card"}>
      {loading ? <CircularLoader flag={loading} /> : null} {/* Show loader if loading */}
      <div className={isDarkMode ? "card dark-mode" : "card"}> {/* Card styling based on dark mode */}
        <div className="card-header">
          <img src={url_image} alt={alt_image} width={100} height={80} /> {/* Coder image */}
          <div className="header-buttons">
            <EditIcon
              data-id={id_coder}
              className="edit-icon"
              onClick={() => handleUpdate(id_coder!)} // Call update function
            />
            <DeleteIcon
              data-id={id_coder}
              className="delete-icon"
              onClick={() => handleClickDelete(id_coder!)} // Call delete function
            />
          </div>
        </div>
        <div className="card-body">
          <div className="body-information">
            <h3 className="body-title">
              {name_user ? capitalizeSentece(name_user) : "Loading name..."}
            </h3>
            <h5 className="body-subtitle" style={{ fontWeight: "400" }}>
              {age_user}
            </h5>
          </div>
          <div onClick={() => handleClickMore(id_coder)}>
            <ButtonMore />
          </div>
        </div>
      </div>
    </>
  );
}
