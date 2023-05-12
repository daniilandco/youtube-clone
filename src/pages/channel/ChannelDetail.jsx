import { collection, getDocs, getFirestore, query, where } from '@firebase/firestore'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Videos, ChannelCard } from '../../components'
import Loader from '../../components/loader/Loader'
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

        const usersRef = collection(getFirestore(), 'users')
        let q = query(usersRef, where('id', '==', id))
        getDocs(q).then(snapshot => {
            const user = snapshot[0]?.data()
            if (user) {
                // setVideos(res)
            }
        })

        const currentUser = JSON.parse(localStorage.getItem('user'))
        setChannel({
            snippet: {
                thumbnails: {
                    medium: {
                        url: currentUser.photo
                    }
                },
                title: currentUser.displayName
            },
            statistics: {
                subscriberCount: '0'
            }
        })

        const videosRef = collection(getFirestore(), 'videos')
        q = query(videosRef, where('snippet.channelId', '==', id))
        getDocs(q).then(snapshot => {
            const res = []
            snapshot.forEach((doc) => {
                res.push(doc.data())
            })
            setVideos(res)
        })

        // fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&type=video`).then(
        //     (data) => setVideos(data?.items)
        // )
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
