import './Report.css'
import React, {useRef} from "react";
import {addDoc, collection, doc, getFirestore} from "firebase/firestore";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import {Button} from "../index";

const Report = ({modalVisible, setModalVisible}) => {
    const textRef = useRef();
    const user = useSelector(selectUser);

    const handleSend = async () => {
        const text = textRef.current.value

        const userRef = doc(getFirestore(), 'users', user.user.id)

        const report = {
            text,
            time: Date.now(),
            userRef
        }

        await addDoc(collection(getFirestore(), 'reports'), report);
        onModalClose()
    }

    const onModalClose = () => {
        setModalVisible(false)
    }


    if (!modalVisible) return null;
    return (
        <main onClick={onModalClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'>
                <p className='closeBtn' onClick={onModalClose}>
                    X
                </p>
                <div className='content'>
                    <h1>Report problem</h1>
                    <textarea ref={textRef} placeholder="Describe problem" className="report-textarea"/>
                    <Button
                        title='Report'
                        height='30px'
                        margin='20px'
                        onClick={handleSend}
                    />
                </div>
            </div>
        </main>
    );
};

export default Report;