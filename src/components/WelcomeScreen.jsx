import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../features/userSlice';
import { auth, db, provider } from '../firebase';
import LoadScreen from './LoadScreen';

const WelcomeScreen = () => {
    const [user, loading, error] = useAuthState(auth)
    const [userData] = useCollection(user?.uid && db.collection("users").doc(user?.email))
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const navigator = (path) => {
        navigate(`/${path}`)
    }

    const signIn = async (event) => {
        event.preventDefault()
        await auth.signInWithPopup(provider)
            .then(() => {
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


    useEffect(() => {
        userData !== undefined &&
            db.collection("users").doc(user.email).set({
                subscribedStreams: [],
            })
    }, [user])

    return (
        <div className="bg-discord_channelsBg text-discord_chatINputText h-screen">
            <div className="flex items-center justify-between p-2">
                <h1
                    className='font-bold text-xl lg:text-3xl text-center'>
                    Octochat
                </h1>

                {!loading &&
                    <div className='flex justify-between gap-5'>
                        <button
                            className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'
                            onClick={(event) => !user ? signIn(event) : navigator("streams")}
                        >
                            {user ? "Go to Streams" : "Login"}
                        </button>

                        {user &&
                            <button
                                className='bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'
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
            </div>
        </div>
    )
}

export default WelcomeScreen