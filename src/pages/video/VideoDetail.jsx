import {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {fetchFromAPI} from '../../utils/fetchFromAPI'
import './VideoDetail.css'
import {
    doc, getFirestore, addDoc,
    collection, setDoc, query, where, getDocs
} from "firebase/firestore";
import CheckIcon from '../../components/checkIcon/CheckIcon'
import {Button, Videos} from '../../components'
import Loader from '../../components/loader/Loader'
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/userSlice'
import {getVideoById} from '../../utils/fetchFromFirebase'
import Translate from '../../components/TranslateModal/Translate'
import Comment from '../../components/Comment/Comment'
import useNode from '../../hooks/useNode'

const VideoDetail = () => {
    const [video, setVideo] = useState(null)
    const [like, setLike] = useState(false)
    const [videos, setVideos] = useState([])
    const [openTranslate, setOpenTranslate] = useState(false)
    const [url, setUrl] = useState(null)
    const {id} = useParams()
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const [commentsData, setCommentsData] = useState({
        id: 1,
        items: []
    });
    const {insertNode, editNode, deleteNode} = useNode();

    const handleInsertNode = (folderId, item) => {
        const finalStructure = insertNode(commentsData, folderId, item);
        setCommentsData(finalStructure);
        updateCommentsFirebase()
    };

    const handleEditNode = (folderId, value) => {
        const finalStructure = editNode(commentsData, folderId, value);
        setCommentsData(finalStructure);
    };

    const handleDeleteNode = (folderId) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = {...finalStructure};
        setCommentsData(temp);
    };

    const loadCommentsFirebase = () => {
        const videoRef = doc(getFirestore(), 'videos', id)
        const q = query(collection(getFirestore(), "comments"), where("videoRef", "==", videoRef));
        getDocs(q).then(querySnapshot => {
            let initialCommentsData = {
                id: 1,
                items: []
            }
            if (querySnapshot.empty) {
                addDoc(collection(getFirestore(), 'comments'), {videoRef: videoRef, commentsData: commentsData});
            }
            Promise.all(querySnapshot.docs.map(async doc => {
                    const data = doc.data()
                    initialCommentsData = data.commentsData
                }
            )).then(res => setCommentsData(initialCommentsData))
        });
    }

    const updateCommentsFirebase = async () => {
        const videoRef = doc(getFirestore(), 'videos', id)
        const q = query(collection(getFirestore(), "comments"), where("videoRef", "==", videoRef));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            setDoc(doc.ref, {...data, commentsData: commentsData})
        });
    }

    useEffect(() => {
        loadCommentsFirebase()
    }, []);

    useEffect(() => {
        if (!user.user) {
            navigate('/')
        }
    }, [user.user])

    useEffect(() => {
        getVideoById(id).then(res => {
            if (res) {
                setVideo(res)
                setUrl(res.url)
            } else {
                fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
                    .then((data) => setVideo(data?.items[0]))
                fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
                    .then((data) => setVideos(data?.items))
            }
        })
    }, [id])

    const onLike = (oldLikes) => {
        setVideo({...video, statistics: {viewCount, likeCount: +oldLikes + (like ? -1 : 1)}})
        setLike(prev => !prev)

        // const videoRef = doc(getFirestore(), 'videos', videoId)
        // const userRef = doc(getFirestore(), 'users', user.user.id)
        // const statistics = {
        //     likedVideos: [videoRef],
        //     time: Date.now(),
        //     userRef
        // }
        // addDoc(collection(getFirestore(), 'statistics'), statistics);
    }

    if (!video) {
        return <Loader/>
    }

    const {
        id: {videoId},
        snippet: {title, channelId, channelTitle},
        statistics: {viewCount, likeCount}
    } = video

    if (videoId != undefined) {
        const videoRef = doc(getFirestore(), 'videos', videoId)
        setDoc(videoRef, {...video, statistics: {viewCount: +viewCount + 1, likeCount}})
    }

    return (
        <main className='videoDetailPageWrapper'>
            <section className='videoDetailContainer'>
                <section className='videoContainer'>
                    <ReactPlayer
                        url={url ? url : `https://www.youtube.com/watch?v=${id}`}
                        className='player'
                        width='100%'
                        height='85%'
                        controls/>
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
                                    <CheckIcon/>
                                </h5>
                            </Link>
                        </section>
                        <Button
                            title='Translate Video'
                            height='30px'
                            margin='20px'
                            onClick={() => setOpenTranslate(true)}
                        />
                        <Translate open={openTranslate}
                                   onModalClose={() => setOpenTranslate(false)}
                                   setNewVideo={(newUrl) => setUrl(newUrl)}
                                   video={video}
                        />
                        <section className='statisticsContainer'>
                            <small style={like ? {color: "#acf9ff"} : null} className='likesCaption'
                                   onClick={() => onLike(likeCount)}>
                                {parseInt(likeCount).toLocaleString()} likes
                            </small>
                            <small className='viewsCaption'>
                                {parseInt(viewCount).toLocaleString()} views
                            </small>
                        </section>
                    </section>
                </section>
                <section className='relatedVideosContainer'>
                    <Videos videos={videos} direction='column'/>
                </section>
            </section>
            <section className="commentsContainer">
                <label className="commentsLabel">Comments</label>
                <Comment
                    handleInsertNode={handleInsertNode}
                    handleEditNode={handleEditNode}
                    handleDeleteNode={handleDeleteNode}
                    comment={commentsData}
                    margin="20px"
                />
            </section>
        </main>
    )
}

export default VideoDetail
