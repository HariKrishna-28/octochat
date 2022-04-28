import { Tooltip, Zoom } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setChannelInfo } from '../features/channelSlice';
import { setStreamInfo } from '../features/streamSlice';
import { db } from '../firebase'
import LoadScreen from './LoadScreen';

const IndividualStreams = ({ id }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [streamName] = useCollection(db.collection("streams"))
    const [load, setLoad] = useState(false)
    const [sId, setSId] = useState("")
    const [sName, setSname] = useState("")
    const [innerSid, setInnerSid] = useState("")
    const [ownerEmail, setOwnerEmail] = useState("")
    const [displayImage, setDisplayImage] = useState("")
    const [presentFlag, setPresentFlag] = useState(false)

    const setStream = () => {
        dispatch(setStreamInfo({
            streamId: sId,
            streamName: sName,
            innerStreamId: innerSid,
            ownerEmail: ownerEmail,
        }))
        dispatch(setChannelInfo({
            channelId: null,
            channelName: null,
        }))
        navigate(`/streams/${sId}`)
    }

    useEffect(() => {
        setLoad(true)
        streamName?.docs.map(doc => {
            if (doc.data().streamId === id) {
                const d = doc.data()
                setSId(doc.id)
                setSname(d.streamName)
                setInnerSid(d.streamId)
                setOwnerEmail(d.ownerEmail)
                setDisplayImage(d.streamDisplayImage)
                setPresentFlag(true)
                return
            }
        })
        setLoad(false)
    }, [streamName])


    return (
        <>{
            !load ?
                presentFlag &&
                <div onClick={setStream}>
                    <Tooltip
                        placement='left'
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 400 }}
                        title={sName}
                    >
                        <img
                            src={displayImage}
                            alt="server"
                            draggable={false}
                            className='h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl'
                        />
                    </Tooltip>
                </div>

                :
                <div className='flex flex-col items-center justify-center h-screen'>
                    <LoadScreen />
                </div>
        }</>
    )
}

export default IndividualStreams