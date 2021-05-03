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
import useCardSetterWrtWidth from '../customHooks/useCardSetterWrtWidth';
import loadingImg from '../assests/loading.svg';

function HomePage() {

    useCardSetterWrtWidth();

    const dispatch = useDispatch();
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const numberOfCards = useSelector(state=>state.appMetadata.numberOfCards);
    const userFollowingArtists = useSelector(state=>state.userCollection.following.artists);
    const country = useSelector(state=>state.authentication.userProfile.country);
    const userPlaylists = useSelector(state=>state.userCollection.playlists);
    const browse = useSelector(state=>state.userCollection.browse);
    const savedPlaylists = useSelector(state=>state.userCollection.savedData.playlists);
    
    useEffect(() => {
        if(userPlaylists.length===0)
            dispatch(fetchUserPlaylistCollection(accessToken));
    }, [accessToken,userPlaylists])

    useEffect(() => {
        if(userFollowingArtists.length===0)
            dispatch(fetchUserFollowingArtists(accessToken));
    }, [accessToken,userFollowingArtists])

    useEffect(()=>{
        if(numberOfCards>0 && country){
            if(browse.newReleases.length < numberOfCards)
                dispatch(fetchUserBrowseNewReleases(country,browse.newReleases.length,numberOfCards-browse.newReleases.length,accessToken));
            if(browse.featuredPlaylists.length < numberOfCards)
                dispatch(fetchUserBrowseFeaturedPlaylists(country,browse.featuredPlaylists.length,numberOfCards-browse.featuredPlaylists.length,accessToken));
            if(browse.categories.length < numberOfCards)
                dispatch(fetchUserBrowseCategories(country,browse.categories.length,numberOfCards-browse.categories.length,accessToken));
        }
    },[numberOfCards,country,accessToken])

    useEffect(() => {
        if(country){
            userPlaylists.forEach(list=>{
                if(! savedPlaylists[list.id])
                    dispatch(fetchPlaylist(list.id,country,accessToken));
            })
        }
    },[userPlaylists,country])

    useEffect(() => {
        if(numberOfCards>0){
            const recommendationSeeds = getRecommendationSeed(userFollowingArtists,userPlaylists,savedPlaylists);
            if(recommendationSeeds.length>0)
                dispatch(fetchUserBrowseRecommendations(recommendationSeeds,numberOfCards,accessToken,true));
        }
    },[numberOfCards,userFollowingArtists,savedPlaylists,userPlaylists])


    return (
        <div className={Style.homePage}>
            {
                numberOfCards<=0 ? <img className={Style.loading} src={loadingImg} alt='loading'/>  :   <>
                {
                    Object.keys(browse).map(key=>browse[key].length!==0 && <HomePageSection
                        key={key}
                        title={key}
                        items={browse[key].slice(0,numberOfCards)}
                        />)
                    }

                {
                userFollowingArtists.length>0 && <HomePageSection title='bestOfArtists' items={userFollowingArtists.slice(0,numberOfCards)}/>
                }
            </> 

        }
        </div>
    )
}

export default HomePage
