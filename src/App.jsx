import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import { setUser } from './features/userSlice'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { SearchFeed, Navbar } from './components'
import { Feed, SignIn, ChannelDetail, VideoDetail } from './pages'
import './Media.css'

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
                        <Route exact path="/" element={<SignIn />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/video/:id" element={<VideoDetail />} />
                        <Route
                            path="/channel/:id"
                            element={<ChannelDetail />}
                        />
                        <Route
                            path="/search/:query"
                            element={<SearchFeed />}
                        />
                    </Routes>
                </Router>
            </AuthContextProvider>
        </div>
    )
}

export default App
