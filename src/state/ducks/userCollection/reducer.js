import {
    SET_USER_PLAYLIST_COLLECTION,
    SET_USER_FOLLOWING_ARTISTS,
    SET_USER_BROWSE_NEWRELEASES,
    SET_USER_BROWSE_FEATUREDPLAYLISTS,
    SET_USER_BROWSE_CATEGORIES,
    SET_USER_BROWSE_RECOMMENDATIONS,
    ADD_SAVEDDATA_PLAYLISTS,
    ADD_SAVEDDATA_ALBUMS,
    ADD_SAVEDDATA_CATEGORIES,
    ADD_SAVEDDATA_ARTISTS,
    ADD_SAVEDDATA_ARTISTS_ALBUMS,
} from './types';

const initialState = {
    playlists:[],
    following:{
        artists:[],
    },
    browse:{
        recommendations:[],
        featuredPlaylists:[],
        newReleases:[],
        categories:[],
    },
    savedData:{
        playlists:{},
        albums:{},
        categories:{},
        artists:{},
    }
}

const userCollectionReducer = (state=initialState,action)=>{
    let oldState={...state};
    switch(action.type){
        case SET_USER_PLAYLIST_COLLECTION:
            oldState.playlists=[...oldState.playlists, ...action.payload.playlists];
            return oldState;
        case SET_USER_FOLLOWING_ARTISTS:
            oldState.following={...oldState.following};
            oldState.following.artists=[...oldState.following.artists, ...action.payload.artists];
            return oldState;

        case SET_USER_BROWSE_NEWRELEASES:
            oldState.browse={...oldState.browse};
            oldState.browse.newReleases=[...oldState.browse.newReleases , ...action.payload.newReleases]
            return oldState;
        case SET_USER_BROWSE_FEATUREDPLAYLISTS:
            oldState.browse={...oldState.browse}
            oldState.browse.featuredPlaylists=[...oldState.browse.featuredPlaylists, ...action.payload.featuredPlaylists]
            return oldState;
        case SET_USER_BROWSE_CATEGORIES:
            oldState.browse={...oldState.browse}
            oldState.browse.categories=[...oldState.browse.categories, ...action.payload.categories]
            return oldState;
        case SET_USER_BROWSE_RECOMMENDATIONS:
            oldState.browse={...oldState.browse}
            if(action.payload.overwrite)
                oldState.browse.recommendations=[...action.payload.tracks]
            else
                oldState.browse.recommendations=[...oldState.browse.recommendations, ...action.payload.tracks]
            return oldState;

        case ADD_SAVEDDATA_PLAYLISTS:
            oldState.savedData={...oldState.savedData}
            oldState.savedData.playlists={...oldState.savedData.playlists, ...action.payload}
            return oldState;
        case ADD_SAVEDDATA_ALBUMS:
            oldState.savedData={...oldState.savedData}
            oldState.savedData.albums={...oldState.savedData.albums, ...action.payload} 
            return oldState;
        case ADD_SAVEDDATA_CATEGORIES:
            const {categoryId,categoryData} = action.payload;
            oldState.savedData={...oldState.savedData}
            oldState.savedData.categories={...oldState.savedData.categories}
            if(oldState.savedData.categories[categoryId])
                oldState.savedData.categories[categoryId]=[...oldState.savedData.categories[categoryId],...categoryData]    //append
            else
                oldState.savedData.categories[categoryId]=[...categoryData]    //overwrite
            return oldState;
        case ADD_SAVEDDATA_ARTISTS:
            const {artistId,artistData} = action.payload;
            oldState.savedData={...oldState.savedData}
            oldState.savedData.artists={...oldState.savedData.artists}
            if(oldState.savedData.artists[artistId])
                oldState.savedData.artists[artistId]={...oldState.savedData.artists[artistId],...artistData}    //append
            else
                oldState.savedData.artists[artistId]={...artistData}    //overwrite
            return oldState;
        case ADD_SAVEDDATA_ARTISTS_ALBUMS:
            const {artistID,artistAlbumData} = action.payload;
            oldState.savedData={...oldState.savedData}
            oldState.savedData.artists={...oldState.savedData.artists}
            if(oldState.savedData.artists[artistID].albums)
                oldState.savedData.artists[artistID].albums=[...oldState.savedData.artists[artistID].albums,...artistAlbumData]    //append
            else
                oldState.savedData.artists[artistID].albums=[...artistAlbumData]    //overwrite
            return oldState;
        default:
            return oldState;
    }
}

export default userCollectionReducer;
;