
import TranslateIcon from '@mui/icons-material/Translate';
export default function SelectLanguage() {

  const languageChange = (language:string) => {
    console.log(language)
  };

  return (
    <div>
      <select onChange={(e) => languageChange(e.target.value)}>
      <TranslateIcon />
        <option value="es">Español</option>
        <option value="en">Inglés</option>
      </select>
    </div>
  );
}