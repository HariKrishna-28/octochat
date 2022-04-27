import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'

const Streams = ({ id }) => {
    console.log(id)
    return (
        <div className='text-bold text-white'>Streams</div>
    )
}

export default Streams