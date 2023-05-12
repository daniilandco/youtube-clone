import { collection, getDocs, getFirestore, query, where } from "@firebase/firestore"

export const getUserVideos = async (id) => {
    const videosRef = collection(getFirestore(), 'videos')
    const q = query(videosRef, where('snippet.channelId', '==', id))
    const snapshot = await getDocs(q)
    const res = []
    snapshot.forEach((doc) => {
        res.push(doc.data())
    })
    return res
}

export const getUserById = async (id) => {
    const usersRef = collection(getFirestore(), 'users')
    const q = query(usersRef, where('id', '==', id))
    const snapshot = await getDocs(q)
    let itemUser
    snapshot.forEach(item => itemUser = item.data())
    return itemUser
}

export const getVideoById = async (id) => {
    const videoRef = collection(getFirestore(), 'videos')
    const q = query(videoRef, where('id.videoId', '==', id))
    const snapshot = await getDocs(q)
    let itemVideo
    snapshot.forEach(item => itemVideo = item.data())
    return itemVideo
}