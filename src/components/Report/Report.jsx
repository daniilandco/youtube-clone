import './Report.css'
import React, {useRef} from "react";
import {addDoc, collection, doc, getFirestore} from "firebase/firestore";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import {Button} from "../index";
import Modal from '../Modal/Modal'

const Report = ({open, onModalClose}) => {
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


    if (!open) return null;
    return (
        <Modal open={open} onModalClose={onModalClose}>
            <h1>Report problem</h1>
            <textarea ref={textRef} placeholder="Describe problem" className="report-textarea"/>
            <Button
                title='Report'
                height='30px'
                margin='20px'
                onClick={handleSend}
            />
        </Modal>
    );
};

export default Report;