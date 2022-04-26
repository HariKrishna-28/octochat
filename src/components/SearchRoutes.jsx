import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen'
import Home from './Home'

const SearchRoutes = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="streams" element={<Home />} />
                <Route path="streams/:id" element={<Home />} />
                {/* <Route path="streams/:id/channels/:id" element={<Home />} /> */}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </>
    )
}

export default SearchRoutes