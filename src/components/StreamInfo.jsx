import React, { useState } from 'react'
import { Tooltip, Zoom } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StreamStats from './modals/StreamStats';


const StreamInfo = () => {
    const [streamStatsPopup, setStreamStatsPopup] = useState(false)

    return (
        <>
            <div
                onClick={() => setStreamStatsPopup(true)}
                className=' text-discord_channel hover:text-white p-2 cursor-pointer hover:bg-discord_channelHoverBg rounded-md '>
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

            <StreamStats
                open={streamStatsPopup}
                handleClose={() => setStreamStatsPopup(false)}
            />
        </>
    )
}

export default StreamInfo