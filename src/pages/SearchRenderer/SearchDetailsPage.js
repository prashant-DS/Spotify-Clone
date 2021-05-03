import React,{useEffect,useState} from 'react'
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

    const [showMoreSongsBtn, setShowMoreSongsBtn] = useState(true);
    const [showMorePlaylistBtn, setShowMorePlaylistBtn] = useState(true);
    const [showMoreArtistBtn, setShowMoreArtistBtn] = useState(true);
    const [showMoreAlbumBtn, setShowMoreAlbumBtn] = useState(true);

    useEffect(()=>{
        if(!searchDetailsData){
            dispatch(fetchSearchDetailsData(searchTerm,'track',country,accessToken,10,0))
            dispatch(fetchSearchDetailsData(searchTerm,'playlist',country,accessToken,5,0));
            dispatch(fetchSearchDetailsData(searchTerm,'artist',country,accessToken,5,0));
            dispatch(fetchSearchDetailsData(searchTerm,'album',country,accessToken,5,0));
        }

    },[accessToken, country, searchDetailsData, searchTerm])

    


    return (
        <div className={baseStyle.FullScreenSectionPage}>
            {
                searchDetailsData===undefined ? <img className={baseStyle.loading} src={loadingImg} alt='loading'/> :<>
                {
                    searchDetailsData.track && <>
                        <span className={myStyle.heading}>Songs</span>
                        <Table songs={searchDetailsData.track}/>
                        {
                            showMoreSongsBtn && <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                                event.target.disabled = true;
                                dispatch(fetchSearchDetailsData(searchTerm,'track',country,accessToken,10,searchDetailsData.track.length)).then(res=>{
                                    if(!res)
                                        setShowMoreSongsBtn(res);
                                })
                                setTimeout(()=>{event.target.disabled = false;},1000)
                            }}>Load More songs</button>
                        }
                    </>
                }
                {
                   searchDetailsData.playlist && <>
                        <HomePageSection title='Playlists' items={searchDetailsData.playlist} isTitleALink={false}/>
                        {
                            showMorePlaylistBtn && <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                                event.target.disabled = true;
                                dispatch(fetchSearchDetailsData(searchTerm,'playlist',country,accessToken,10,searchDetailsData.playlist.length)).then(res=>{
                                    if(!res)
                                        setShowMorePlaylistBtn(res);
                                })
                                setTimeout(()=>{event.target.disabled = false;},1000)
                            }} >Load More Playlists</button>
                        }
                    </>
                }
                {
                   searchDetailsData.artist && <>
                        <HomePageSection title='Artists' items={searchDetailsData.artist} isTitleALink={false}/>
                        {
                            showMoreArtistBtn && <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                                event.target.disabled = true;
                                dispatch(fetchSearchDetailsData(searchTerm,'artist',country,accessToken,10,searchDetailsData.artist.length)).then(res=>{
                                    if(!res)
                                        setShowMoreArtistBtn(res);
                                })
                                setTimeout(()=>{event.target.disabled = false;},1000)
                            }} >Load More Artists</button>
                        }
                    </>
                }
                {
                   searchDetailsData.album && <>
                        <HomePageSection title='Albums' items={searchDetailsData.album} isTitleALink={false}/>
                        {
                            showMoreAlbumBtn && <button className={myStyle.loadMoreBtn} onClick={(event)=>{
                                event.target.disabled = true;
                                dispatch(fetchSearchDetailsData(searchTerm,'album',country,accessToken,10,searchDetailsData.album.length)).then(res=>{
                                    if(!res)
                                        setShowMoreAlbumBtn(res);
                                })
                                setTimeout(()=>{event.target.disabled = false;},1000)
                            }} >Load More Albums</button>
                        }
                    </>
                }
                </>
            }
            
        </div>
    )
}

export default SearchDetailsPage
