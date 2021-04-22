import React from 'react'
import Header from './Header'
import Player from './Player'
import Sidebar from './Sidebar'

function CommonLayout() {
    return (
        <>
            <Header/>
            <Sidebar/>
            <Player/>   
        </>
    )
}

export default CommonLayout;
