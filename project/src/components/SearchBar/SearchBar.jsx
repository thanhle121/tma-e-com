import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchProvider/SearchProvider";
import styles from './SearchBar.module.css'
import { AutoComplete, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";

function SearchBar(){
    const { searchTerm, setSearchTerm } = useContext(SearchContext)
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchProducts = async (query)=>{
        if(!query.trim()){
            setOptions([])
            return
        }

        setLoading(true)
        try{
            const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
            const data = await res.json()
            const products = data.products || []

            const formatted = products.slice(0, 10).map(p=>({
                value: p.title,
                label: (
                    <div className={styles.optionItem}>
                        <img
                        src={p.thumbnail}
                        alt={p.title}
                        width="40"
                        height="40"
                        style={{ marginRight: 10, borderRadius: 4, objectFit: "cover" }}
                        />
                        <span>{p.title}</span>
                    </div>
                ),
                id: p.id,
            }))
            setOptions(formatted)
        } catch (err){
            console.log('Lỗi khi fetch sản phẩm', err);
            setOptions([])
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(searchTerm){
                fetchProducts(searchTerm)
            } else {
                setOptions([])
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchTerm])

    const handleSelect = (option)=>{
        navigate(`/${option}`)
    }

    const handleSearchSubmit = (value) => {
        if(value.trim()){
            navigate(`/search?query=${encodeURIComponent(value)}`)
        }
    }

    return(
        <div className={styles.search}>
            <AutoComplete
                className={styles.customInput}
                value={searchTerm}
                onChange={value=>setSearchTerm(value)}
                onSelect={handleSelect}
                options={options}
                notFoundContent={loading ? <Spin size="small" /> : 'Không có sản phẩm nào'}
            >
                <Input.Search placeholder="Tìm kiếm sản phẩm..." allowClear onSearch={handleSearchSubmit} />
            </AutoComplete>
        </div>
    )
}

export default SearchBar