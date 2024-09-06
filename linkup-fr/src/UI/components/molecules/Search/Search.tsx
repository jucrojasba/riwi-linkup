import SearchIcon from '@mui/icons-material/Search';
import "./searchStyles.css"
export default function Search():React.ReactNode{
    return(
        <div className='content-search'>
            <input className='search-input' type="search" placeholder="Search" />
            <SearchIcon sx={{color: "var(--main-color)"}}  />
        </div>
    )
}