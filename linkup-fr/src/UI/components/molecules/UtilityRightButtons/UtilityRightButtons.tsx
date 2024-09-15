'use client';
import IconWithHover from "@/UI/components/atoms/IconHover/IconHover";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SwitchMode from "@/UI/components/atoms/SwitchDarkMode/SwitchDarkMode";
import './UtilityRightButtons.css';

interface IUtilityRightButtonsProps {
  isDarkMode: boolean;
}

const UtilityRightButtons: React.FC<IUtilityRightButtonsProps> = ({ isDarkMode }) => {
  return (
    <div className="utility-right-buttons">
         <div className="media-icons">
          <IconWithHover
            icon={<InstagramIcon fontSize="inherit" />}
            color="var(--paragraph-color)"
            hoverColor="#FF00FF"
            onClick={() => {window.open('https://www.instagram.com/riwi.io/?hl=en')}}
            isDarkMode={isDarkMode}
          />
          <IconWithHover
            icon={<WhatsAppIcon fontSize="inherit" />}
            color="var(--paragraph-color)"
            hoverColor="#25D366"
            onClick={() => {window.open('https://wa.link/tptm6j')}}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="switch-mode-home">
          <SwitchMode onClick={() => {}}></SwitchMode>
        </div>
    </div>
  );
};

export default UtilityRightButtons;
