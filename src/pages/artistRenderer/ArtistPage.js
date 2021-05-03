import React,{useEffect,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { average } from "color.js";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import loadingImg from '../../assests/loading.svg';
import baseStyle from '../Style.module.scss';
import Style from './Style.module.scss';
import Table from '../albumRenderer/Table';
import HomePageSection from '../../components/HomePageSection';
import{setHeaderBgcolor} from '../../state/ducks/metadata';
import {
    fetchArtist,
    fetchArtistTracks,
    fetchArtistAlbums,
    fetchArtistRelatedArtists,
    fetchUserIsFollowingArtist,
    followArtist,
    unFollowArtist,
} from '../../state/ducks/userCollection';
import singerLogo from '../../assests/singer.svg';
import useCardSetterWrtWidth from '../../customHooks/useCardSetterWrtWidth';


function ArtistPage() {

    useCardSetterWrtWidth();

    const {artistID} = useParams();
    const dispatch = useDispatch();

    const savedartist = useSelector(state=>state.userCollection.savedData.artists);
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const country = useSelector(state=>state.authentication.userProfile.country);
    const numberOfCards = useSelector(state=>state.appMetadata.numberOfCards);
    const followingStatus = useSelector(state=>state.userCollection.following.isFollowing[artistID]);

    useEffect(()=>{
        if(followingStatus===undefined)
            dispatch(fetchUserIsFollowingArtist(accessToken,artistID));
    },[followingStatus,accessToken,artistID])
    
    let artistDetails=savedartist[artistID];

    useEffect(()=>{

        return()=>{
            dispatch(setHeaderBgcolor("rgb(18,18,18)"));
        }

    },[artistID])

    useEffect(()=>{
        if(!artistDetails)
            dispatch(fetchArtist(artistID,accessToken));
        else if(!artistDetails.tracks)
            dispatch(fetchArtistTracks(artistID,country,accessToken));
        else if(!artistDetails.artists)
            dispatch(fetchArtistRelatedArtists(artistID,accessToken));
    },[accessToken, artistDetails, artistID, country])

    useEffect(()=>{
        if(artistDetails && numberOfCards>0){
            if(!artistDetails.albums)
                dispatch(fetchArtistAlbums(artistID,country,accessToken,0,numberOfCards))
            else if(artistDetails.albums.length<numberOfCards)
                dispatch(fetchArtistAlbums(artistID,country,accessToken,artistDetails.albums.length,numberOfCards-artistDetails.albums.length)) 
        }

    },[accessToken, artistDetails, artistID, country, numberOfCards])

    const imageRef = useRef(null);
    const introdivRef = useRef(null);
    const buttondivRef = useRef(null);

    const setbgcolor = async()=>{
    const colArr = await average(imageRef.current.props.src);
    if(colArr)
    {
        const col = `rgb(${colArr[0]},${colArr[1]},${colArr[2]})`;
        dispatch(setHeaderBgcolor(col));
        introdivRef.current.style.backgroundColor = col;
        buttondivRef.current.style.backgroundColor = col;
    }
        
    }

    return(
        <div className={baseStyle.artistPage}>
            {
                artistDetails===undefined ? <img className={baseStyle.loading} src={loadingImg} alt='Loading'/> :<>
                    <div className={Style.introdiv} ref={introdivRef}>
                        <LazyLoadImage 
                            height='90%'
                            src={artistDetails.images.length>0?artistDetails.images[0].url:singerLogo} 
                            alt={artistDetails.name} 
                            ref={imageRef} 
                            afterLoad={setbgcolor}
                            placeholderSrc={singerLogo}
                            effect='blur'
                        />
                        <div>
                            <h1>{artistDetails.name}</h1>
                            <span>{`${artistDetails.followers.total} followers`}</span>
                        </div>
                    </div>
                    <div className={Style.buttonsdiv} ref={buttondivRef}>
                        <button title="Play" className={Style.play}>
                            <svg height="28" role="img" width="28" viewBox="0 0 24 24" aria-hidden="true"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg>
                        </button>
                        {
                            followingStatus?
                            <button title={`Unfollow ${artistDetails.name}`} onClick={()=>dispatch(unFollowArtist(accessToken,artistID))}>
                            Following
                        </button>
                            :
                            <button title={`Follow ${artistDetails.name}`} onClick={()=>dispatch(followArtist(accessToken,artistID))}>
                            Follow 
                        </button>
                        }
                        
                        <button title="More" className={Style.otherbtn}>
                            <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M5.998 13.999A2 2 0 105.999 18 2 2 0 005.998 14zm10.001 0A2 2 0 1016 18 2 2 0 0016 14zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z" fill="currentColor"></path></svg>
                        </button>
                    </div>
                    
                    {
                        artistDetails.tracks && <Table songs={artistDetails.tracks}/>
                    }
                    {
                        artistDetails.albums && artistDetails.albums.length>0 && <HomePageSection title='Albums' items={artistDetails.albums.slice(0,numberOfCards)} isTitleALink={true} titleLinkTo={`/artist/${artistID}/albums`}/>
                    }
                    {
                        artistDetails.artists && artistDetails.artists.length>0 && <HomePageSection title='You May Like' items={artistDetails.artists.slice(0,numberOfCards)} isTitleALink={true} titleLinkTo={`/artist/${artistID}/related-artists`}/>   
                    }

                    
                    
                </>
            }

        </div>
    )
}

export default ArtistPage
