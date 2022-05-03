import React from 'react'
import Box from '@mui/material/Box';
// import moment from 'moment'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
// import { useCollection } from 'react-firebase-hooks/firestore';
import { auth } from '../../firebase';
import LoadScreen from '../LoadScreen';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Badge } from '@mui/material';


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

const UserInfoModal = ({ handleClose, open }) => {
    const [user, userLoad] = useAuthState(auth)



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
                        User Info
                    </div>
                    <button
                        className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2'
                        onClick={handleClose}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                {!userLoad ?
                    <div className='flex flex-col gap-1'>
                        <div className='flex justify-center items-center mb-2'>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <div className='bg-green-500 rounded-full p-1.5' />
                                }>
                                <img
                                    draggable="false"
                                    src={user?.photoURL}
                                    alt="streamavatar"
                                    className='h-20 rounded-full'
                                />
                            </Badge>
                            {/* <div className="font-semibold">
                                verified user
                            </div> */}
                        </div>
                        <div className='font-semibold text-center'>
                            UserName : {user?.displayName}
                        </div>
                        <div className='font-semibold text-center'>Email  : {user?.email}</div>
                        <div className='font-semibold text-center'>Account created at : {user?.metadata.creationTime}</div>
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

export default UserInfoModal