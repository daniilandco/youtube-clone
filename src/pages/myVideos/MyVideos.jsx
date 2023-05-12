import { useEffect, useState } from "react"
import { Button, UploaderModal, Videos } from "../../components"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import './MyVideos.css'
import Loader from "../../components/loader/Loader"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectUser } from "../../features/userSlice"

const MyVideos = () => {

    const [myVideos, setMyVideos] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.user) {
            navigate('/')
            return
        }
        setLoading(true)
        const citiesRef = collection(getFirestore(), 'videos')
        const q = query(citiesRef, where('snippet.channelId', '==', user.user.id))
        getDocs(q).then(snapshot => {
            const res = []
            snapshot.forEach((doc) => {
                res.push(doc.data())
            })
            setMyVideos(res)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <main>
            <Button
                title='Upload Video'
                height='30px'
                onClick={() => setOpenModal(true)}
            />
            <Videos videos={myVideos} />
            <UploaderModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onVideoUploaded={(video) => setMyVideos(current => [...current, video])}
            />
        </main >
    )

}

export default MyVideos