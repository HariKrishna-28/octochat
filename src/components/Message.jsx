import React from 'react'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { selectChannelId } from '../features/channelSlice';
import { useSelector } from 'react-redux';
// import { Tooltip } from '@mui/material';
// import Zoom from '@mui/material/Zoom';


const Message = ({ id, message, timeStamp, name, email, photoURL }) => {
    const [user] = useAuthState(auth)
    const channelId = useSelector(selectChannelId)

    return (
        <div className='flex items-center p-1 pl-5 my-5 mr-2 hover:bg-discord_messageBg group'>
            <img
                draggable="false"
                src={photoURL}
                alt="user"
                className='h-10 rounded-full cursor-pointer m-2 hover:shadow-2xl' />

            <div className='flex flex-col'>
                <h4 className='flex items-center space-x-2 font-medium'>
                    <span
                        className='hover:underline text-white text-sm cursor-pointer'>{name}</span>
                    <span
                        className='text-discord_chatHeader text-xs'
                    >{moment(timeStamp?.toDate().getTime()).format("lll")}</span>
                </h4>
                <p className='text-sm text-discord_chatINputText'>
                    {message}
                </p>
            </div>
            {user.email === email && (
                <div
                    onClick={() => {
                        try {
                            db
                                .collection("channels")
                                .doc(channelId)
                                .collection("messages")
                                .doc(id)
                                .delete()
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    }
                    className='hover:bg-discord_deleteBg p-1 ml-auto hidden rounded-sm group-hover:inline cursor-pointer'>
                    {/* <Tooltip
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 400 }}
                        title="Delete"> */}
                    <DeleteIcon className='h-5 cursor-pointer text-discord_deleteBg group-hover:text-white' />
                    {/* </Tooltip> */}
                </div>
            )
            }
        </div >
    )
}

export default Message