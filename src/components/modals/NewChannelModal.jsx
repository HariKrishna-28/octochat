import React, { useState } from 'react'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase/compat/app";
import { useCollection } from 'react-firebase-hooks/firestore';
import { v4 as uuid } from 'uuid';

// import { FormControl, Switch, FormControlLabel } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#202225',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
};

const NewChannelModal = ({ handleClose, open, handleAddChannel }) => {
    const [channelName, setChannelName] = useState("")
    // const [imageUrl, setImageUrl] = useState("")
    // const [user] = useAuthState(auth)
    // const [streamData, loading, error] = useCollection(db.collection("stream"))
    // const [customImageFlag, setCustomImageFlag] = useState(false)

    // const generateId = () => {
    //     const unique_id = uuid();
    //     return unique_id.slice(0, 10)
    // }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleAddChannel(channelName)
        handleClose()
    }

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
                        New Channel
                    </div>
                    <button
                        className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2'
                        onClick={handleClose}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                <div>
                    <form
                        className='h-28'
                        onSubmit={(e) => handleSubmit(e)}>
                        <div className='flex flex-col gap-2 text-center mt-2 mb-2'>
                            <input
                                type="text"
                                required
                                placeholder='Enter the name of the channel'
                                onChange={(e) => setChannelName(e.target.value)}
                                className='bg-discord_chatInputBg p-3 rounded focus:outline-none text-discord_chatINputText lg:max-w-xl w-full placeholder:divide-discord_chatINputText text-sm'
                            />

                        </div>

                        <div className='text-center'>
                            {channelName !== "" &&
                                <button
                                    className='bg-discord_serverBg hover:bg-discord_purple text-white p-2 rounded hover:rounded-md font-semibold'
                                    type='submit '>
                                    submit
                                </button>}
                        </div>

                    </form>
                </div>

            </Box>
        </Modal>
    )
}

export default NewChannelModal