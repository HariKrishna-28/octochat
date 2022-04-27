import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase/compat/app";
import { v4 as uuid } from 'uuid';
import { useCollection } from 'react-firebase-hooks/firestore';

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

const avatarOptions = ["avataaars", "bottts", "identicon", "initials", "adventurer"]

const NewStreamModal = ({ handleClose, open }) => {
    const [streamName, setStreamName] = useState("")
    const [streamId, setStreamId] = useState("")
    const [user] = useAuthState(auth)
    // const [flag, setFlag] = useState(false)
    // const [streams] = useCollection(flag &&
    //     db.collection("streams"))

    const generateId = () => {
        const unique_id = uuid();
        setStreamId(unique_id.slice(0, 10))
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        const id = uuid().slice(0, 10)
        const avatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)]
        if (streamName === "") return
        try {
            const schema = {
                streamName: streamName,
                streamId: id,
                streamDisplayImage: `https://avatars.dicebear.com/api/${avatar}/${streamName}.svg`,
                ownerId: user?.uid,
                ownerEmail: user?.email,
                ownerName: user?.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
            const userSchema = {
                streamData: [id],
            }

            db.collection("streams").add(schema)
            db.collection("users").doc(user?.uid).update({
                subscribedStreams: firebase.firestore.FieldValue.arrayUnion(id)
            })
            handleClose()

        } catch (error) {
            console.log(error)
        }

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
                        New Stream
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
                                autoFocus
                                placeholder='Enter the name of the stream'
                                onChange={(e) => setStreamName(e.target.value)}
                                className='bg-discord_chatInputBg p-3 rounded focus:outline-none text-discord_chatINputText lg:max-w-xl w-full placeholder:divide-discord_chatINputText text-sm'
                            />
                        </div>

                        <div className='text-center'>
                            {streamName !== "" &&
                                <button
                                    className='hover:bg-discord_serverBg bg-discord_purple text-white p-2 rounded hover:rounded-md font-semibold'
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

export default NewStreamModal