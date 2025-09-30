import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import styles from './Header.module.css'
function SearchBar(){
    const { searchTerm, setSearchTerm } = useContext(SearchContext)

    return(
        <div className={styles.search}>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
        </div>
    )
}

export default SearchBar