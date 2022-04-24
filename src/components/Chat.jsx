import React, { useRef } from 'react'
import TagIcon from '@mui/icons-material/Tag';
import { selectChannelId, selectChannelName } from '../features/channelSlice';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import LogOutButton from './LogOutButton';
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "firebase/compat/app";
import Message from './Message';

const Chat = () => {
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const inputRef = useRef("")
    const chatRef = useRef(null)
    const [user] = useAuthState(auth)
    // eslint-disable-next-line
    const [messages, loading, error] = useCollection(
        channelId &&
        db
            .collection("channels")
            .doc(channelId)
            .collection("messages")
        // .orderBy("timestamp", "asc")
    );

    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "start",
        })
    }


    const sendMessage = (event) => {
        event.preventDefault()
        if (inputRef.current.value === "") return
        try {
            db.collection("channels").doc(channelId).collection("messages").add({
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
        scrollToBottom()
    }

    return (
        <div className='flex flex-col h-screen'>
            <header className='flex items-center justify-between space-x-5 border-b border-gray-800 p-2'>
                <div className='flex items-center space-x-1'>
                    <TagIcon className='h-6 text-discord_chatHeader' />
                    <h4 className='text-white font-semibold'>{channelName}</h4>
                </div>

                <div className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2'>
                    <LogOutButton />
                </div>
            </header>

            <div className='flex-grow overflow-y-auto scrollbar-hide'>
                {messages?.docs.map((doc) => {
                    return <Message
                        key={doc.id}
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