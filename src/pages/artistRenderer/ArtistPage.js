import React,{useEffect,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { average } from "color.js";

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
} from '../../state/ducks/userCollection';
import singerLogo from '../../assests/singer.svg';


function ArtistPage() {

    const {artistID} = useParams();
    const dispatch = useDispatch();

    const savedartist = useSelector(state=>state.userCollection.savedData.artists);
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const country = useSelector(state=>state.authentication.userProfile.country);
    
    let artistDetails=savedartist[artistID];

    useEffect(()=>{

        return()=>{
            dispatch(setHeaderBgcolor("rgb(18,18,18)"));
        }

    },[artistID, dispatch])

    useEffect(()=>{
        if(!artistDetails)
            dispatch(fetchArtist(artistID,accessToken));
        else if(!artistDetails.tracks)
            dispatch(fetchArtistTracks(artistID,country,accessToken));
        else if(!artistDetails.albums)
            dispatch(fetchArtistAlbums(artistID,country,accessToken,0,5))
        else if(!artistDetails.artists)
            dispatch(fetchArtistRelatedArtists(artistID,accessToken));

    },[accessToken, artistDetails, artistID, country, dispatch, savedartist])

    const imageRef = useRef(null);
    const introdivRef = useRef(null);
    const buttondivRef = useRef(null);

    const setbgcolor = async()=>{
        const colArr = await average(imageRef.current);
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
                        <img src={artistDetails.images.length>0?artistDetails.images[0].url:singerLogo} alt={artistDetails.name} ref={imageRef} onLoad={setbgcolor} crossorigin="anonymous"/>
                        <div>
                            <h1>{artistDetails.name}</h1>
                            <span>{`${artistDetails.followers.total} followers`}</span>
                        </div>
                    </div>
                    <div className={Style.buttonsdiv} ref={buttondivRef}>
                        <button title="Play" className={Style.play}>
                            <svg height="28" role="img" width="28" viewBox="0 0 24 24" aria-hidden="true"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg>
                        </button>
                        <button title={`Follow ${artistDetails.name}`}>
                            Follow 
                        </button>
                        <button title="More" className={Style.otherbtn}>
                            <svg role="img" height="32" width="32" viewBox="0 0 32 32"><path d="M5.998 13.999A2 2 0 105.999 18 2 2 0 005.998 14zm10.001 0A2 2 0 1016 18 2 2 0 0016 14zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z" fill="currentColor"></path></svg>
                        </button>
                    </div>
                    
                    {
                        artistDetails.tracks && <Table songs={artistDetails.tracks}/>
                    }
                    {
                        artistDetails.albums && artistDetails.albums.length>0 && <HomePageSection title='Albums' items={artistDetails.albums.slice(0,5)} isTitleALink={true} titleLinkTo={`/artist/${artistID}/albums`}/>
                    }
                    {
                        artistDetails.artists && artistDetails.artists.length>0 && <HomePageSection title='You May Like' items={artistDetails.artists.slice(0,5)} isTitleALink={true} titleLinkTo={`/artist/${artistID}/related-artists`}/>   
                    }

                    
                    
                </>
            }

        </div>
    )
}

export default ArtistPage
