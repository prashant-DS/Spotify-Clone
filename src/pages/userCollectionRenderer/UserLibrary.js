import React,{useState} from 'react'
import baseStyle from '../Style.module.scss';
import {useSelector} from 'react-redux';

import HomePageSection from '../../components/HomePageSection';
import myStyle from '../SearchRenderer/Style.module.scss';


function UserLibrary() {

    const [showLoadMorePlaylistBtn, setShowLoadMorePlaylistBtn] = useState(true);
    const [shoeLoadMoreArtistBtn, setShoeLoadMoreArtistBtn] = useState(true);
    const [showLoadMoreAlbumBtn, setShowLoadMoreAlbumBtn] = useState(true);

    const playlists = useSelector(state=>state.userCollection.playlists);
    const artists = useSelector(state=>state.userCollection.following.artists);

    return (
        <div className={baseStyle.FullScreenSectionPage}>
            <HomePageSection title='YourSavedPlaylists' items={playlists} isTitleALink={false}/>
            {
                showLoadMorePlaylistBtn && <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                    event.target.disabled = true;
                    setTimeout(()=>{event.target.disabled = false;},1000)
                }}>Load More Playlists</button>
            }

            <HomePageSection title='followingArtists' items={artists} isTitleALink={false}/>
            {
                shoeLoadMoreArtistBtn && <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                    event.target.disabled = true;
                    setTimeout(()=>{event.target.disabled = false;},1000)
                }}>Load More Artists</button>
            }

            <HomePageSection title='yourSavedAlbums' items={playlists} isTitleALink={false}/>
            {
                showLoadMoreAlbumBtn && <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                    event.target.disabled = true;
                    setTimeout(()=>{event.target.disabled = false;},1000)
                }}>Load More Albums</button>
            }
        </div>
        
    )
}

export default UserLibrary

