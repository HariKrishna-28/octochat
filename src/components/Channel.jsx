import React from 'react'
import TagIcon from '@mui/icons-material/Tag';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setChannelInfo } from '../features/channelSlice'
import { selectChannelId } from '../features/channelSlice';
import { useSelector } from 'react-redux';
// import { selectStreamId } from '../features/streamSlice';

const Channel = ({ id, channelName }) => {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const channelId = useSelector(selectChannelId)
    // const streamId = useSelector(selectStreamId)


    const setChannel = () => {
        dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName,
        }))

        // navigate(`streams/${streamId}/channels/${id}`)
        // console.log(`streams/${streamId}/channels/${id}`)
    }

    return (
        <div
            onClick={() => setChannel()}
            className={id !== channelId ? "font-medium flex items-center cursor-pointer hover:bg-discord_channelHoverBg p-1 rounded-md hover:text-white" : "font-medium flex items-center cursor-pointer bg-discord_channelHoverBg p-1 rounded-md text-white"}>
            <TagIcon
                style={{ fontSize: '18' }}
                className='mr-2'
            />
            {channelName}
        </div>
    )
}

export default Channel