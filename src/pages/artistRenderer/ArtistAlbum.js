import React,{useEffect,useRef, useState} from 'react'
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import baseStyle from '../Style.module.scss';
import HomePageSection from '../../components/HomePageSection';
import {fetchArtistAlbums} from '../../state/ducks/userCollection';

function ArtistAlbum() {

    const dispatch = useDispatch();
    const {artistID} = useParams();
    const savedartist = useSelector(state=>state.userCollection.savedData.artists);
    const country = useSelector(state=>state.authentication.userProfile.country);
    const accessToken = useSelector(state=>state.authentication.token.access_token);

    let artistDetails=savedartist[artistID];



    const divref = useRef();
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        if(loading)
            setLoading(false);
        checkToLoadMore();
    },[savedartist] )
    const checkToLoadMore = () =>{
        console.log(loading,divref.current.scrollHeight-divref.current.clientHeight-divref.current.scrollTop);
        if(!loading && divref.current.scrollHeight-divref.current.clientHeight-divref.current.scrollTop < 40){
            dispatch(fetchArtistAlbums(artistID,country,accessToken,artistDetails.albums.length,20));
            setLoading(true);
        }
    }

    return (
        <div className={baseStyle.FullScreenSectionPage} onScroll={checkToLoadMore} ref={divref}>
            <HomePageSection title={`Albums of ${artistDetails.name}`} items={artistDetails.albums} isTitleALink={false}/>
        </div>
    )
}

export default ArtistAlbum
