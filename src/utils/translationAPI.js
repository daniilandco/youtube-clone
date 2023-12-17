import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {storage} from "../app/firebase"

const getTranslatedFile = async (url, lang) => {
    // API CALL
}

export const translateVideo = async (url, lang, videoId, userId) => {
    const videoRef = ref(storage, `videos/${userId}/${videoId + lang}`)
    const file = await getTranslatedFile(url, lang)
    await uploadBytes(videoRef, file)
    const translatedUrl = await getDownloadURL(videoRef)
    return translatedUrl
}