import { useState } from "react";
import { SearchContext } from "./SearchContext";

export function SearchProvider({children}){
    const [searchTerm, setSearchTerm] = useState('')

    return(
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    )
}