import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Videos, ChannelCard } from '../../components'
import Loader from '../../components/loader/Loader'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import { getUserById, getUserVideos } from '../../utils/fetchFromFirebase'
import './ChannelDetail.css'

const ChannelDetail = () => {
    const [channel, setChannel] = useState(null)
    const [videos, setVideos] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getUserById(id).then(res => {
            console.log(res)
            if (res) {
                setChannel({
                    id: { channelId: id },
                    snippet: {
                        thumbnails: {
                            medium: {
                                url: res.photo
                            }
                        },
                        title: res.displayName
                    },
                    statistics: {
                        subscriberCount: '0'
                    }
                })
            } else {
                fetchFromAPI(`channels?part=snippet&id=${id}`).then(data =>
                    setChannel(data?.items[0])
                )
            }
        })

        getUserVideos(id).then(res => {
            if (res && res.length) {
                setVideos(res)
            } else {
                fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&type=video`).then(
                    (data) => setVideos(data?.items)
                )
            }
        })
    }, [id])

    if (!channel || !videos.length) {
        return <Loader />
    }

    return (
        <main className="channelDetailContainer">
            <section className='channelHeader'>
                <header className="channelGradient" />
                <ChannelCard channel={channel} marginTop='-110px' />
            </section>
            <section className="channelVideosContainer">
                <Videos videos={videos} />
            </section>
        </main>
    )
}

export default ChannelDetail
