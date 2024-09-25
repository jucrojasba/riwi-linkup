import SearchIcon from '@mui/icons-material/Search';
import "./searchStyles.css";

export default function Search(): React.ReactNode {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search submission logic here
    };

    return (
        <div className='content-search'>
            <input className='search-input' type="search" placeholder="Search" />
            <SearchIcon sx={{color: "var(--main-color)"}}  />
        </div>
    );
}
