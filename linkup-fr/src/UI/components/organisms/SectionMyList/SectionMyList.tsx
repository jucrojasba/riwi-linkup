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
      <section className="mainGeneral-section-3d">
      <div className="section-buttons-3d">
          <KeyboardArrowLeftIcon
            className="button-left"
            onClick={handleBack}
            style={{
              cursor: "pointer",
              visibility: currentPage === 0 ? "hidden" : "visible",
              width: '60px',
              height: '60px',
            }}
          />
          <KeyboardArrowRightIcon
            className="button-right"
            onClick={handleNext}
            style={{
              width: '60px',
              height: '60px',
              cursor: "pointer",
              visibility:
                (currentPage + 1) * limitItems >= coders.coders.length ? "hidden" : "visible",
            }}
          />
        </div>
        <div className="section-content-cards-3d">
          {!loadingRequest && (
            <div className="section-content-cards-3d">
              {!loadingRequest && (
            <div className="section-content-cards-3d">
              <>
                <Card
                  id="card-0"
                  setCoders={setCoders}
                  coders={coders}
                  id_coder={paginatedCoders[0]?.id || 0}
                  key="card-0"
                  url_image={paginatedCoders[0]?.urlImage || ""}
                  alt_image={`coder-${paginatedCoders[0]?.name || "unknown"} image`}
                  name_user={paginatedCoders[0]?.name || ""}
                  age_user={`${calculateAge(paginatedCoders[0]?.birthday || "")} years`}
                  status={true}
                  isDarkMode={isDarkMode}
                />
              </>
            </div>
          )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
