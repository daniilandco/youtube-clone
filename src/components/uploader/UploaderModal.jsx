import {useState} from 'react'
import {storage} from "../../app/firebase"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import useDragAndDrop from '../../hooks/useDragAndDrop'
import './UploaderModal.css'
import Button from '../button/Button'
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'
import {generateVideoThumbnails, generateVideoThumbnailViaUrl} from '@rajesh896/video-thumbnails-generator'
import Loader from '../loader/Loader'
import {selectUser} from '../../features/userSlice'
import {useSelector} from 'react-redux'
import Modal from '../Modal/Modal'

const UploaderModal = ({open, onClose, onVideoUploaded}) => {

    const {
        dragOver,
        setDragOver,
        onDragOver,
        onDragLeave,
        fileDropError,
        setFileDropError
    } = useDragAndDrop()

    const [file, setFile] = useState(null)
    const [videoTitle, setVideoTitle] = useState(null)
    const [uploading, setUploading] = useState(false)
    const user = useSelector(selectUser)

    const onDrop = (e) => {
        e.preventDefault()
        setDragOver(false)

        const selectedFile = e.dataTransfer.files[0]

        setFileDropError('')
        if (!selectedFile?.type.includes('video')) {
            setFileDropError('File must have video format')
            setFile(null)
            return;
        }

        setFile(selectedFile)
    }

    const fileSelect = (e) => {
        e.preventDefault()
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
    }

    const onModalClose = () => {
        setFile(null)
        onClose()
    }

    const onVideoUpload = () => {
        if (!file) return
        setUploading(true)

        const videoId = window.btoa(videoTitle)

        const newVideo = {
            snippet: {
                thumbnails: {
                    medium: {}
                },
                title: videoTitle,
                channelId: user.user.id,
                channelTitle: user.user.displayName
            },
            id: {videoId},
            statistics: {
                viewCount: 0,
                likeCount: 0
            }
        }


        const videoRef = ref(storage, `videos/${user.user.id}/${videoId}`)
        uploadBytes(videoRef, file).then(snapshot => {
            getDownloadURL(videoRef).then(url => {
                newVideo.url = url

                generateVideoThumbnails(file, 1).then(async (thumbnails) => {
                    newVideo.snippet.thumbnails.medium.url = thumbnails[0]

                    const videoRef = doc(getFirestore(), 'videos', videoId)
                    const videoDoc = await getDoc(videoRef)

                    if (!videoDoc.exists()) {
                        await setDoc(videoRef, newVideo)
                    }

                    onVideoUploaded(newVideo)
                    setUploading(false)
                    onModalClose()
                })
            })
        })


    }

    if (uploading) {
        return <Loader/>
    }


    if (!open) return null;
    return (
        <Modal open={open} onModalClose={onModalClose}>
            <section className="uploaderContainer">
                <label
                    htmlFor='file'
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    style={{
                        borderColor: dragOver ? 'yellowgreen' : '',
                        color: dragOver ? 'yellowgreen' : ''
                    }}>
                    {!dragOver && fileDropError ?
                        fileDropError : file ?
                            file.name : !dragOver ?
                                "Select Or Drop your File here..." : "Drop here..."}
                </label>
                <input
                    type="file"
                    accept='video/mp4,video/x-m4v,video/*'
                    id="file"
                    onChange={fileSelect}/>
            </section>
            <section className='videoInfoSection'>
                <label> Video Title: </label>
                <input
                    maxLength='60'
                    onChange={(e) => setVideoTitle(e.target.value)}
                />
            </section>
            <div className='btnContainer'>
                <Button
                    title='Save Video'
                    width='50%'
                    height='70%'
                    margin='10px'
                    onClick={() => onVideoUpload()}/>
                <Button
                    title='Discard'
                    width='50%'
                    height='70%'
                    margin='10px'
                    onClick={() => onModalClose()}/>
            </div>
        </Modal>
    )
};

export default UploaderModal
