import React, { useState } from 'react'
import { Tooltip, Zoom } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import StreamDeleteModal from './modals/StreamDeleteModal';

const StreamSettings = () => {
    const [showPrompt, setShowPrompt] = useState(false)
    return (
        <>
            <div className='flex items-center gap-1 justify-center'>
                <div className='text-discord_channel hover:text-white p-1 cursor-pointer hover:bg-discord_channelHoverBg rounded-md'>
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
            </div>

            <StreamDeleteModal
                open={showPrompt}
                handleClose={() => setShowPrompt(false)}
            />
        </>
    )
}

export default StreamSettings