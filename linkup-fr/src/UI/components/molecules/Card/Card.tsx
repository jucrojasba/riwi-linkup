import "./cardStyles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ButtonMore from "../../atoms/ButtonMore/ButtonMore";
import React, { useState } from "react";
import { deleteCoderService } from "@/services/coderService";
import { CircularLoader } from "../../atoms/loaders/Loaders";
import { useRouter } from "next/navigation";
import { confirmDeleteAlert, inputAlert } from "../Alert/Alert";
import { useTechSkill } from "@/global-states/techSkill";
import { ICoder, ICoders } from "@/UI/interfaces/ICoderInterface";

interface ICardProps {
  id_coder?: number;
  url_image?: string;
  alt_image?: string;
  name_user?: string;
  age_user?: string;
  status: boolean;
  techSkill?:string;
  isDarkMode: boolean;
  setCoders: (value:ICoders) =>void
  coders:ICoders
}
export default function Card({
  id_coder,
  url_image,
  alt_image,
  name_user,
  age_user,
  status,
  isDarkMode,
  coders,
  setCoders
}: ICardProps): React.ReactNode {
  const router = useRouter();
  const handleClickUpdate = async (e: React.MouseEvent) => {};
  const {techSkill} = useTechSkill();
  const [loading,setLoading] = useState<boolean>(false);


  const handleClickDelete = async (id_coder:number): Promise<void> => {
    const isConfirm: boolean = await confirmDeleteAlert();
    setLoading(true);
    if(!isConfirm) return;
    if(!id_coder)return;
    await deleteCoderService(id_coder);
    setLoading(false);
    inputAlert("coder deleted correctly", "success");
    const codersFilter = coders.coders.filter((coder:ICoder)=>coder.id !== id_coder);
    setCoders({
      coders: codersFilter,
    })
  };

  const handleClickMore = (id_coder:number | undefined) => {
    console.log(id_coder)
    router.push(`/admin/coder?coder=${id_coder}`);
  };

  if (!status) {
    return <CircularLoader flag={true} />;
  }
  return (
    <>
    {loading ? <CircularLoader flag={loading} />: null}
      <div className={isDarkMode?"card dark-mode":"card"}>
        <div className="card-header">
          <img src={url_image} alt={alt_image} width={100} height={80} />
          <div className="header-buttons">
            <EditIcon
              data-id={id_coder}
              className="edit-icon"
              onClick={(e) => handleClickUpdate(e)}
            />
            <DeleteIcon
              data-id={id_coder}
              className="delete-icon"
              onClick={() => handleClickDelete(id_coder!)}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="body-information">
            <h3 className="body-title">{name_user}</h3>
            <h5 className="body-subtitle" style={{ fontWeight: "400" }}>
              {age_user}
            </h5>
          </div>
          <div onClick={()=>handleClickMore(id_coder)}>
            <ButtonMore />
          </div>
        </div>
      </div>
    </>
  );
}
