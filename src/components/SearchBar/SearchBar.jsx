import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './SearchBar.css'

const SearchBar = () => {
    const [state, setState] = useState({})

    return (
    <div className='searchBarContainer'>
        <form className='form'>
            <input 
            type="text" 
            placeholder="Search..." 
            className="search-field" />
            <button type="submit" className="search-button">
                <img src="https://i.ibb.co/t4m9mbQ/magnifying-glass.png"/>
            </button>
        </form>
    </div>
    )
}

export default SearchBar
