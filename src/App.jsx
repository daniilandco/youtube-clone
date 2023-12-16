import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import { selectUser, setUser } from './features/userSlice'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { SearchFeed, Navbar } from './components'
import { Feed, SignIn, ChannelDetail, VideoDetail, MyVideos } from './pages'
import './Media.css'

const App = () => {
    const dispatch = useDispatch()
    const [isUser, setIsUser] = useState(false)
    const user = useSelector(selectUser)

    useEffect(() => {
        if (user.user) {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    }, [user.user])

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            const user = JSON.parse(savedUser)
            dispatch(setUser(user))
        }
    }, [dispatch])

    return (
        <div className="App">
            <AuthContextProvider>
                <HashRouter>
                    {isUser && <Navbar />}
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
                            element={<SearchFeed />
                            }
                        />
                        <Route
                            path="/my-videos"
                            element={<MyVideos />
                            }
                        />
                    </Routes>
                </HashRouter>
            </AuthContextProvider>
        </div>
    )
}

export default App
