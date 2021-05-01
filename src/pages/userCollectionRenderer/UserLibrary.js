import React,{useState,useEffect} from 'react'
import baseStyle from '../Style.module.scss';
import {useSelector,useDispatch} from 'react-redux';

import HomePageSection from '../../components/HomePageSection';
import myStyleForLoadMoreBtn from '../SearchRenderer/Style.module.scss';

import {
    fetchUserPlaylistCollection,
    fetchUserFollowingArtists,
    fetchUserSavedAlbums,
} from '../../state/ducks/userCollection';


function UserLibrary() {
    const dispatch = useDispatch();

    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const playlists = useSelector(state=>state.userCollection.playlists);
    const artists = useSelector(state=>state.userCollection.following.artists);
    const albums = useSelector(state=>state.userCollection.albums);

    useEffect(()=>{
        if(playlists.length===0)
            dispatch(fetchUserPlaylistCollection(accessToken,0,20));
    },[accessToken,playlists])

    useEffect(()=>{
        if(artists.length===0)
            dispatch(fetchUserFollowingArtists(accessToken));
    },[accessToken,artists])

    useEffect(()=>{
        if(albums.length===0)
            dispatch(fetchUserSavedAlbums(accessToken,0,20));
    },[accessToken,albums])

    const [showLoadMorePlaylistBtn, setShowLoadMorePlaylistBtn] = useState(true);
    const [shoeLoadMoreArtistBtn, setShoeLoadMoreArtistBtn] = useState(true);
    const [showLoadMoreAlbumBtn, setShowLoadMoreAlbumBtn] = useState(true);

    

    return (
        <div className={baseStyle.FullScreenSectionPage}>
            {
                playlists.length>0 && <> 
                <HomePageSection title='YourSavedPlaylists' items={playlists} isTitleALink={false}/>
                {
                    showLoadMorePlaylistBtn && <button className={myStyleForLoadMoreBtn.loadMoreBtn} onClick={(event)=>{
                        event.target.disabled = true;
                        dispatch(fetchUserPlaylistCollection(accessToken,playlists.length,20)).then(res=>{
                            if(!res)
                            setShowLoadMorePlaylistBtn(res);
                        })
                        setTimeout(()=>{event.target.disabled = false;},1000)
                    }}>Load More Playlists</button>
                }
                </>
            }

            {
                artists.length>0 && <>
                <HomePageSection title='followingArtists' items={artists} isTitleALink={false}/>
                {
                    shoeLoadMoreArtistBtn && <button className={myStyleForLoadMoreBtn.loadMoreBtn} onClick={(event)=>{
                        event.target.disabled = true;
                        dispatch(fetchUserFollowingArtists(accessToken,20,false,artists[artists.length-1].id)).then(res=>{
                            if(!res)
                            setShoeLoadMoreArtistBtn(res);
                        })
                        setTimeout(()=>{event.target.disabled = false;},1000)
                    }}>Load More Artists</button>
                }
                </>
            }

            {
                albums.length>0 && <>
                <HomePageSection title='yourSavedAlbums' items={albums} isTitleALink={false}/>
                {
                    showLoadMoreAlbumBtn && <button className={myStyleForLoadMoreBtn.loadMoreBtn} onClick={(event)=>{
                        event.target.disabled = true;
                        dispatch(fetchUserSavedAlbums(accessToken,albums.length,20)).then(res=>{
                            if(!res)
                            setShowLoadMoreAlbumBtn(res);
                        })
                        setTimeout(()=>{event.target.disabled = false;},1000)
                    }}>Load More Albums</button>
                }
                </>
            }
        </div>
        
    )
}

export default UserLibrary

