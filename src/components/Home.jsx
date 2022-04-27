import React, { useEffect, useState } from 'react'
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
import firebase from "firebase/compat/app";
import Zoom from '@mui/material/Zoom';
import Chat from './Chat';
import NewStreamModal from './modals/NewStreamModal';
import NewChannelModal from './modals/NewChannelModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectStreamId, selectStreamName, setStreamInfo } from '../features/streamSlice';
import HomeIcon from '@mui/icons-material/Home';
import { setChannelInfo } from '../features/channelSlice';
import { setUserInfo } from '../features/userSlice';


const Home = () => {
    const [user] = useAuthState(auth)
    const [openStreamModal, setOpenStreamModal] = useState(false)
    const [openChannelModal, setOpenChannelModal] = useState(false)
    const streamId = useSelector(selectStreamId)
    const streamName = useSelector(selectStreamName)
    const dispatch = useDispatch()
    const [stream, streamLoad, streamErr] = useCollection(db.collection("streams"))
    const [channels, loading, error] = useCollection(
        streamId &&
        db.collection("streams")
            .doc(streamId)
            .collection("channels")
    )
    const navigate = useNavigate()

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const handleAddChannel = async (channelName) => {
        if (channelName) {
            try {
                await db.collection("streams").doc(streamId).collection("channels").add({
                    channelName: channelName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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

    const cleanSlate = () => {
        dispatch(setStreamInfo({
            streamId: null,
            streamName: null,
            innerStreamId: null,
        }))
        dispatch(setChannelInfo({
            channelId: null,
            channelName: null,
        }))
    }

    useEffect(() => {
        !user && navigate('/')
        dispatch(setUserInfo({
            userName: user.displayName,
            userImage: user.photoURL,
            userEmail: user.email,
            userId: user.uid,
        }))
        // eslint-disable-next-line
    }, [user])


    return (
        <>
            <div className='flex h-screen'>
                {/* Servers */}
                <div className='flex flex-col space-y-3 bg-discord_serversBg p-1 min-w-max'
                >
                    <Link to="/" onClick={cleanSlate}>
                        <Tooltip
                            placement="left"
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Home"
                        >
                            <div className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2 text-center'>
                                <HomeIcon
                                    className='h-6 hover:text-white'
                                />
                            </div>
                        </Tooltip>
                    </Link>
                    <hr className='border-gray-700 border w-8 mx-auto' />
                    {
                        streamLoad ?
                            <div className='flex flex-col justify-center items-center h-screen'>
                                <LoadScreen />
                            </div>
                            :
                            // <ServerIcon />
                            stream?.docs.map((doc) => {
                                return (
                                    <ServerIcon
                                        innerId={doc.data()?.streamId}
                                        image={doc.data()?.streamDisplayImage}
                                        id={doc.id}
                                        key={doc.id}
                                        name={doc.data().streamName}
                                    />
                                )
                            })
                    }


                    <div className='text-center cursor-pointer'>
                        <Tooltip
                            placement="left"
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="New Stream"
                        >
                            <AddIcon
                                onClick={() => setOpenStreamModal(true)}
                                style={{ fontSize: '30' }}
                                className='bg-discord_serverBg rounded-full text-discord_purple hover:rounded-md hover:text-discord_green' />
                        </Tooltip>
                    </div>
                </div>

                {/* Stream */}
                <div className='bg-discord_channelsBg flex flex-col min-w-max'>
                    <h2
                        className='flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-discord_serverNameHoverBg cursor-pointer'>
                        {streamName ?
                            <>
                                {streamName}
                            </>
                            :
                            <div>
                                Choose a stream
                            </div>
                        }
                    </h2>

                    <div className='text-discord_channel flex-grow overflow-y-scroll scrollbar-hide'>
                        <div className='flex items-center p-2 mb-2'>
                            <KeyboardArrowDownIcon
                                className='h-3 mr-2 ' />
                            <h4
                                className='font-semibold'>
                                Channels
                            </h4>
                            {streamName &&
                                <div className='ml-auto  cursor-pointer hover:bg-discord_channelHoverBg rounded-md justify-end'>
                                    <Tooltip
                                        TransitionComponent={Zoom}
                                        TransitionProps={{ timeout: 400 }}
                                        title="New Channel"
                                    >
                                        <AddIcon
                                            className='h-6 hover:text-white'
                                            onClick={() => setOpenChannelModal(true)}
                                        />
                                    </Tooltip>
                                </div>
                            }
                        </div>

                        <div
                            className='flex flex-col space-y-2 px-2 mb-4'>
                            {
                                !streamId ?
                                    <div>
                                        Choose a room
                                    </div>
                                    :
                                    loading ?
                                        <div className='flex flex-col justify-center items-center h-screen'>
                                            <LoadScreen />
                                        </div>
                                        :
                                        channels?.docs.map((doc) => {
                                            return (
                                                <Channel
                                                    key={doc.id}
                                                    id={doc.id}
                                                    channelName={doc.data().channelName}
                                                />
                                            )
                                        })
                            }
                        </div>
                        {
                            (error || streamErr) &&
                            <h1 className='text-2xl font-bold'>
                                Something has gone wrong please try again later
                            </h1>
                        }
                    </div>

                    {/* user stats section */}
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

                <NewStreamModal
                    open={openStreamModal}
                    handleClose={() => setOpenStreamModal(false)}
                />
                {/* Chat */}

                <NewChannelModal
                    handleAddChannel={(channelName) => handleAddChannel(channelName)}
                    open={openChannelModal}
                    handleClose={() => setOpenChannelModal(false)}
                />

                <div className='bg-discord_serverBg flex-grow'>
                    <Chat />
                </div>
            </div>
        </>
    )
}

export default Home