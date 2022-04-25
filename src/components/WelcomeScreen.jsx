import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import LoadScreen from './LoadScreen';

const WelcomeScreen = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    const navigator = (path) => {
        navigate(`/${path}`)
    }

    const signIn = async (event) => {
        event.preventDefault()
        await auth.signInWithPopup(provider)
            .then(() => {
                navigator("channels")
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
    //     user && navigator("channels")
    // }, [user])

    return (
        <div className="bg-discord_welcomeBg text-white h-screen">
            <div className="flex items-center justify-between p-2">
                <h1
                    className='font-bold text-xl lg:text-3xl text-center'>
                    Welcome to Octochat
                </h1>

                {!loading &&
                    <div className='flex justify-between gap-5'>
                        <button
                            className='bg-white hover:text-blue-700 font-semibold text-black hover:shadow-md py-2 px-4 b hover:border-transparent rounded'
                            onClick={(event) => !user ? signIn(event) : navigator("channels")}
                        >
                            {user ? "Go to channels" : "Login"}
                        </button>

                        {user &&
                            <button
                                className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
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
                {!user && "Please login to continue"}
            </div>

            <div>
                {error &&
                    <h1>
                        {error}
                    </h1>
                }
            </div>

            <p className='p-4 mt-1 text-center font-semibold'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime commodi voluptatem officiis qui laborum laudantium veniam perspiciatis pariatur nihil, enim harum voluptate amet repellendus dicta illo, ut dolores, excepturi illum.</p>
        </div>
    )
}

export default WelcomeScreen