import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
// import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import { auth } from '../firebase';

const LogOutButton = () => {

    const signOut = async () => {
        await auth.signOut()
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