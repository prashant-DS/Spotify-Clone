import React,{useEffect,useRef, useState} from 'react'
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import Style from './Style.module.scss';
import {
    fetchUserFollowingArtists,
    fetchUserBrowseNewReleases,
    fetchUserBrowseFeaturedPlaylists,
    fetchUserBrowseCategories,
    getRecommendationSeed,
    fetchUserBrowseRecommendations
} from '../state/ducks/userCollection';
import HomePageSection from '../components/HomePageSection';


function FullScreenSectionPage() {

    const {section} = useParams();

    const dispatch = useDispatch();
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const userFollowingArtists = useSelector(state=>state.userCollection.following.artists);
    const country = useSelector(state=>state.authentication.userProfile.country);
    const userPlaylists = useSelector(state=>state.userCollection.playlists);
    const browse = useSelector(state=>state.userCollection.browse);
    const savedPlaylists = useSelector(state=>state.userCollection.savedData.playlists);

    let recommendationSeeds=[];

    const loadMoreFollowingArtists = () => {
        let len=userFollowingArtists.length;
        if(len < 5){
            if(len===0)
                dispatch(fetchUserFollowingArtists(accessToken));
            else
                dispatch(fetchUserFollowingArtists(accessToken,userFollowingArtists[len-1].id,20));
        }
    }

    const loadMoreNewReleases = () =>{
        if(country){
            dispatch(fetchUserBrowseNewReleases(country,browse.newReleases.length,20,accessToken));
        }
    }

    const loadMoreFeaturedPlaylists = () =>{
        if(country){
            dispatch(fetchUserBrowseFeaturedPlaylists(country,browse.featuredPlaylists.length,20,accessToken));
        }
    }
    
    const loadMoreCategories = () =>{
        if(country){
            dispatch(fetchUserBrowseCategories(country,browse.categories.length,20,accessToken));
        }
    }

    const loadMoreRecommendations = () =>{
        if(recommendationSeeds.length>0){
            dispatch(fetchUserBrowseRecommendations(recommendationSeeds,20,accessToken));
        }
    }

    let targetArray = undefined;
    let loadMore = undefined;
    switch (section){
        case "recommendations":
            recommendationSeeds = getRecommendationSeed(userFollowingArtists,userPlaylists,savedPlaylists);
            targetArray = browse.recommendations;
            loadMore = loadMoreRecommendations;
            break;
        case "featuredPlaylists":
            targetArray = browse.featuredPlaylists;
            loadMore = loadMoreFeaturedPlaylists;
            break;
        case "newReleases":
            targetArray = browse.newReleases;
            loadMore = loadMoreNewReleases;
            break;
        case "categories":
            targetArray = browse.categories;
            loadMore = loadMoreCategories;
            break;
        case "bestOfArtists":
            targetArray = userFollowingArtists;
            loadMore = loadMoreFollowingArtists;
            break;
        default:
            break;
    }

    const divref = useRef();
    const [loading,setLoading] = useState(false);
    const checkToLoadMore = () =>{
        if(!loading && divref.current.scrollHeight-divref.current.clientHeight-divref.current.scrollTop < 30){
            loadMore();
            setLoading(true);
        }
    }
    useEffect(()=>{
        setLoading(false);
        checkToLoadMore();
    },[targetArray])

    return (
        <div className={Style.FullScreenSectionPage} onScroll={checkToLoadMore} ref={divref}>
            <HomePageSection title={section} isTitleALink={false} items={targetArray}/>
        </div>
    )
}

export default FullScreenSectionPage
