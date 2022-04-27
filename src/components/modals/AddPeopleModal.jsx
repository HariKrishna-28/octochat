import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import firebase from "firebase/compat/app";

import { selectStreamId, selectStreamName, selectInnerStreamId } from '../../features/streamSlice';


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

const AddPeopleModal = ({ handleClose, open }) => {
    // const [channelName, setChannelName] = useState("")
    const [participants, setParticipants] = useState("")
    const streamId = useSelector(selectStreamId)
    const streamName = useSelector(selectStreamName)
    const innerStreamId = useSelector(selectInnerStreamId)

    const handleSubmit = (event) => {
        event.preventDefault()
        const participantsData = participants.split(",")
        participantsData.map((id) => {
            try {
                db.collection("users").doc(id).update({
                    subscribedStreams: firebase.firestore.FieldValue.arrayUnion(innerStreamId)
                })
            } catch (err) {
                console.log(err)
            }
        })
        // db.collection("stream-participants").add({
        //     streamId:streamId,
        //     streamNameL:
        // })
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className='text-discord_chatINputText'
                sx={style}
            >
                <div className='flex items-center justify-between p-3'>
                    <div className='text-2xl font-bold'>
                        Add People
                    </div>
                    <button
                        className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2'
                        onClick={() => handleClose()}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                <div>
                    <div className='p-4 text-md font-light text-center'>
                        Enter the id's of members to add them to
                        <span className='mx-1 text-discord_purple font-bold'>
                            {streamName}
                        </span>
                        separated by commas
                    </div>
                    <form
                        className='h-28'
                        onSubmit={(e) => handleSubmit(e)}>
                        <div className='flex flex-col gap-2 text-center mt-2 mb-2'>
                            <input
                                type="text"
                                autoFocus
                                required
                                placeholder='Participants id separated by commas'
                                onChange={(e) => setParticipants(e.target.value)}
                                className='bg-discord_chatInputBg p-3 rounded focus:outline-none text-discord_chatINputText lg:max-w-xl w-full placeholder:divide-discord_chatINputText text-sm'
                            />

                        </div>

                        <div className='text-center'>
                            {participants !== "" &&
                                <>
                                    <button
                                        className='hover:bg-discord_serverBg bg-discord_purple text-white p-2 rounded hover:rounded-md font-semibold'
                                        type='submit '>
                                        Add participants
                                    </button>
                                    <div className='text-center p-2 font-light text-sm mt-2'>
                                        Please note that a user should at least have one stream
                                    </div>
                                </>
                            }
                        </div>

                    </form>
                </div>

            </Box>
        </Modal>
    )
}

export default AddPeopleModal