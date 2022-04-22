import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'


const PrivateRoutes = () => {
    const [user] = useAuthState()
    const navigate = useNavigate()
    return (
        <div>PrivateRoutes</div>
    )
}

export default PrivateRoutes