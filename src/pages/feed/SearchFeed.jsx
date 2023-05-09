import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Videos } from '../../components'
import FeedTitle from '../../components/feed/FeedTitle'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import './SearchFeed.css'

const SearchFeed = () => {
    const [videos, setVideos] = useState([])
    const { query } = useParams()

    useEffect(() => {
        setVideos([])

        fetchFromAPI(`search?part=snippet&q=${query}`).then((data) =>
            setVideos(data.items)
        )
    }, [])

    return (
        <main className="searchFeedContainer">
            <FeedTitle 
                title={'Search Results for:'} 
                caption={query}
               />
            <Videos videos={videos} />
        </main>
    )
}

export default SearchFeed
