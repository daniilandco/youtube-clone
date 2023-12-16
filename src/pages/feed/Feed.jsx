import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Videos, SideBar } from '../../components'
import FeedTitle from '../../components/feed/FeedTitle'
import Loader from '../../components/loader/Loader'
import { selectUser } from '../../features/userSlice'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import './Feed.css'

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState('New')
    const [videos, setVideos] = useState([])
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.user) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        setVideos([])

        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
            setVideos(data.items)
        )
    }, [selectedCategory])



    if (!videos.length) {
        return <Loader />
    }

    return (
        <main className="feedContainer">
            <section className="sideBarContainer">
                <SideBar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <p className="copyright">Copyright 2023 DaniilAndCo</p>
            </section>
            <section className="videosContainer">
                <FeedTitle
                    title={selectedCategory}
                    caption={'videos'}
                />
                <Videos videos={videos} />
            </section>
        </main>
    )
}

export default Feed
