import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserEmail } from '../features/userSlice';
import { auth, provider, db } from '../firebase';
import LoadScreen from './LoadScreen';

const WelcomeScreen = () => {
    const [user, loading, error] = useAuthState(auth)
    const [userData] = useCollection(user && db.collection("users"))
    const navigate = useNavigate()
    const userEmail = useSelector(selectUserEmail)
    const [flag, setFlag] = useState(false)
    // const dispatch = useDispatch()

    const navigator = (path) => {
        navigate(`/${path}`)
    }

    // const createUser = () => {
    //     userData?.docs.map((doc) => {
    //         if (doc.id === user?.email || doc.id === userEmail)
    //             setFlag(true)
    //         return
    //     })
    //     !flag && db.collection("users").doc(user?.email || userEmail).set({
    //         subscribedStreams: []
    //     })
    // }

    const signIn = async (event) => {
        event.preventDefault()
        await auth.signInWithPopup(provider)
            .then(() => {
                // createUser()
                navigator("streams")
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const signOut = async (event) => {
        event.preventDefault()
        await auth.signOut()
    }


    // useEffect(() => {
    //     user && userData ?
    //         userData?.docs.map((doc) => {
    //             if (doc.id === user?.email || doc.id === userEmail)
    //                 return
    //         })
    //         :
    //         db.collection("users").doc(user?.email).set({
    //             subscribedStreams: []
    //         })

    // }, [user])

    return (
        <div className="bg-discord_channelsBg text-discord_chatINputText h-screen">
            <div className="flex items-center justify-between p-2">
                <h1
                    className='font-bold text-xl lg:text-3xl text-center'>
                    Octochat
                </h1>
                {!loading &&
                    <div className='hidden lg:flex justify-between gap-5'>
                        <button

                            className='w-36 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'
                            onClick={(event) => !user ? signIn(event) : navigator("streams")}
                        >
                            {user ? "Go to Streams" : "Login"}
                        </button>

                        {user &&
                            <button
                                className='w-36 bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'
                                onClick={(event) => signOut(event)}
                            >
                                Sign Out
                            </button>}
                    </div>
                }

            </div>
            <div className='font-semibold p-5'
            >
                {loading &&
                    <div className='flex flex-col justify-center items-center h-screen'>
                        <LoadScreen />
                    </div>
                }
            </div>

            <div>
                {error &&
                    <h1>
                        {error}
                    </h1>
                }
            </div>

            <div className="flex flex-col gap-7 items-center justify-center mt-10 p-4">
                <h1 className="text-3xl lg:text-5xl font-bold">Your place to talk</h1>
                <h2 className=" text-xl lg:text:lg font-light tracking-wide lg:max-w-3xl w-full">
                    Whether you’re part of a school club, gaming group, worldwide art
                    community, or just a handful of friends that want to spend time
                    together, OctoChat makes it easy to talk every day and hang out more
                    often.
                </h2>
                {!loading &&
                    <div className='flex lg:hidden justify-between gap-5'>
                        <button

                            className='w-36 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'
                            onClick={(event) => !user ? signIn(event) : navigator("streams")}
                        >
                            {user ? "Go to Streams" : "Login"}
                        </button>

                        {user &&
                            <button
                                className='w-36 bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'
                                onClick={(event) => signOut(event)}
                            >
                                Sign Out
                            </button>}
                    </div>
                }
            </div>

        </div>
    )
}

export default WelcomeScreen