import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setStreamInfo } from '../features/streamSlice';
import { Tooltip, Zoom } from '@mui/material';
import { setChannelInfo } from '../features/channelSlice';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ServerIcon = ({ image, id, name, innerId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user] = useAuthState(auth)
    // const streamId = useSelector(selectStreamId)
    const [streamSubscriptionData] = useCollection(db.collection("users").doc(user?.id))

    const setStream = () => {
        dispatch(setStreamInfo({
            streamId: id,
            streamName: name,
            innerStreamId: innerId,
        }))
        dispatch(setChannelInfo({
            channelId: null,
            channelName: null,
        }))
        navigate(`/streams/${id}`)
    }

    return (
        <div
            // className={id === streamId && " bg-discord_serversBg"}
            onClick={() => setStream()}>
            <Tooltip
                placement="left"
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 400 }}
                title={name}>
                <img
                    src={image}
                    alt="server"
                    draggable={false}
                    className='h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl'
                />
            </Tooltip>
        </div>
    )
}

export default ServerIcon