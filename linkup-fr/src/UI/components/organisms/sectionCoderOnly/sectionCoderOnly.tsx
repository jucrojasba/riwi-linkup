import "./sectionCoderOnly.css"; // Import styles for the component
import UserText from "../../atoms/UserText/UserText"; // Import UserText component
import { ButtonCoder } from "../../atoms"; // Import ButtonCoder component
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Import play arrow icon
import { useEffect, useState } from "react"; // Import hooks from React
import { ICoderBack } from "@/UI/interfaces/ICoderInterface"; // Import ICoderBack interface
import { getCoderByIdService } from "@/services/coderService"; // Import service to fetch coder data
import { useSearchParams } from "next/navigation"; // Hook to access search params in URL
import calculateAge from "@/utilities/calculateAge"; // Utility function to calculate age
import { capitalizeSentece } from "@/utilities/CapitalizeSentence"; // Utility to capitalize sentences
import { LinearLoader } from "../../atoms"; // Import LinearLoader component
import { capitalizeFirstLetter } from "@/utilities/CapitalizeFirstLetter"; // Utility to capitalize the first letter
import MainButton from "../OrganismTest"; // Import MainButton component
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'; // Import backspace icon
import { useRouter } from "next/navigation"; // Hook to handle navigation

// Main component for displaying coder details
export default function SectionCoderOnly(): React.ReactElement {
  // Initial state for coder information
  const initialCoder: ICoderBack = {
    id: 0,
    name: "",
    birthday: "",
    description: "",
    urlImage: "",
    clanId: 0,
    genderName: "",
    genderId: 0,
    softSkills: [],
    languageLevels: [],
    technicalSkillLevels: [],
  };

  // State variables
  const [coder, setCoder] = useState<ICoderBack>(initialCoder); // State to store coder information
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [imageLoaded, setImageLoaded] = useState<boolean>(false); // Image loading state
  const searchParams = useSearchParams(); // Get search parameters from URL
  const router = useRouter(); // Router for navigation

  // Fetch coder data when the component mounts
  useEffect(() => {
    const getCoderById = async () => {
      const coderId = searchParams.get("coder"); // Get coder ID from search params
      if (!coderId) return;

      // Fetch coder data by ID
      const data = await getCoderByIdService(parseInt(coderId));
      if (data && "message" in data) return; // Check for error response

      setCoder(data); // Set fetched coder data
      setLoading(false); // Update loading state
    };

    getCoderById(); // Call the function
  }, [searchParams]); // Run effect when search params change

  // Handle back navigation
  const handleBack = () => {
    setLoading(true); // Start loading
    router.push("/admin"); // Navigate back to admin page
  }

  // Render component once loading is complete
  if (!loading) {
    return (
      <>
        {loading ? <LinearLoader flag={true} /> : null} {/* Show loader if still loading */}
        <div className="content-coder">
          <div className="coder">
            <div className="coder-image">
              <img 
                src={coder.urlImage} // Display coder's image
                alt={`image ${coder.name}`} // Alt text for the image
                onLoad={() => setImageLoaded(true)} // Update state when image loads
                style={{ display: imageLoaded ? 'block' : 'none' }} // Show image when loaded
              />
              <MainButton
                type="button"
                text={<KeyboardBackspaceIcon />} // Back button icon
                onClick={handleBack} // Handle back navigation
              />
            </div>
            <div className="content-information">
              <div className="information-header">
                <UserText
                  title="Name"
                  paragraph={coder.name ? capitalizeSentece(coder.name) : "Loading name..."} // Display coder's name
                  className="user-name"
                />
                <UserText
                  title="Years"
                  paragraph={coder.birthday ? `${calculateAge(coder.birthday)} years` : "Loading birthday..."} // Display coder's age
                  className="user-age"
                />
                <UserText
                  title="Gender"
                  paragraph={coder.genderName ? capitalizeSentece(coder.genderName) : "Loading gender..."} // Display coder's gender
                  className="user-gender"
                />
              </div>
              <div className="information-body">
                <h4>Description</h4>
                <p>{coder.description ? capitalizeFirstLetter(coder.description) : "Loading description..."}</p> {/* Display coder's description */}
              </div>
              <div className="information-footer">
                <ButtonCoder 
                  content="CV"
                  onClick={() => coder.name === "jose barreto" ? window.open("https://drive.google.com/file/d/1dSj9QbaCDSnMa4W8KPTzDh6Y_qlaX9L6/view?usp=sharing", "_blank") : null}
                />
                <ButtonCoder 
                  content={<PlayArrowIcon />}
                  className="play-button"
                  onClick={() => coder.name === "jose barreto" ? window.open("https://www.youtube.com/watch?v=ot0-BgWcDuQ", "_blank") : null}
                />
                <ButtonCoder 
                  content="Portfolio"
                  onClick={() => coder.name === "jose barreto" ? window.open("https://www.behance.net/gallery/207372215/PORTAFOLIO", "_blank") : null}
                />
                <ButtonCoder 
                  content="Repository"
                  onClick={() => coder.name === "jose barreto" ? window.open("https://github.com/joseCardona12", "_blank") : null}
                /> 
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <LinearLoader flag={true} /> // Show loader while fetching data
    );
  }
}
