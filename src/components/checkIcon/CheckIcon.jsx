import React from 'react'
import { checkCircleIcon } from '../../utils/consts'
import './CheckIcon.css'

const CheckIcon = () => {
    return <img
        className="checkIcon"
        src={checkCircleIcon}
        alt="checked"
    />
}

export default CheckIcon
