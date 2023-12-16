import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo } from '../../utils/consts'
import './Navbar.css'
import SearchBar from '../SearchBar/SearchBar'
import Button from '../button/Button'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice'
import Report from "../Report/Report";

const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [reportVisible, setReportVisible] = useState(false)

    return (
        <nav className="navbar">
            <Link to="/feed" className="logoLink">
                <img src={logo} alt="logo" />
            </Link>
            <SearchBar />
            <Button
                title='My Videos'
                onClick={() => navigate('/my-videos')}
                height='70%'
            />
            <Button
                title='Report problem'
                onClick={() => setReportVisible(prev => !prev)}
                height='70%'
            />
            <Report modalVisible={reportVisible} setModalVisible={setReportVisible} />
            <Button
                title='Sign Out'
                onClick={() => {
                    localStorage.clear()
                    dispatch(setUser(null))
                    navigate('/')
                }}
                height='70%'
                margin='0 10px 0 0'
            />
        </nav>
    )
}

export default Navbar
