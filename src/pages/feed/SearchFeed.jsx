import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Videos } from '../../components'
import FeedTitle from '../../components/feed/FeedTitle'
import Loader from '../../components/loader/Loader'
import { selectUser } from '../../features/userSlice'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import './SearchFeed.css'

const SearchFeed = () => {
    const [videos, setVideos] = useState([])
    const { query } = useParams()
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.user) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        setVideos([])

        fetchFromAPI(`search?part=snippet&q=${query}`).then((data) =>
            setVideos(data.items)
        )
    }, [query])

    if (!videos.length) {
        return <Loader />
    }

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
