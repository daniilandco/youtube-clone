import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import { setUser } from './features/userSlice'
import Signin from './pages/SignIn/SignIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            const user = JSON.parse(savedUser)
            dispatch(setUser(user))
            return
        }
    }, [])

    return (
        <div className="App">
            <AuthContextProvider>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Signin />} />
                        {/* <Route path="/goodbye" element={<Goodbye />} /> */}
                    </Routes>
                </Router>
            </AuthContextProvider>
        </div>
    )
}

export default App
