import React from 'react'
import TagIcon from '@mui/icons-material/Tag';

const Channel = ({ id, channelName }) => {
    const setChannel = () => {
        console.log("hi")
    }

    return (
        <div
            onClick={setChannel}
            className='font-medium flex items-center cursor-pointer hover:bg-discord_channelHoverBg p-1 rounded-md hover:text-white'>

            <TagIcon
                style={{ fontSize: '18' }}
                className='mr-2'
            />
            {channelName}
        </div>
    )
}

export default Channel