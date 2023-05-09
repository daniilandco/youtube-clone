import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { magnifierIcon } from '../../utils/consts'
import './SearchBar.css'

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (query) {
            navigate(`/search/${query}`)

            setQuery('')
        }
    }

    return (
        <section className="searchBarContainer">
            <form
                className="form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-field"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    <img src={magnifierIcon} />
                </button>
            </form>
        </section>
    )
}

export default SearchBar
