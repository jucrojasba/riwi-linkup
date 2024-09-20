import "./inputFilterStyles.css";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete'; // Importa el ícono de eliminar


interface InputFilterProps {
  label: string | undefined | null ;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  className?: string;
}

export default function InputFilter({
  label,
  name,
  onChange,
  checked,
  className
}: InputFilterProps): React.ReactNode {
  return (
    <div className="content-filter">
      <label
        htmlFor={name}
        className={checked ? "checked-filter" : `unchecked_${className}`} // Cambia según el estado
      >
        {label === "español" || label === "spanish"  ? `${label} 🇪🇸`: label === "francés" || label === "french" ? `${label} 🇫🇷`: label === "inglés" || label === "english" ? `${label} 🇬🇧`: label}
        <input
          type="checkbox"
          checked={checked}
          id={name}
          name={name}
          onChange={onChange}
        />
        {checked && <CheckIcon className="checked-icon"/>}
      </label>
    </div>
  );
}
