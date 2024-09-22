import "./sectionMyList.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import calculateAge from "@/utilities/calculateAge";
import { ICoder, ICoders } from "@/UI/interfaces/ICoderInterface";
import { useEffect, useState } from "react";
import { getCodersService } from "@/services/coderService";
import { Card } from "../../molecules";
import { CircularLoader } from "../../atoms/loaders/Loaders";
import { ButtonMore } from "../../atoms";
import { Modal } from "../Modal/Modal";
import { useLanguage } from "@/global-states/language-mode";

interface ISectionCodersProps {
  render: boolean;
  setRender: (render: boolean) => void;
  isDarkMode: boolean;
}

export default function SectionMyList({ render, setRender, isDarkMode }: ISectionCodersProps): React.ReactElement {
  const [loadingRequest, setLoadingRequest] = useState<boolean>(true); // Set initial state to true
  const [currentPage, setCurrentPage] = useState(0);
  const limitItems = 1; // Show only one coder at a time
  const [showModal, setShowModal] = useState<boolean>(false);
  const language = useLanguage((state) => state.language);

  const initialCoder: ICoder = {
    id: 0,
    urlImage: "",
    name: "",
    birthday: "",
  };

  const initialCoders: ICoders = {
    coders: [initialCoder],
  };

  const [coders, setCoders] = useState<ICoders>(initialCoders); // Full list of coders

  useEffect(() => {
    const getCoders = async () => {
      const coders = await getCodersService();
      if (!coders) {
        console.log({ message: "Error getting users" });
        setLoadingRequest(false);
        return;
      }
      setCoders({ coders });
      setLoadingRequest(false);
    };
    getCoders();
  }, []);

  // Calculate paginated coders
  const startIndex = currentPage * limitItems;
  const paginatedCoders = coders.coders.slice(startIndex, startIndex + limitItems);

  // Pagination handlers
  const handleNext = () => {
    if ((currentPage + 1) * limitItems < coders.coders.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCreateCoder = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal ? <Modal showModal={showModal} setShowModal={setShowModal} /> : null}
      <section className="mainGeneral-section">
        <div className="section-content-cards">
          {loadingRequest ? (
            <CircularLoader flag={true} /> // Display loader when loading
          ) : (
            paginatedCoders.map((coder) => (
              <Card
                setCoders={setCoders}
                coders={coders}
                id_coder={coder.id}
                key={coder.id}
                url_image={coder.urlImage}
                alt_image={`coder-${coder.name} image`}
                name_user={coder.name}
                age_user={`${calculateAge(coder.birthday)} years`}
                status={true}
                isDarkMode={isDarkMode}
              />
            ))
          )}
        </div>
        <div className="section-buttons">
          <KeyboardArrowLeftIcon
            className="button-left"
            onClick={handleBack}
            style={{
              cursor: "pointer",
              visibility: currentPage === 0 ? "hidden" : "visible",
            }}
          />
          <KeyboardArrowRightIcon
            className="button-right"
            onClick={handleNext}
            style={{
              cursor: "pointer",
              visibility:
                (currentPage + 1) * limitItems >= coders.coders.length ? "hidden" : "visible",
            }}
          />
        </div>
      </section>
    </>
  );
}
