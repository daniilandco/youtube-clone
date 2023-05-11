import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo } from '../../utils/consts'
import './Navbar.css'
import SearchBar from '../SearchBar/SearchBar'
import Button from '../button/Button'

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <Link to="/feed" className="logoLink">
                <img src={logo} alt="logo" />
            </Link>
            <SearchBar />
            <Button
                title={'My Videos'}
                onClick={() => navigate('/my-videos')}
                height='70%'
            />
        </nav>
    )
}

export default Navbar
