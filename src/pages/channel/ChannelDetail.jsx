import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Videos, ChannelCard } from '../../components'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import './ChannelDetail.css'

const ChannelDetail = () => {
    const [channel, setChannel] = useState(null)
    const [videos, setVideos] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
            setChannel(data?.items[0])
        )

        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
            (data) => setVideos(data?.items)
        )
    }, [id])

    return (
        <div className="channelDetailContainer">
            <header className='channelHeader'>
                <div className="channelGradient" />
                <ChannelCard channel={channel} marginTop='-110px' />
            </header>
            <div className="channelVideosContainer">
                <Videos videos={videos} />
            </div>
        </div>
    )
}

export default ChannelDetail
