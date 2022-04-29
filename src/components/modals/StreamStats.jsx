import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
// import moment from 'moment'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
// import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectownerEmail, selectStreamId, selectStreamName } from '../../features/streamSlice';
import LoadScreen from '../LoadScreen';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#202225',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
};

const StreamStats = ({ handleClose, open }) => {
    const [load, setLoad] = useState(false)
    const streamId = useSelector(selectStreamId)
    const streamName = useSelector(selectStreamName)
    const ownerMail = useSelector(selectownerEmail)
    // const [createdAt, setCreatedAt] = useState({})
    const [ownerName, setOwnerName] = useState("")
    const [streamDisplayImage, setStreamDisplayImage] = useState("")
    // const [streamDisplayImage, setStreamDisplayImage] = useState("")
    // const [streamName, loading, error] = useCollection(db.collection("streams").doc(streamId).get())

    useEffect(() => {
        setLoad(true)
        try {
            db.collection("streams").doc(streamId).get()
                .then((res) => {
                    const existFlag = res.exists
                    if (existFlag) {
                        const data = res.data()
                        setOwnerName(data.ownerName)
                        setStreamDisplayImage(data.streamDisplayImage)
                        // setCreatedAt(data.createdAt)
                    }
                })
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }, [streamId])




    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className='text-discord_chatINputText'
                sx={style}
            >
                <div className='flex items-center justify-between p-3'>
                    <div className='text-2xl font-bold'>
                        Stream Data
                    </div>
                    <button
                        className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2'
                        onClick={handleClose}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                {!load ?
                    <div className='flex flex-col gap-1'>
                        <div className='flex justify-center mb-2'>
                            <img
                                draggable="false"
                                src={streamDisplayImage}
                                alt="streamavatar"
                                className='h-20 rounded-full'
                            />
                        </div>
                        <div className='font-semibold text-center'>
                            StreamName : {streamName}
                        </div>
                        <div className='font-semibold text-center'>Owned By : {ownerName}</div>
                        <div className='font-semibold text-center'>Mail : {ownerMail}</div>
                        {/* <div className='font-semibold text-center'>CreatedAt : {moment(createdAt?.toDate().getTime()).format("lll")}</div> */}
                    </div> :
                    <div
                        className='flex flex-col justify-center items-center h-screen'
                    >
                        <LoadScreen />
                    </div>
                }

            </Box>
        </Modal >
    )
}

export default StreamStats