import React,{useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { useParams,Link } from 'react-router-dom';
import { average } from "color.js";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

 import baseStyle from '../Style.module.scss';
 import Style from './Style.module.scss';
import {
    fetchAlbum,
    fetchUserIsFollowingAlbum,
    followAlbum,
    unFollowAlbum,
} from '../../state/ducks/userCollection';
import Table from './Table';
import loadingImg from '../../assests/loading.svg';
import singerLogo from '../../assests/singer.svg';
import{setHeaderBgcolor} from '../../state/ducks/metadata';

function AlbumPage() {

    const {albumID} = useParams();
    const dispatch = useDispatch();

    const savedalbum = useSelector(state=>state.userCollection.savedData.albums);
    const accessToken = useSelector(state=>state.authentication.token.access_token);

    const followingStatus = useSelector(state=>state.userCollection.following.isFollowing[albumID]);
    useEffect(()=>{
        if(followingStatus===undefined)
            dispatch(fetchUserIsFollowingAlbum(accessToken,albumID));
    },[followingStatus,accessToken,albumID])

    
    let albumDetails=savedalbum[albumID];

    

    useEffect(()=>{
        if(!albumDetails)
            dispatch(fetchAlbum(albumID,accessToken));

        return()=>{
            dispatch(setHeaderBgcolor("rgb(18,18,18)"));
        }

    },[accessToken, albumDetails, albumID, dispatch])

    const imageRef = useRef(null);
    const introdivRef = useRef(null);
    const buttondivRef = useRef(null);

    const setbgcolor = async()=>{
        const colArr = await average(imageRef.current.props.src);
        const col = `rgb(${colArr[0]},${colArr[1]},${colArr[2]})`;
        dispatch(setHeaderBgcolor(col));
        introdivRef.current.style.backgroundColor = col;
        buttondivRef.current.style.backgroundColor = col;
    }

    return(
        <div className={baseStyle.albumPage}>
            {
                albumDetails===undefined ? <img className={baseStyle.loading} src={loadingImg} alt='Loading'/> :<>
                    <div className={Style.introdiv} ref={introdivRef}>
                        <LazyLoadImage 
                            height='90%'
                            src={albumDetails.images[2].url} 
                            alt={albumDetails.name} 
                            ref={imageRef} 
                            afterLoad={setbgcolor}
                            placeholderSrc={singerLogo}
                            effect='blur'
                        />
                        <div>
                            <p className={Style.boldextra}>{albumDetails.album_type}</p>
                            <h1 className={Style.name}>{albumDetails.name}</h1>
                            <p className={Style.extra}>
                                {
                                    albumDetails.artists.slice(0,-1).map(art=><>
                                        <Link to={`/artist/${art.id}`}><span className={Style.boldextra}>{art.name}</span></Link>
                                        <span className={Style.dot}>???</span>
                                    </>)
                                }
                                {
                                    albumDetails.artists.slice(-1).map(art=><Link to={`/artist/${art.id}`}>
                                            <span className={Style.boldextra}>{art.name}</span>
                                        </Link>)
                                }
                                <span className={Style.dot}>???</span>
                                <span>{albumDetails.release_date}</span>
                                <span className={Style.dot}>???</span>
                                <span>{albumDetails.total_tracks} songs</span>
                            </p>
                        </div>

                    </div>
                    <div className={Style.buttonsdiv} ref={buttondivRef}>
                        <button title="Play" className={Style.play}>
                            <svg height="28" role="img" width="28" viewBox="0 0 24 24" aria-hidden="true"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg>
                        </button>
                        {
                            followingStatus?
                            <button title="Remove From Your Library" className={Style.otherbtn} onClick={()=>{
                                dispatch(unFollowAlbum(accessToken,albumID));
                            }}>
                                <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M27.319 5.927a7.445 7.445 0 00-10.02-.462s-.545.469-1.299.469c-.775 0-1.299-.469-1.299-.469a7.445 7.445 0 00-10.02 10.993l9.266 10.848a2.7 2.7 0 004.106 0l9.266-10.848a7.447 7.447 0 000-10.531z" fill="#1db954"></path></svg>
                            </button>
                            :
                            <button title="Add to Your Library" className={Style.otherbtn} onClick={()=>{
                                dispatch(followAlbum(accessToken,albumID));
                            }}>
                                <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z" fill="currentColor"></path></svg>
                            </button>
                        }
                        <button title="More" className={Style.otherbtn}>
                            <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M5.998 13.999A2 2 0 105.999 18 2 2 0 005.998 14zm10.001 0A2 2 0 1016 18 2 2 0 0016 14zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z" fill="currentColor"></path></svg>
                        </button>
                    </div>
                    
                    <Table songs={albumDetails.tracks.items}/>
                </>
            }

        </div>
    )

    
}

export default AlbumPage;
