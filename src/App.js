import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import { setUser } from './features/userSlice'
import Signin from './pages/SignIn/SignIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
    SearchFeed,
    Navbar,
    Feed,
    VideoDetail,
    ChannelDetail
} from './components'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            const user = JSON.parse(savedUser)
            dispatch(setUser(user))
            return
        }
    }, [dispatch])

    return (
        <div className="App">
            <AuthContextProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Signin />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/video/:id" element={<VideoDetail />} />
                        <Route
                            path="/channel/:id"
                            element={<ChannelDetail />}
                        />
                        <Route
                            path="/search/:searchTerm"
                            element={<SearchFeed />}
                        />
                    </Routes>
                </Router>
            </AuthContextProvider>
        </div>
    )
}

export default App
