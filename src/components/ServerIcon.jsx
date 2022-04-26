import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { selectStreamId, setStreamInfo } from '../features/streamSlice';
import { Tooltip, Zoom } from '@mui/material';

const ServerIcon = ({ image, id, name }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const streamId = useSelector(selectStreamId)

    const setStream = () => {
        dispatch(setStreamInfo({
            streamId: id,
            streamName: name,
        }))

        navigate(`/streams/${id}`)
    }


    return (
        <div onClick={() => setStream()}>
            <Tooltip
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