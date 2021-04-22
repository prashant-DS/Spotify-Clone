import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';

import loadingImg from '../../assests/loading.svg';
import {showSearchInHeader} from '../../state/ducks/metadata';
import baseStyle from '../Style.module.scss';
import myStyle from './Style.module.scss';
import {fetchSearchDetailsData} from '../../state/ducks/metadata';

import Table from '../albumRenderer/Table';
import HomePageSection from '../../components/HomePageSection';


function SearchDetailsPage() {

    useEffect(() => {
        dispatch(showSearchInHeader(true));
        return () => {
            dispatch(showSearchInHeader(false));
        }
    }, [])

    const {searchTerm} = useParams();
    const dispatch = useDispatch();

    const country = useSelector(state=>state.authentication.userProfile.country);
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const searchDetailsData = useSelector(state=>state.appMetadata.searchDetails[searchTerm]);

    useEffect(()=>{
        if(!searchDetailsData){
            dispatch(fetchSearchDetailsData(searchTerm,'track',country,accessToken,10,0));
            dispatch(fetchSearchDetailsData(searchTerm,'playlist',country,accessToken,5,0));
            dispatch(fetchSearchDetailsData(searchTerm,'artist',country,accessToken,5,0));
            dispatch(fetchSearchDetailsData(searchTerm,'album',country,accessToken,5,0));
        }

    },[accessToken, country, dispatch, searchDetailsData, searchTerm])

    


    return (
        <div className={baseStyle.FullScreenSectionPage}>
            {
                searchDetailsData===undefined ? <img className={baseStyle.loading} src={loadingImg} alt='loading'/> :<>
                {
                    searchDetailsData.track && <>
                        <span className={myStyle.heading}>Songs</span>
                        <Table songs={searchDetailsData.track}/>
                        <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                            event.target.disabled = true;
                            dispatch(fetchSearchDetailsData(searchTerm,'track',country,accessToken,10,searchDetailsData.track.length));
                            setTimeout(()=>{event.target.disabled = false;},1000)
                        }}>Load More songs</button>
                    </>
                }
                {
                   searchDetailsData.playlist && <>
                        <HomePageSection title='Playlists' items={searchDetailsData.playlist} isTitleALink={false}/>
                        <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                            event.target.disabled = true;
                            dispatch(fetchSearchDetailsData(searchTerm,'playlist',country,accessToken,10,searchDetailsData.playlist.length));
                            setTimeout(()=>{event.target.disabled = false;},1000)
                        }} >Load More Playlists</button>
                    </>
                }
                {
                   searchDetailsData.artist && <>
                        <HomePageSection title='Artists' items={searchDetailsData.artist} isTitleALink={false}/>
                        <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                            event.target.disabled = true;
                            dispatch(fetchSearchDetailsData(searchTerm,'artist',country,accessToken,10,searchDetailsData.artist.length));
                            setTimeout(()=>{event.target.disabled = false;},1000)
                        }} >Load More Artists</button>
                    </>
                }
                {
                   searchDetailsData.album && <>
                        <HomePageSection title='Albums' items={searchDetailsData.album} isTitleALink={false}/>
                        <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                            event.target.disabled = true;
                            dispatch(fetchSearchDetailsData(searchTerm,'album',country,accessToken,10,searchDetailsData.album.length));
                            setTimeout(()=>{event.target.disabled = false;},1000)
                        }} >Load More Albums</button>
                    </>
                }
                </>
            }
            
        </div>
    )
}

export default SearchDetailsPage
