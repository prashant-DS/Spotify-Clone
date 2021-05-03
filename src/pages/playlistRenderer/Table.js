import React, { useRef,useEffect } from 'react'
import {Link} from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useSelector,useDispatch} from 'react-redux';

import defaultAlbumImage from '../../assests/album.svg';
import Style from './Style.module.scss';

import {
    fetchUserIsFollowingTrack,
    followTrack,
    unFollowTrack,
} from '../../state/ducks/userCollection';


function Table({songs}) {

    const dispatch = useDispatch();
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const followingStatus = useSelector(state=>state.userCollection.following.isFollowing);

    useEffect(()=>{
        let trackIDs = songs.filter(song=>song.track.id!==null && followingStatus[song.track.id]===undefined).map(tr=>tr.track.id);
        while(trackIDs.length)
            dispatch(fetchUserIsFollowingTrack(accessToken,trackIDs.splice(0,50)));
    },[accessToken, songs])


    const headerRef = useRef(null);
    const containerRef=useRef(null);

    const checkHeaderSticky = () =>{
        let limit = (window.screen.height/10)+1;
        headerRef.current.parentElement.classList.toggle(`${Style.sticked}`,headerRef.current.getBoundingClientRect().y <= limit);
        
    }
    // let par=undefined;
    useEffect(() => {
        containerRef.current.parentElement.addEventListener('scroll',checkHeaderSticky);
        const par=containerRef.current.parentElement;
        return () => {
            par.removeEventListener('scroll',checkHeaderSticky);
        }
    }, [containerRef])

    
    
    const pad = num =>{
        let s = num.toString();
        while(s.length < 2)
            s="0"+s;
        return s;
    }


    return (
        <div className={Style.tableContainer} ref={containerRef}>
            <table className={Style.table}>
                <colgroup>
                <col style={{width:"5%"}}/>
                <col style={{width:"41%"}}/>
                <col style={{width:"30%"}}/>
                <col style={{width:"11%"}}/>
                <col style={{width:"5%"}}/>
                <col style={{width:"8%"}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th ref={headerRef}>#</th>
                        <th>Title</th>
                        <th>album</th>
                        <th>Date added</th>
                        <th></th>
                        <th>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor"></path></svg>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        songs.filter(song=>song.track.id!==null).map(song=><tr key={song.track.id}>
                            <td></td>
                            <td>
                                <div className={Style.titlediv}>
                                    <LazyLoadImage 
                                        src={song.track.album.images.length>0 ? song.track.album.images[song.track.album.images.length -1].url : defaultAlbumImage} 
                                        width="40px" 
                                        height="40px"
                                        alt=""
                                        placeholderSrc={defaultAlbumImage}
                                        effect='blur'
                                    />
                                    <div>
                                        <span className={Style.highlighted}>{song.track.name}</span>
                                        <br/>
                                        {
                                            song.track.artists.slice(0,-1).map(art=><React.Fragment key={art.id}>
                                                <Link to={`/artist/${art.id}`}>
                                                    <span>{art.name}</span>
                                                </Link>
                                                <span>{' , '}</span>
                                            </React.Fragment>)
                                        }
                                        <Link to={`/artist/${song.track.artists[song.track.artists.length-1].id}`}>
                                            <span>{song.track.artists[song.track.artists.length-1].name}</span>
                                        </Link>
                                    </div>
                                    
                                </div>
                            </td>
                            <td>
                            {
                                song.track.album.id ? <Link to={`/album/${song.track.album.id}`}><span>{song.track.album.name}</span></Link> : 
                                <span>{song.track.album.name}</span>
                            }
                            </td>
                            <td>{song.added_at.split('T')[0].split('-').reverse().join('-')}</td>
                            <td>
                                {
                                    followingStatus[song.track.id] ? 
                                    <svg role="img" height="16" width="16" viewBox="0 0 16 16" onClick={()=>{
                                        dispatch(unFollowTrack(accessToken,song.track.id));
                                    }}><path fill="none" d="M0 0h16v16H0z"></path><path d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z" fill="#1db954"></path></svg>
                                    :
                                    <svg style={{visibility:'hidden'}} role="img" height="16" width="16" viewBox="0 0 16 16" onClick={()=>{
                                        dispatch(followTrack(accessToken,song.track.id));
                                    }}><path d="M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z" fill="currentColor" fillRule="evenodd"></path></svg>
                                }
                            </td>
                            <td>{`${Math.trunc(Math.ceil(song.track.duration_ms/1000)/60)}:${pad(Math.ceil(song.track.duration_ms/1000)%60)}`}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default React.memo( Table )
