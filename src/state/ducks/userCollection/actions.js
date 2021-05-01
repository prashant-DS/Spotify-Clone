import axios from 'axios';

import{
    SET_USER_PLAYLIST_COLLECTION,
    SET_USER_SAVED_ALBUMS,
    SET_USER_SAVED_TRACKS,
    SET_USER_FOLLOWING_ARTISTS,
    SET_USER_ISFOLLOWING_STATUS,
    SET_USER_BROWSE_NEWRELEASES,
    SET_USER_BROWSE_FEATUREDPLAYLISTS,
    SET_USER_BROWSE_CATEGORIES,
    SET_USER_BROWSE_RECOMMENDATIONS,
    ADD_SAVEDDATA_PLAYLISTS,
    ADD_SAVEDDATA_ALBUMS,
    ADD_SAVEDDATA_CATEGORIES,
    ADD_SAVEDDATA_ARTISTS,
    ADD_SAVEDDATA_ARTISTS_ALBUMS
} from './types';


export const setUserPlaylistCollection = (playlists,overwrite) =>{
    return{
        type:SET_USER_PLAYLIST_COLLECTION,
        payload:{
            playlists,overwrite
        }
    }
}

export const setUserSavedAlums = (albums,overwrite) =>{
    return{
        type:SET_USER_SAVED_ALBUMS,
        payload:{
            albums,overwrite
        }
    }
}

export const setUserSavedTracks = (data,overwrite) =>{
    return{
        type:SET_USER_SAVED_TRACKS,
        payload:{
            data,overwrite
        }
    }
}

export const setUserFollowingArtists = (artists,overwrite) =>{
    return{
        type:SET_USER_FOLLOWING_ARTISTS,
        payload:{
            artists,overwrite
        }
    }
}

export const setUserIsFollowingStatus = (id,val) =>{
    return{
        type:SET_USER_ISFOLLOWING_STATUS,
        payload:{
            [id]:val,
        }
    }
}

export const setUserBrowseNewReleases = newReleases =>{
    return{
        type:SET_USER_BROWSE_NEWRELEASES,
        payload:{
            newReleases
        }
    }
}

export const setUserBrowseFeaturedPlaylists = featuredPlaylists =>{
    return{
        type:SET_USER_BROWSE_FEATUREDPLAYLISTS,
        payload:{
            featuredPlaylists
        }
    }
}

export const setUserBrowseCategories = categories =>{
    return{
        type:SET_USER_BROWSE_CATEGORIES,
        payload:{
            categories
        }
    }
}

export const setUserBrowseReccomedations = (tracks,overwrite) =>{
    return{
        type:SET_USER_BROWSE_RECOMMENDATIONS,
        payload:{
            tracks,overwrite
        }
    }
}


export const addSaveddataPlaylists = (id,data) =>{
    return{
        type:ADD_SAVEDDATA_PLAYLISTS,
        payload:{
            [id]:data
        }
    }
}

export const addSaveddataAlbums = (id,data) =>{
    return{
        type:ADD_SAVEDDATA_ALBUMS,
        payload:{
            [id]:data
        }
    }
}

export const addSaveddataCategories = (id,data) =>{
    return{
        type:ADD_SAVEDDATA_CATEGORIES,
        payload:{
            categoryId:id,
            categoryData:data,
        }
    }
}

export const addSaveddataArtists = (id,data) =>{
    return{
        type:ADD_SAVEDDATA_ARTISTS,
        payload:{
            artistId:id,
            artistData:data,
        }
    }
}

export const addSaveddataArtistAlbums = (id,data) =>{
    return{
        type:ADD_SAVEDDATA_ARTISTS_ALBUMS,
        payload:{
            artistID:id,
            artistAlbumData:data,
        }
    }
}

//--------------------------------------------------------------


export const fetchUserPlaylistCollection = (accessToken,offset=0,limit=20,overwrite=false) =>{
    return (dispatch)=>{
        return new Promise((resolve,reject)=>{  
            axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,{
                'headers': { 
                    'Authorization': `Bearer ${accessToken}`
                } 
            }).then(res=>{
                // console.log(res);
                if(res.data.items.length > 0){
                    dispatch(setUserPlaylistCollection(res.data.items,overwrite));
                    res.data.items.forEach(val=>dispatch(setUserIsFollowingStatus(val.id,true)))
                    resolve(true)
                }
                else
                    resolve(false);
            }).catch(err=>{
                console.log(err);
            })
        })
    }
}

