import { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext()
export function SearchProvider({children}){
    const [searchTerm, setSearchTerm] = useState('')

    return(
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    )
}