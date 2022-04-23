import React, { useEffect } from 'react'
import ServerIcon from './ServerIcon'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate, Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import LoadScreen from './LoadScreen'
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Channel from './Channel'
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
// import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Chat from './Chat';

const Home = () => {
    const [user] = useAuthState(auth)
    const [channels, loading, error] = useCollection(db.collection("channels"))
    const navigate = useNavigate()

    const handleAddChannel = async () => {
        const channelName = prompt("Enter a channel name")
        if (channelName) {
            try {
                await db.collection("channels").add({
                    channelName: channelName,
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    const signOut = async (event) => {
        event.preventDefault()
        await auth.signOut()
    }

    useEffect(() => {
        !user && navigate('/')
        // eslint-disable-next-line
    }, [user])


    return (
        <>
            <div className='flex h-screen'>
                {/* Servers */}
                <div className='flex flex-col space-y-3 bg-discord_serversBg p-1 min-w-max'>
                    <div className='hover:bg-discord_purple hover:rounded flex justify-center p-2'>
                        <Link to="/">
                            <img draggable="false" src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="check" />
                        </Link>
                    </div>
                    <hr className='border-gray-700 border w-8 mx-auto' />
                    <ServerIcon image="https://mui.com/static/branding/companies/nasa-dark.svg" />
                    <ServerIcon image="https://mui.com/static/branding/companies/nasa-dark.svg" />
                    <ServerIcon image="https://mui.com/static/branding/companies/nasa-dark.svg" />
                    <ServerIcon image="https://mui.com/static/branding/companies/nasa-dark.svg" />

                    <div className='text-center cursor-pointer'>
                        <AddIcon
                            style={{ fontSize: '30' }}
                            className='bg-discord_serverBg rounded-full text-discord_purple hover:rounded-md hover:text-discord_green' />
                    </div>
                </div>

                {/* Rooms */}
                <div className='bg-discord_channelsBg flex flex-col min-w-max'>
                    <h2
                        className='flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-discord_serverNameHoverBg cursor-pointer'>
                        Official server...
                        <KeyboardArrowDownIcon />
                    </h2>
                    <div className='text-discord_channel flex-grow overflow-y-scroll scrollbar-hide'>
                        <div className='flex items-center p-2 mb-2'>
                            <KeyboardArrowDownIcon
                                className='h-3 mr-2 ' />
                            <h4
                                className='font-semibold'>
                                Channels
                            </h4>
                            <div className='ml-auto  cursor-pointer hover:bg-discord_channelHoverBg rounded-md justify-end'>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 400 }}
                                    title="Create a channel"
                                >
                                    <AddIcon
                                        className='h-6 hover:text-white'
                                        onClick={handleAddChannel}
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        <div
                            className='flex flex-col space-y-2 px-2 mb-4'>
                            {
                                loading ?
                                    <div className='flex flex-col justify-center items-center h-screen'>
                                        <LoadScreen />
                                    </div>
                                    :
                                    channels?.docs.map((doc) => {
                                        return (
                                            < Channel
                                                key={doc.id}
                                                id={doc.id}
                                                channelName={doc.data().channelName}
                                            />
                                        )
                                    })
                            }
                        </div>
                        {
                            error &&
                            <h1>
                                {error}
                            </h1>
                        }
                    </div>
                    <div className='bg-discord_userSectionBg p-2 flex justify-between items-center space-x-8'>
                        <div className='flex gap-2 justify-between items-center'>
                            <img src={user?.photoURL} alt="user" className='h-10 rounded-full' draggable="false" />
                            <h4 className='text-white text-xs font-medium'>
                                {user?.displayName}
                                <span className='text-discord_userId block'>
                                    #{user?.uid.substring(user?.uid.length - 5)}
                                </span>
                            </h4>

                            <div className='text-gray-400 flex items-center'>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 400 }}
                                    title="Log-out">
                                    <button
                                        className='hover:bg-discord_channelHoverBg hover:text-white p-2 rounded-md'
                                        onClick={(event) => signOut(event)}>
                                        <LogoutIcon className='h-5 ' />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat */}
                <div className='bg-discord_serverBg flex-grow'>
                    <Chat />
                </div>
            </div>
        </>
    )
}

export default Home