import { useState, useEffect } from 'react'
import { Videos, SideBar } from '../../components'
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
        <div className="feedContainer">
            <div className="sideBarContainer">
                <SideBar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <p className="copyright">Copyright 2023 DaniilAndCo</p>
            </div>
            <div className="videosContainer">
                <article className="categoryTitleContainer">
                    <h1 className="categoryTitle"> {selectedCategory} </h1>
                    <h2 className="videosCaption"> videos </h2>
                </article>

                <Videos videos={videos} />
            </div>
        </div>
    )
}

export default Feed
