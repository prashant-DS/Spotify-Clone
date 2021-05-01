import React,{useEffect,useRef} from 'react'
import baseStyle from '../Style.module.scss';
import {useSelector,useDispatch} from 'react-redux';
import { average } from "color.js";

import myStyleForLoadMoreBtn from '../SearchRenderer/Style.module.scss';
import myStyle from './Style.module.scss';
import heartImg from '../../assests/heart.svg';
import Table from '../playlistRenderer/Table';
import {fetchUserSavedTracks,} from '../../state/ducks/userCollection';
import{setHeaderBgcolor} from '../../state/ducks/metadata';



function UserTracks() {

    const dispatch = useDispatch();

    const userName = useSelector(state=>state.authentication.userProfile.display_name);
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const tracks = useSelector(state=>state.userCollection.tracks);

    

    const imageRef = useRef(null);
    const introdivRef = useRef(null);
    const buttondivRef = useRef(null);

    const setbgcolor = async()=>{
        const colArr = await average(imageRef.current);
        const col = `rgb(${colArr[0]},${colArr[1]},${colArr[2]})`;
        dispatch(setHeaderBgcolor(col));
        introdivRef.current.style.backgroundColor = col;
        buttondivRef.current.style.backgroundColor = col;
    }

    useEffect(()=>{
        setbgcolor();
        if(Object.keys(tracks).length===0)
            dispatch(fetchUserSavedTracks(accessToken,0,20,true))
        return(()=>{
            dispatch(setHeaderBgcolor("rgb(18,18,18)"));
        })
    },[])

    return (
        <div className={baseStyle.FullScreenSectionPage}>
            <div className={myStyle.introdiv} ref={introdivRef}>
                <img 
                    src={heartImg} 
                    alt='Liked Songs'
                    ref={imageRef}
                />
                <div>
                    <p className={myStyle.boldextra}>PLAYLIST</p>
                    <h1 className={myStyle.name}>Liked Songs</h1>
                    <p className={myStyle.extra}>
                        <span className={myStyle.boldextra}>{userName}</span>
                        <span className={myStyle.dot}>•</span>
                        { tracks.total && <span>{tracks.total} songs</span>}
                    </p>
                </div>
            </div>
            <div className={myStyle.buttonsdiv} ref={buttondivRef}>
                <button className={myStyle.play}>
                    <svg height="28" role="img" width="28" viewBox="0 0 24 24" aria-hidden="true"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg>
                </button>
            </div>

            { 
                tracks.total && <>
                
                {
                    tracks.total>0 ? <Table songs={tracks.items}/> : <h1>
                        Nothing to Show...
                    </h1>
                }
                {
                    tracks.total!==tracks.items.length && <button className={myStyleForLoadMoreBtn.loadMoreBtn} onClick={(event)=>{
                        event.target.disabled = true;
                        dispatch(fetchUserSavedTracks(accessToken,tracks.items.length,50,false));
                        setTimeout(()=>{event.target.disabled = false;},1000)
                    }}>
                        Load More Tracks
                    </button>
                }
                </>
            }
        </div>
    )
}

export default UserTracks
