import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../../context/AuthContext'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import './SignIn.css'

const Signin = () => {
    const { googleSignIn } = UserAuth()
    const dispatch = useDispatch()

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn()
            const user = result.user

            const userRef = doc(getFirestore(), 'users', user.uid)
            const userDoc = await getDoc(userRef)

            const newUser = {
                displayName: user.displayName,
                email: user.email,
                photo: user.photoURL,
                id: user.uid
            }

            if (!userDoc.exists()) {
                await setDoc(userRef, newUser)
            }

            dispatch(setUser(newUser))
            localStorage.setItem('user', JSON.stringify(newUser))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="buttonContainerWrapper">
            <div className="buttonContainer">
                <div className="logo"></div>
                <GoogleButton className="button" onClick={handleGoogleSignIn} />
            </div>
        </div>
    )
}

export default Signin
