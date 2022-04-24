import React from 'react'
import moment from 'moment'

const Message = ({ id, message, timeStamp, name, email, photoURL }) => {
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
        </div>
    )
}

export default Message