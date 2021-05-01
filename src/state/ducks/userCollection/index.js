// action creaters
import {
    fetchUserPlaylistCollection,
    fetchUserSavedAlbums,
    fetchUserSavedTracks,
    fetchUserFollowingArtists,
    fetchUserIsFollowingPlaylist,
    fetchUserIsFollowingAlbum,
    fetchUserIsFollowingArtist,
    followPlaylist,
    unFollowPlaylist,
    followAlbum,
    unFollowAlbum,
    followArtist,
    unFollowArtist,

    fetchUserBrowseNewReleases,
    fetchUserBrowseFeaturedPlaylists,
    fetchUserBrowseCategories,
    fetchUserBrowseRecommendations,
    fetchPlaylist,
    fetchAlbum,
    fetchCategory,
    fetchArtist,
    fetchArtistTracks,
    fetchArtistAlbums,
    fetchArtistRelatedArtists,
} from './actions';

// selectors
import {
    getPlaylistsNameAndId,
    getRecommendationSeed,
} from './selectors'


//reducers
import userCollectionReducer from './reducer';


// export
export{
    userCollectionReducer,

    getPlaylistsNameAndId,
    getRecommendationSeed,
    
    fetchUserPlaylistCollection,
    fetchUserSavedAlbums,
    fetchUserSavedTracks,
    fetchUserFollowingArtists,
    fetchUserIsFollowingPlaylist,
    fetchUserIsFollowingAlbum,
    fetchUserIsFollowingArtist,
    followPlaylist,
    unFollowPlaylist,
    followAlbum,
    unFollowAlbum,
    followArtist,
    unFollowArtist,
    fetchUserBrowseNewReleases,
    fetchUserBrowseFeaturedPlaylists,
    fetchUserBrowseCategories,
    fetchUserBrowseRecommendations,
    fetchPlaylist,
    fetchAlbum,
    fetchCategory,
    fetchArtist,
    fetchArtistTracks,
    fetchArtistAlbums,
    fetchArtistRelatedArtists,
}