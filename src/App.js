import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
    HomePage, 
    Login,
    FullScreenSectionPage,
    PlaylistPage,
    AlbumPage,
    CategoryRenderer,
    ArtistPage,
    ArtistAlbum,
    ArtistRelatedArtists,
    SearchDefaultPage,
    SearchDetailsPage,
    UserLibrary,
    UserTracks,
} from './pages';
import CommonLayout from './common_layout';

import style from './App.module.scss';
import { useSelector } from 'react-redux';


function App() {
    const userLoggedIn = useSelector(state=>state.authentication.isUserLoggedIn);
    if(!userLoggedIn){
        return <Login/>
    }
    return (
        <div className={style.mainContainer}>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact>
                    <Login/>  
                </Route>
                <Route path='/home'>
                    <CommonLayout/>   
                    <HomePage key="homepage"/>
                </Route>
                <Route path='/browse/:section'>
                    <CommonLayout/>
                    <FullScreenSectionPage/>
                </Route>

                <Route path='/search' exact>
                    <CommonLayout/>     
                    <SearchDefaultPage/>   
                </Route>
                <Route path='/search/:searchTerm'>
                    <CommonLayout/>  
                    <SearchDetailsPage/>      
                </Route>

                <Route path='/collection/library'>
                    <CommonLayout/> 
                    <UserLibrary/>
                </Route>
                <Route path='/collection/tracks'>
                    <CommonLayout/>  
                    <UserTracks/>      
                </Route>

                <Route path='/playlist/:playlistID'>
                    <CommonLayout/>    
                    <PlaylistPage/>    
                </Route>
                <Route path='/album/:albumID'>
                    <CommonLayout/>
                    <AlbumPage/>        
                </Route>
                <Route path='/categories/:categoryID'>
                    <CommonLayout/>  
                    <CategoryRenderer/>      
                </Route>
                <Route path='/artist/:artistID' exact>
                    <CommonLayout/>    
                    <ArtistPage/>    
                </Route>
                <Route path='/artist/:artistID/albums' exact>
                    <CommonLayout/>    
                    <ArtistAlbum/>    
                </Route>
                <Route path='/artist/:artistID/related-artists' exact>
                    <CommonLayout/>    
                    <ArtistRelatedArtists/>    
                </Route>
            </Switch>
      </BrowserRouter>
        </div>
    )
}

export default App
