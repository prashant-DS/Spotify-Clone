import React from 'react'
import baseStyle from '../Style.module.scss';
import {useSelector} from 'react-redux';

import HomePageSection from '../../components/HomePageSection';


function UserPlayLists() {

    const playlists = useSelector(state=>state.userCollection.playlists);

    return (
        <div className={baseStyle.FullScreenSectionPage}>
            <HomePageSection title='YourSavedPlaylists' items={playlists} isTitleALink={false}/>
        </div>
    )
}

export default UserPlayLists

