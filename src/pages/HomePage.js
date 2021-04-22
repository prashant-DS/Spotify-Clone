import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';

import Style from './Style.module.scss';
import {
    fetchUserPlaylistCollection,
    fetchUserFollowingArtists,
    fetchUserBrowseNewReleases,
    fetchUserBrowseFeaturedPlaylists,
    fetchUserBrowseCategories,
    fetchPlaylist,
    getRecommendationSeed,
    fetchUserBrowseRecommendations
} from '../state/ducks/userCollection';

import HomePageSection from '../components/HomePageSection';

function HomePage() {

    const dispatch = useDispatch();
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const userFollowingArtists = useSelector(state=>state.userCollection.following.artists);
    const country = useSelector(state=>state.authentication.userProfile.country);
    const userPlaylists = useSelector(state=>state.userCollection.playlists);
    const browse = useSelector(state=>state.userCollection.browse);
    const savedPlaylists = useSelector(state=>state.userCollection.savedData.playlists);
    


    useEffect(() => {
        dispatch(fetchUserPlaylistCollection(accessToken,userPlaylists.length));
        let len=userFollowingArtists.length;
        if(len < 5){
            if(len===0)
                dispatch(fetchUserFollowingArtists(accessToken));
            else
                dispatch(fetchUserFollowingArtists(accessToken,userFollowingArtists[len-1].id));
        }
    }, [accessToken])

    useEffect(()=>{
        console.error(country);
        if(country){
            if(browse.newReleases.length < 5)
                dispatch(fetchUserBrowseNewReleases(country,browse.newReleases.length,5,accessToken));
            if(browse.featuredPlaylists.length < 5)
                dispatch(fetchUserBrowseFeaturedPlaylists(country,browse.featuredPlaylists.length,5,accessToken));
            if(browse.categories.length < 5)
                dispatch(fetchUserBrowseCategories(country,browse.categories.length,5,accessToken));
        }
    },[country])

    useEffect(() => {
        if(country){
            userPlaylists.forEach(list=>{
                if(! savedPlaylists[list.id])
                    dispatch(fetchPlaylist(list.id,country,accessToken));
            })
        }
    },[userPlaylists,country])

    useEffect(() => {
            const recommendationSeeds = getRecommendationSeed(userFollowingArtists,userPlaylists,savedPlaylists);
            if(recommendationSeeds.length>0)
                dispatch(fetchUserBrowseRecommendations(recommendationSeeds,5,accessToken,true));
    },[userFollowingArtists,savedPlaylists,userPlaylists])

    return (
        <div className={Style.homePage}>
            {
                Object.keys(browse).map(key=>browse[key].length!==0 && <HomePageSection
                    title={key}
                    items={browse[key].slice(0,5)}
                />)
            }

            <HomePageSection title='bestOfArtists' items={userFollowingArtists.slice(0,5)}/>

        </div>
    )
}

export default HomePage
