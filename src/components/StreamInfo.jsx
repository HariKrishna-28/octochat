import React from 'react'
import { Tooltip, Zoom } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


const StreamInfo = () => {
    return (
        <div className=' text-discord_channel hover:text-white p-2 cursor-pointer hover:bg-discord_channelHoverBg rounded-md '>
            <Tooltip
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 400 }}
                title="Stream Info"
            >
                <InfoIcon
                    className='h-6'
                />
            </Tooltip>
        </div>
    )
}

export default StreamInfo