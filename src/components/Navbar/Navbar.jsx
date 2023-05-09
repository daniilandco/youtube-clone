import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../utils/consts'
import './Navbar.css'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/feed" className="logoLink">
                <img src={logo} alt="logo" className="logoImg"></img>
            </Link>
            <SearchBar />
        </nav>
    )
}

export default Navbar
