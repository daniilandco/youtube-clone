import { useState, useEffect } from 'react'
import { Videos, SideBar } from '../../components'
import FeedTitle from '../../components/feed/FeedTitle'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import './Feed.css'

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState('New')
    const [videos, setVideos] = useState([])

    useEffect(() => {
        setVideos([])

        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
            setVideos(data.items)
        )
    }, [selectedCategory])

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
