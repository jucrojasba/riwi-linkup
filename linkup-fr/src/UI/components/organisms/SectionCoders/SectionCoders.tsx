import "./sectionStyles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import calculateAge from "@/utilities/calculateAge";
import { ICoder, ICoders } from "@/UI/interfaces/ICoderInterface";
import { useEffect, useState } from "react";
import { getCodersService } from "@/services/coderService";
import { Card, Filter } from "../../molecules";
import { CircularLoader } from "../../atoms/loaders/Loaders";
import { useCodersFilter } from "@/global-states/coder";
import { useTechSkill } from "@/global-states/techSkill";
import { TitleMain } from "../../atoms";
import {ButtonMore} from "../../atoms";
import { Modal } from "../Modal/Modal";
import { useLanguage } from "@/global-states/language-mode";

interface ISectionCodersProps {
  render: boolean;
  setRender: (render: boolean) => void;
  isDarkMode: boolean;
}

export default function SectionCoders({render,setRender,isDarkMode}: ISectionCodersProps): React.ReactElement {
  const [loadingRequest, setLoadingRequest] = useState<boolean>(true); // Set initial state to true
  const codersFilter = useCodersFilter((state) => state.CodersFilter);
  const [currentPage, setCurrentPage] = useState(0);
  const limitItems = 6;
  const {techSkill} = useTechSkill();
  const [showModal, setShowModal] = useState<boolean>(false);
  const language = useLanguage((state)=>state.language);

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
      setCoders({coders});
      setLoadingRequest(false);
    };
    getCoders();
  }, []);

  useEffect(() => {
    if(render){ // Is rendered when a filter is applied
      setCoders({coders:codersFilter});
    }
  }, [render, codersFilter]);
  // Calculate paginated coders
  const startIndex = currentPage * limitItems;
  const paginatedCoders =  coders.coders.slice(
    startIndex,
    startIndex + limitItems
  );

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

  const handleCreateCoder = () =>{
    setShowModal(true)
  }

  return (
    <>
    {showModal ? <Modal showModal={showModal} setShowModal={setShowModal}  />: null}
      <section className="mainGeneral-section">
        <div className="section-filters">
          <TitleMain
                className="titleMain"
                title={language?"Filtros":"Filters"}
                subtitle=""
              />
          <Filter render={render} setRender={setRender} />
        </div>
        <div className="section-content-cards">
          {coders.coders.length === 0 ? <p style={isDarkMode ? { color:'var(--white-color)'}: {color:'var(--paragraph-color)'}}>There are not coders...</p> : ""}
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
                age_user={coder.birthday ? `${calculateAge(coder.birthday)} years` : "0"}
                status={true}
                techSkill={techSkill}
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
                (currentPage + 1) * limitItems >= coders.coders.length
                  ? "hidden"
                  : "visible",
            }}
          />
        </div>
        <div className="create-coder-wraper">
        <ButtonMore 
        text={language?'Crear':"Create"}
        className="button-create-coder"
        onClick={handleCreateCoder}
        />
        </div>
      </section>
    </>
    
  );
}
