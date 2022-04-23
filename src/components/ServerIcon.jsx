import React from 'react'

const ServerIcon = ({ image }) => {
    return (
        <img
            src={image}
            alt="server"
            draggable={false}
            className='h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl'
        />
    )
}

export default ServerIcon