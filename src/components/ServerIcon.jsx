import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setStreamInfo } from '../features/streamSlice';
import { Tooltip, Zoom } from '@mui/material';
import { setChannelInfo } from '../features/channelSlice';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { selectUserEmail } from '../features/userSlice'
import LoadScreen from './LoadScreen';

const ServerIcon = ({ image, id, name, innerId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user] = useAuthState(auth)
    const [streamData, setStreamData] = useState({})
    const userEmail = useSelector(selectUserEmail)
    // const streamId = useSelector(selectStreamId)
    const [streamSubscriptionData, loading] = useCollection(db.collection("users"))

    const setStream = () => {
        console.log("hi")
        // dispatch(setStreamInfo({
        //     streamId: id,
        //     streamName: name,
        //     innerStreamId: innerId,
        // }))
        // dispatch(setChannelInfo({
        //     channelId: null,
        //     channelName: null,
        // }))
        // navigate(`/streams/${id}`)
    }

    useEffect(() => {
        streamSubscriptionData?.docs.map(doc => {
            if (doc.id === user.email || doc.id === userEmail) {
                setStreamData(doc.data().subscribedStreams)
            }
        })
        console.log(streamData)
    }, [streamSubscriptionData])

    const StreamData = () => {
        streamData.map((doc, index) => {
            return (
                <div
                    key={index}
                    onClick={() => setStream()}>
                    <Tooltip
                        placement="left"
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 400 }}
                        title="check">
                        <h1>{doc.data()}</h1>
                    </Tooltip>
                </div>
            )
        })
    }

    return (
        <div>
            {!loading ?

                // <StreamData /> 
                <h1>hi</h1>
                :
                <div>
                    <LoadScreen />
                </div>
            }

        </div>

    )
}

export default ServerIcon


{/* <img
                    src={image}
                    alt="server"
                    draggable={false}
                    className='h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl'
                /> */}