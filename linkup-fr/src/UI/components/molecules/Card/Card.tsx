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
  id?: string; // Define the optional property 'id'
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
const Card: React.FC<ICardProps> = ({
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
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const language = useLanguage((state) => state.language);

  // State for management the image
  const [currentImage, setCurrentImage] = useState<string>(url_image || "/images/imageDefault.jpg");

  // Function to handle coder deletion
  const handleClickDelete = async (coderId: number | undefined): Promise<void> => {
    if (!coderId) return;

    const isConfirm = await confirmDeleteAlert(
      `${language ? '¿Deseas eliminar al desarrollador?' : 'Do you want to delete the developer?'}`,
      language
    );

    setLoading(true);

    if (!isConfirm) {
      setLoading(false);
      return;
    }

    await deleteCoderService(coderId);
    setLoading(false);
    inputAlert("Coder deleted correctly", "success");

    const codersFilter = coders.coders.filter((coder: ICoder) => coder.id !== coderId);
    setCoders({ coders: codersFilter });
  };

  // Function to handle coder update
  const handleUpdate = (coderId: number | undefined) => {
    if (coderId) {
      setLoading(true);
      navigate(`admin/updateCoder?coder=${coderId}`);
    }
  };

  // Function to handle navigation to coder details
  const handleClickMore = (coderId: number | undefined) => {
    if (coderId) {
      router.push(`/admin/coder?coder=${coderId}`);
    }
  };

  const handleImageError = () => {
    setCurrentImage("/images/imageDefault.jpg"); // Cargar imagen por defecto
  };

  // If the status is false, show a loading spinner
  if (!status) {
    return <CircularLoader flag={true} />;
  }

  return (
    <div id={id} className={isDarkMode ? "card dark-mode" : "card"}>
      {loading && <CircularLoader flag={loading} />}
      <div className="card-header">
        <img 
          src={currentImage} 
          alt={alt_image} 
          width={100} 
          height={80}
          onError={handleImageError} // Manejar error de carga
        />
        <div className="header-buttons">
          <EditIcon
            data-id={id_coder}
            className="edit-icon"
            onClick={() => handleUpdate(id_coder)} // Call update function
          />
          <DeleteIcon
            data-id={id_coder}
            className="delete-icon"
            onClick={() => handleClickDelete(id_coder)} // Call delete function
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
  );
};

export default Card;
