import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ReactPlayer from 'react-player'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import './VideoDetail.css'
import { Link } from 'react-router-dom'
import CheckIcon from '../../components/checkIcon/CheckIcon'
import { Videos } from '../../components'
import Loader from '../../components/loader/Loader'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { getVideoById } from '../../utils/fetchFromFirebase'

const VideoDetail = () => {
    const [video, setVideo] = useState(null)
    const [videos, setVideos] = useState([])
    const { id } = useParams()
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.user) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        getVideoById(id).then(res => {
            if (res) {
                res.youtube = false
                setVideo(res)
            } else {
                fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
                    .then((data) => setVideo(data?.items[0]))
                fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
                    .then((data) => setVideos(data?.items))
            }
        })
    }, [id])

    if (!video) {
        return <Loader />
    }

    const {
        snippet: { title, channelId, channelTitle },
        statistics: { viewCount, likeCount } } = video

    return (
        <main className='videoDetailContainer'>
            <section className='videoContainer'>
                <ReactPlayer
                    url={video.url ? video.url : `https://www.youtube.com/watch?v=${id}`}
                    className='player'
                    width='100%'
                    height='70%'
                    controls />
                <section className='descriptionContainer'>
                    <section className='channelVideoTitleContainer'>
                        <h4 className='videoName'>
                            {title}
                        </h4>
                        <Link
                            to={`/channel/${channelId}`}
                            className='videoChannelLink'>
                            <h5>
                                {channelTitle}
                                <CheckIcon />
                            </h5>
                        </Link>
                    </section>
                    <section className='statisticsContainer'>
                        <small className='viewsCaption'>
                            {parseInt(viewCount).toLocaleString()} views
                    </small>
                        <small className='likesCaption'>
                            {parseInt(likeCount).toLocaleString()} likes
                    </small>
                    </section>
                </section>
            </section>
            <section className='relatedVideosContainer'>
                <Videos videos={videos} direction='column' />
            </section>
        </main>
    )
}

export default VideoDetail