export const fetchUserSavedAlbums = (accessToken,offset=0,limit=20,overwrite=false) =>{
    return (dispatch)=>{
        return new Promise((resolve,reject)=>{  
            axios.get(`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`,{
                'headers': { 
                    'Authorization': `Bearer ${accessToken}`
                } 
            }).then(res=>{
                // console.log('res',res);
                if(res.data.items.length > 0){
                    dispatch(setUserSavedAlums(res.data.items,overwrite));
                    res.data.items.forEach(val=>dispatch(setUserIsFollowingStatus(val.album.id,true)))
                    resolve(true)
                }
                else
                    resolve(false);
            }).catch(err=>{
                console.log(err);
            })
        })
    }
}

export const fetchUserSavedTracks = (accessToken,offset=0,limit=20,overwrite=false) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('res',res);
            if(res.data.items.length > 0){
                dispatch(setUserSavedTracks(res.data,overwrite));
                res.data.items.forEach(val=>dispatch(setUserIsFollowingStatus(val.track.id,true)))
            }
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchUserFollowingArtists = (accessToken,limit=20,overwrite=false,lastFetchedArtistID=undefined) =>{
    let afterQuery='';
    if(lastFetchedArtistID!==undefined)
        afterQuery=`&after=${lastFetchedArtistID}`;

    return (dispatch)=>{
        return new Promise((resolve,reject)=>{  
            axios.get(`https://api.spotify.com/v1/me/following?type=artist&limit=${limit}${afterQuery}`,{
                'headers': { 
                    'Authorization': `Bearer ${accessToken}`
                } 
            }).then(res=>{
                // console.log(res.data.artists.items);
                if(res.data.artists.items.length > 0){
                    dispatch(setUserFollowingArtists(res.data.artists.items,overwrite));
                    res.data.artists.items.forEach(val=>dispatch(setUserIsFollowingStatus(val.id,true)))
                    resolve(true)
                }
                else
                    resolve(false);
            }).catch(err=>{
                console.log(err);   
            })
        })
    }
}

export const followPlaylist = (accessToken,playlistID)=>{
    return dispatch =>{
        axios(`https://api.spotify.com/v1/playlists/${playlistID}/followers`,{
            method:'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('success',res);
            dispatch(setUserIsFollowingStatus(playlistID,true));
            dispatch(fetchUserPlaylistCollection(accessToken,0,20,true));
        }).catch(err=>{
            // console.log('failure',err);
        })
    }
}

export const unFollowPlaylist = (accessToken,playlistID)=>{
    return dispatch =>{
        axios(`https://api.spotify.com/v1/playlists/${playlistID}/followers`,{
            method:'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('success',res);
            dispatch(setUserIsFollowingStatus(playlistID,false));
            dispatch(fetchUserPlaylistCollection(accessToken,0,20,true));
        }).catch(err=>{
            // console.log('failure',err);
        })
    }
}

export const followAlbum = (accessToken,albumID)=>{
    return dispatch =>{
        axios(`https://api.spotify.com/v1/me/albums?ids=${albumID}`,{
            method:'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('success',res);
            dispatch(setUserIsFollowingStatus(albumID,true));
            dispatch(setUserSavedAlums([],true));
        }).catch(err=>{
            // console.log('failure',err);
        })
    }
}

export const unFollowAlbum = (accessToken,albumID)=>{
    return dispatch =>{
        axios(`https://api.spotify.com/v1/me/albums?ids=${albumID}`,{
            method:'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('success',res);
            dispatch(setUserIsFollowingStatus(albumID,false));
            dispatch(setUserSavedAlums([],true));
        }).catch(err=>{
            // console.log('failure',err);
        })
    }
}

export const followArtist = (accessToken,artistID)=>{
    return dispatch =>{
        axios(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistID}`,{
            method:'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('success',res);
            dispatch(setUserIsFollowingStatus(artistID,true));
            dispatch(setUserFollowingArtists([],true));
        }).catch(err=>{
            // console.log('failure',err);
        })
    }
}

export const unFollowArtist = (accessToken,artistID)=>{
    return dispatch =>{
        axios(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistID}`,{
            method:'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('success',res);
            dispatch(setUserIsFollowingStatus(artistID,false));
            dispatch(setUserFollowingArtists([],true));
        }).catch(err=>{
            // console.log('failure',err);
        })
    }
}

