import React from 'react'
import TagIcon from '@mui/icons-material/Tag';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setChannelInfo } from '../features/channelSlice'

const Channel = ({ id, channelName }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const setChannel = () => {
        dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName,
        }))

        navigate(`/channels/${id}`)
    }

    return (
        <div
            onClick={() => setChannel()}
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