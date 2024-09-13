import "./sectionStyles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import calculateAge from "@/utilities/calculateAge";
import { ICoder, ICoders } from "@/UI/interfaces/ICoderInterface";
import { useEffect, useState } from "react";
import { getCodersService } from "@/services/coderService";
import { Card } from "../../molecules";
import { CircularLoader } from "../../atoms/loaders/Loaders";

export default function SectionCoders(): React.ReactElement {
  const [loadingRequest, setLoadingRequest] = useState<boolean>(true); // Set initial state to true
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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const getCoders = async () => {
      const coders = await getCodersService();
      if (!coders) {
        console.log({ message: "Error getting users" });
        setLoadingRequest(false);
        return;
      }
      setCoders({ coders });
      setLoadingRequest(false); // Set to false after data is fetched
    };
    getCoders();
  }, []);

  // Calculate paginated coders
  const startIndex = currentPage * itemsPerPage;
  const paginatedCoders = coders.coders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Pagination handlers
  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < coders.coders.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log(coders)

  return (
    <section className="main-section">
      <div className="section-content-cards">
        {loadingRequest ? (
          <CircularLoader flag={true} /> // Display loader when loading
        ) : (
          paginatedCoders.map((coder) => (
            <Card
              id_coder={coder.id}
              key={coder.id}
              url_image={coder.urlImage}
              alt_image={`coder-${coder.name} image`}
              name_user={coder.name}
              age_user={`${calculateAge(coder.birthday)} years`}
              status={true}
            />
          ))
        )}
      </div>
      <div className="section-buttons">
        <KeyboardArrowLeftIcon
          className="button-left"
          onClick={handlePrevious}
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
              (currentPage + 1) * itemsPerPage >= coders.coders.length
                ? "hidden"
                : "visible",
          }}
        />
      </div>
    </section>
  );
}
