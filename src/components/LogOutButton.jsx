import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
// import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../features/userSlice';

const LogOutButton = () => {
    const dispatch = useDispatch()

    const signOut = async () => {
        dispatch(setUserInfo({
            userName: null,
            userImage: null,
            userEmail: null,
            userId: null,
        }))
        await auth.signOut()
        dispatch('/')
    }

    return (
        <>
            <Tooltip
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 400 }}
                title="Log-out">
                <button
                    // className='p'
                    onClick={signOut}>
                    <LogoutIcon className='h-3' />
                </button>
            </Tooltip>
        </>
    )
}

export default LogOutButton