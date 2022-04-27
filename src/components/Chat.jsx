import React, { useEffect, useRef } from 'react'
import TagIcon from '@mui/icons-material/Tag';
import { selectChannelId, selectChannelName } from '../features/channelSlice';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import LogOutButton from './LogOutButton';
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "firebase/compat/app";
import Message from './Message';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import LoadScreen from './LoadScreen';
import { selectStreamId } from '../features/streamSlice';
import StreamInfo from './StreamInfo';
import StreamSettings from './StreamSettings';


const Chat = () => {
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const inputRef = useRef("")
    const chatRef = useRef(null)
    const [user] = useAuthState(auth)
    const streamId = useSelector(selectStreamId)
    // eslint-disable-next-line
    const [messages, loading, error] = useCollection(
        channelId &&
        db
            .collection("streams")
            .doc(channelId)
            .collection("messages")
            .orderBy("timeStamp", "asc")
    );

    // const scrollToBottom = () => {
    //     chatRef.current.scrollIntoView({
    //         behaviour: "smooth",
    //         block: "start",
    //     })
    // }

    const MessageScroll = () => { //scrolls to the bottom of the div tag
        const div = document.getElementById("message-box")
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }

    const sendMessage = (event) => {
        event.preventDefault()
        if (inputRef.current.value === "") return
        try {
            db.collection("streams").doc(channelId).collection("messages").add({
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: inputRef.current.value,
                name: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email,
            })
        } catch (error) {
            console.log(error)
        }

        inputRef.current.value = ""
        MessageScroll()
    }

    const justifyHeader = !channelId ? "justify-end" : "justify-between"

    useEffect(() => {
        MessageScroll()
    }, [messages])

    return (
        <div className='flex flex-col h-screen'>
            <header className={`flex items-center ${justifyHeader} space-x-5 border-b border-gray-800 p-2`}>
                {channelId && <div className='flex items-center space-x-1'>
                    <TagIcon className='h-6 text-discord_chatHeader' />
                    <h4 className='text-white font-semibold'>{channelName}</h4>
                </div>}

                <div className='flex items-center justify-center'>
                    {streamId &&
                        <>
                            <StreamInfo />
                            <StreamSettings />
                        </>
                    }


                    <div className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2'>
                        <a href="https://github.com/HariKrishna-28/octochat" target="_blank" rel="noopener noreferrer">
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Repository">
                                <GitHubIcon />
                            </Tooltip>
                        </a>
                    </div>
                    <div className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2 '>
                        <LogOutButton />
                    </div>
                </div>
            </header>

            <div
                id='message-box'
                className='flex-grow overflow-y-auto scrollbar-hide'>
                {
                    loading &&
                    <div className='flex flex-col items-center justify-center h-screen'>
                        <LoadScreen />
                    </div>
                }
                {!channelId &&
                    <div className='flex flex-col items-center justify-center h-screen -mt-10 text-discord_chatINputText'>
                        <h1 className='text-xl font-bold'>Choose a channel and start chatting</h1>
                    </div>

                }
                {messages?.docs.map((doc) => {
                    return <Message
                        key={doc.id}
                        id={doc.id}
                        email={doc.data().email}
                        message={doc.data().message}
                        timeStamp={doc.data().timeStamp}
                        name={doc.data().name}
                        photoURL={doc.data().photoURL}
                    />
                })}
                <div
                    ref={chatRef}
                    className='pb-16' />
            </div>

            <div className='fllex items-center p-2.5 bg-discord_chatInputBg mx-5 mb-2 rounded-lg'>
                <form
                    className='flex-grow'
                    onSubmit={(e) => sendMessage(e)}>
                    <input
                        type="text"
                        ref={inputRef}
                        disabled={!channelId}
                        placeholder={channelId ? `Message #${channelName}` : "Select a channel"}
                        className='bg-transparent focus:outline-none text-discord_chatINputText w-full placeholder:divide-discord_chatINputText text-sm'
                    />
                </form>
            </div>
        </div>
    )
}

export default Chat