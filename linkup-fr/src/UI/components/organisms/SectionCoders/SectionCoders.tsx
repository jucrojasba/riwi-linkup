import "./sectionStyles.css"; // Import styles for the component
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"; // Icon for right arrow
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"; // Icon for left arrow
import calculateAge from "@/utilities/calculateAge"; // Utility function to calculate age
import { ICoder, ICoders } from "@/UI/interfaces/ICoderInterface"; // Interfaces for coder data
import { useEffect, useState } from "react"; // Import hooks from React
import { getCodersService } from "@/services/coderService"; // Service to fetch coders
import { Card, Filter } from "../../molecules"; // Import Card and Filter components
import { CircularLoader } from "../../atoms/loaders/Loaders"; // Loader component
import { useCodersFilter } from "@/global-states/coder"; // Global state for coders filter
import { useTechSkill } from "@/global-states/techSkill"; // Global state for tech skills
import { TitleMain } from "../../atoms"; // Title component
import { ButtonMore } from "../../atoms"; // Button for creating a new coder
import { Modal } from "../Modal/Modal"; // Import Modal component
import { useLanguage } from "@/global-states/language-mode"; // Global state for language

// Props interface for the SectionCoders component
interface ISectionCodersProps {
  render: boolean;
  setRender: (render: boolean) => void;
  isDarkMode: boolean;
}

// Main functional component
export default function SectionCoders({ render, setRender, isDarkMode }: ISectionCodersProps): React.ReactElement {
  const [loadingRequest, setLoadingRequest] = useState<boolean>(true); // Loading state
  const codersFilter = useCodersFilter((state) => state.CodersFilter); // Get filtered coders
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination
  const limitItems = 6; // Number of coders per page
  const { techSkill } = useTechSkill(); // Get tech skills from global state
  const [showModal, setShowModal] = useState<boolean>(false); // State to control modal visibility
  const language = useLanguage((state) => state.language); // Get current language setting

  // Initial coder object
  const initialCoder: ICoder = {
    id: 0,
    urlImage: "",
    name: "",
    birthday: "",
  };

  // Initial state for coders
  const initialCoders: ICoders = {
    coders: [initialCoder],
  };

  // State for storing list of coders
  const [coders, setCoders] = useState<ICoders>(initialCoders);

  // Fetch coders data on component mount
  useEffect(() => {
    const getCoders = async () => {
      const coders = await getCodersService(); // Fetch coders
      if (!coders) {
        console.log({ message: "Error getting users" });
        setLoadingRequest(false);
        return;
      }
      setCoders({ coders }); // Update state with fetched coders
      setLoadingRequest(false); // Stop loading
    };
    getCoders(); // Call the function
  }, []);

  // Update coders when filters change
  useEffect(() => {
    if (render) { // If a filter is applied
      setCoders({ coders: codersFilter }); // Update coders with filtered list
    }
  }, [render, codersFilter]);

  // Calculate pagination
  const startIndex = currentPage * limitItems;
  const paginatedCoders = coders.coders.slice(startIndex, startIndex + limitItems); // Get coders for the current page

  // Handlers for pagination
  const handleNext = () => {
    if ((currentPage + 1) * limitItems < coders.coders.length) {
      setCurrentPage(currentPage + 1); // Move to the next page
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // Move to the previous page
    }
  };

  const handleCreateCoder = () => {
    setShowModal(true); // Show modal for creating a new coder
  }

  return (
    <>
      {showModal ? <Modal showModal={showModal} setShowModal={setShowModal} /> : null} {/* Render modal if visible */}
      <section className="mainGeneral-section">
        <div className="section-filters">
          <TitleMain
            className="titleMain"
            title={language ? "Filtros" : "Filters"} // Title based on language
            subtitle=""
          />
          <Filter render={render} setRender={setRender} /> {/* Render filters */}
        </div>
        <div className="section-content-cards">
          {coders.coders.length === 0 ? (
            <p style={isDarkMode ? { color: 'var(--white-color)' } : { color: 'var(--paragraph-color)' }}>
              There are not coders...
            </p>
          ) : ""}
          {loadingRequest ? (
            <CircularLoader flag={true} /> // Show loader if loading
          ) : (
            paginatedCoders.map((coder) => (
              <Card
                setCoders={setCoders} // Pass setter function for coders
                coders={coders} // Pass current coders
                id_coder={coder.id} // Coder ID
                key={coder.id} // Unique key for each coder
                url_image={coder.urlImage} // Coder image URL
                alt_image={`coder-${coder.name} image`} // Alt text for image
                name_user={coder.name} // Coder name
                age_user={coder.birthday ? `${calculateAge(coder.birthday)} years` : "0"} // Coder age
                status={true} // Status flag
                techSkill={techSkill} // Tech skills for the coder
                isDarkMode={isDarkMode} // Dark mode flag
              />
            ))
          )}
        </div>
        <div className="section-buttons">
          <KeyboardArrowLeftIcon
            className="button-left"
            onClick={handleBack} // Back button
            style={{
              cursor: "pointer",
              visibility: currentPage === 0 ? "hidden" : "visible", // Hide if on the first page
            }}
          />
          <KeyboardArrowRightIcon
            className="button-right"
            onClick={handleNext} // Next button
            style={{
              cursor: "pointer",
              visibility:
                (currentPage + 1) * limitItems >= coders.coders.length
                  ? "hidden" // Hide if on the last page
                  : "visible",
            }}
          />
        </div>
        <div className="create-coder-wraper">
          <ButtonMore
            text="Create" // Button text
            className="button-create-coder"
            onClick={handleCreateCoder} // Click handler to create coder
          />
        </div>
      </section>
    </>
  );
}
