import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';

const Search = ({
    placeholder
}) => {
    const [_, setSearchParams] = useSearchParams();

    const handleSearch = (event) => {
        setSearchParams({ search: event.target.value });
    }
    return (
        <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" onChange={handleSearch} placeholder={placeholder} />
            <FaSearch />
        </label>
    )
}

export default Search