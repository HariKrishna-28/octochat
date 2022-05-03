import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { selectInnerStreamId, selectStreamId, selectStreamName, setStreamInfo } from '../../features/streamSlice';
import { db, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { selectUserEmail } from '../../features/userSlice';
import firebase from 'firebase/compat/app';
import { setChannelInfo } from '../../features/channelSlice';



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

const StreamDeleteModal = ({ handleClose, open }) => {
    const dispatch = useDispatch()
    const streamName = useSelector(selectStreamName)
    const streamId = useSelector(selectStreamId)
    const innerStreamId = useSelector(selectInnerStreamId)
    const [user] = useAuthState(auth)
    const userEmail = useSelector(selectUserEmail)
    const navigate = useNavigate()

    const cleanSlate = () => {
        dispatch(setStreamInfo({
            streamId: null,
            streamName: null,
            ownerEmail: null,
            innerStreamId: null,
        }))
        dispatch(setChannelInfo({
            channelId: null,
            channelName: null,
        }))
    }

    const deleteStream = () => {
        try {
            db.collection("streams").doc(streamId).delete()
            db.collection("users").doc(userEmail || user?.email).update({
                subscribedStreams: firebase.firestore.FieldValue.arrayRemove(innerStreamId)
            })
            cleanSlate()
            // db.collection("stream-participants").doc(user?.uid).collection("streams").delete()
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
                        Are you sure?
                    </div>
                    <button
                        className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2'
                        onClick={handleClose}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                <div>
                    <div className='text-sm font-light p-2 mb-2 text-center'>
                        Do you want to delete
                        <span className='mx-1 text-discord_purple font-bold'>
                            {streamName}?
                        </span>
                        This action won't be reversed.
                    </div>

                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={deleteStream}
                            style={{ width: "50px" }}
                            className='hover:bg-discord_serverBg p-2 bg-discord_purple text-white rounded hover:rounded-md font-semibold'>
                            Yes
                        </button>

                        <button
                            style={{ width: "50px" }}
                            onClick={handleClose}
                            className='hover:bg-discord_serverBg p-2 bg-discord_deleteBg text-white rounded hover:rounded-md font-semibold'>
                            No
                        </button>

                    </div>
                </div>

            </Box>
        </Modal>
    )
}

export default StreamDeleteModal