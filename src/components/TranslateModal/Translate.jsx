import React, {useRef, useState} from "react";
import {addDoc, collection, doc, setDoc, getFirestore} from "firebase/firestore";
import {Button} from "../index";
import Modal from '../Modal/Modal'
import {translateVideo} from '../../utils/translationAPI'
import Loader from "../loader/Loader";
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/userSlice'

const Translate = ({open, onModalClose, setNewVideo, video}) => {
    const [loading, setLoading] = useState(false)
    const langRef = useRef();
    const user = useSelector(selectUser)

    const handleTranslate = async () => {
        setLoading(prev => !prev)
        const newUrl = await getOrLoadTranslatedVideo()

        setNewVideo(newUrl)
        setLoading(prev => !prev)
        onModalClose()
    }

    const getOrLoadTranslatedVideo = async () => {
        const lang = langRef.current.value
        if (video[lang]) {
            return video[lang]
        }

        return video.url

        // const newUrl = await translateVideo(video.url, lang, video.id.videoId, user.user.id)
        // const {
        //     id: {videoId}
        // } = video
        // const videoRef = doc(getFirestore(), 'videos', videoId)
        // setDoc(videoRef, {...video, [lang]: newUrl})
        // return newUrl
    }

    if (loading) {
        return <Loader/>
    }

    if (!open) return null;
    return (
        <Modal open={open} onModalClose={onModalClose}>
            <h1>Choose language translate video into</h1>
            <select ref={langRef}>
                <option value="en" selected>English</option>
                <option value="fr">French</option>
                <option value="esp">Spanish</option>
            </select>
            <Button
                title='Translate'
                height='30px'
                margin='20px'
                onClick={handleTranslate}
            />
        </Modal>
    );
};

export default Translate;