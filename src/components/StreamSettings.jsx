import React, { useState } from 'react'
import { Tooltip, Zoom } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import StreamDeleteModal from './modals/StreamDeleteModal';
import AddPeopleModal from './modals/AddPeopleModal';
import { useSelector } from 'react-redux';
import { selectownerEmail } from '../features/streamSlice';
import { selectUserEmail } from '../features/userSlice';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'

// import { selectUserEmail } from '../features/userSlice';

const StreamSettings = () => {
    const [showPrompt, setShowPrompt] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const ownerEmail = useSelector(selectownerEmail)
    const userEmail = useSelector(selectUserEmail)
    const [user] = useAuthState(auth)


    return (
        <>
            <div className='flex items-center gap-1 justify-center'>
                {(userEmail === ownerEmail || user?.email === ownerEmail) &&
                    <>
                        <div onClick={() => setShowInfo(true)} className='text-discord_channel hover:text-white p-1 cursor-pointer hover:bg-discord_channelHoverBg rounded-md'>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Add people"
                            >
                                <PeopleIcon
                                    className='h-2'
                                />
                            </Tooltip>
                        </div>
                        <div
                            onClick={() => setShowPrompt(true)}
                            className='text-discord_channel hover:text-white p-1 cursor-pointer hover:bg-discord_channelHoverBg rounded-md'>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Delete Stream"
                            >
                                <DeleteIcon
                                    className='h-2 '
                                />

                            </Tooltip>
                        </div>
                    </>
                }

            </div>


            <>
                <StreamDeleteModal
                    open={showPrompt}
                    handleClose={() => setShowPrompt(false)}
                />
                <AddPeopleModal
                    open={showInfo}
                    handleClose={() => setShowInfo(false)}
                />
            </>
        </>
    )
}

export default StreamSettings