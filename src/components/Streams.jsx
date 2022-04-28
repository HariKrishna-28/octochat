import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import IndividualStreams from './IndividualStreams'

const Streams = ({ data }) => {
    return (
        data.map((element, index) => {
            return (
                <IndividualStreams
                    key={index}
                    id={element} />
            )
        })
    )

}

export default Streams