export const fetchUserIsFollowingPlaylist = (accessToken,userId,playlistId) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('check',res.data[0]);
            dispatch(setUserIsFollowingStatus(playlistId,res.data[0]));
        }).catch(err=>{
            console.log(err);   
        })
    }
}

export const fetchUserIsFollowingAlbum = (accessToken,albumId) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/me/albums/contains?ids=${albumId}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('check',res.data[0]);
            dispatch(setUserIsFollowingStatus(albumId,res.data[0]));
        }).catch(err=>{
            console.log(err);   
        })
    }
}

export const fetchUserIsFollowingArtist = (accessToken,artistId) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('check',res.data[0]);
            dispatch(setUserIsFollowingStatus(artistId,res.data[0]));
        }).catch(err=>{
            console.log(err);   
        })
    }
}

export const fetchUserBrowseNewReleases = (country,offset,limit,accessToken) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}&offset=${offset}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log(res);
            if(res.data.albums.items.length!==0)
                dispatch(setUserBrowseNewReleases(res.data.albums.items));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchUserBrowseFeaturedPlaylists = (country,offset,limit,accessToken) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=${limit}&offset=${offset}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log(res);
            if(res.data.playlists.items.length!==0)
                dispatch(setUserBrowseFeaturedPlaylists(res.data.playlists.items));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchUserBrowseCategories = (country,offset,limit,accessToken) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/browse/categories?country=${country}&limit=${limit}&offset=${offset}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log(res);
            if(res.data.categories.items.length!==0)
                dispatch(setUserBrowseCategories(res.data.categories.items));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchUserBrowseRecommendations = (seeds,limit,accessToken,overwrite=false) =>{
    let selectedIndex = new Set();
    while(selectedIndex.size !==Math.min(5,seeds.length))
        selectedIndex.add(Math.floor(Math.random()*seeds.length));
    let seedArtist=[];
    let seedTracks=[];
    selectedIndex.forEach(ind=>{
        if(seeds[ind].type==='artist')
            seedArtist.push(seeds[ind].id);
        else if(seeds[ind].type==='track')
            seedTracks.push(seeds[ind].id);
    })
    let query='';
    if(seedArtist.length===5)
        query=`seed_artists=${seedArtist.join('%2C')}`;
    else if(seedTracks.length===5)
        query=`seed_tracks=${seedTracks.join('%2C')}`;
    else
        query=`seed_artists=${seedArtist.join('%2C')}&seed_tracks=${seedTracks.join('%2C')}`;

    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/recommendations?limit=${limit}&${query}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            console.log(res);
            if(res.data.tracks.length!==0)
                dispatch(setUserBrowseReccomedations(res.data.tracks,overwrite));
        }).catch(err=>{
            console.log(err);
        })
    }
}


export const fetchPlaylist = (playlistID,country,accessToken)=>{
    return (dispatch) =>{
        axios.get(`https://api.spotify.com/v1/playlists/${playlistID}?country=${country}`,{
            'headers':{
                'Authorization' : `Bearer ${accessToken}`
            }
        }).then(res=>{
            dispatch(addSaveddataPlaylists(playlistID,res.data));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchAlbum = (albumID,accessToken) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/albums/${albumID}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log(res);
            dispatch(addSaveddataAlbums(albumID,res.data));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchCategory = (category_id,country,limit,offset,accessToken) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists?country=${country}&limit=${limit}&offset=${offset}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log(res);
            dispatch(addSaveddataCategories(category_id,res.data.playlists.items));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchArtist = (artistID,accessToken) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/artists/${artistID}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            console.log(res);
            dispatch(addSaveddataArtists(artistID,res.data));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchArtistTracks = (artistID,country,accessToken) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=${country}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('tracks',res);
            dispatch(addSaveddataArtists(artistID,res.data));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchArtistRelatedArtists = (artistID,accessToken) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/artists/${artistID}/related-artists`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('tracks',res);
            dispatch(addSaveddataArtists(artistID,res.data));
        }).catch(err=>{
            console.log(err);
        })
    }
}

export const fetchArtistAlbums = (artistID,country,accessToken,offset=0,limit=5) =>{
    return (dispatch)=>{
        axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums?market=${country}&limit=${limit}&offset=${offset}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log('albums',res);
            if(res.data.items.length > 0)
                dispatch(addSaveddataArtistAlbums(artistID,res.data.items));
        }).catch(err=>{
            console.log(err);
        })
    }
}