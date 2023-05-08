import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../utils/consts'
import './Navbar.css'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="logoLink">
                <img src={logo} alt="logo" className="logoImg"></img>
            </Link>
            <SearchBar />
        </div>
    )
}

export default Navbar
