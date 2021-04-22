export const getPlaylistsNameAndId = (state)=>{
    return state.userCollection.playlists.map(item=>{
        return{
            name:item.name,
            id:item.id,
        }
    })
}

export const getRecommendationSeed = (userFollowingArtists,userPlaylists,savedPlaylists)=>{
    let userPlaylistIDs = userPlaylists.map(list=>list.id);
    let seedTracks=[];
    let seedArtists=[];

    userFollowingArtists.forEach(artist=>{
        seedArtists.push(artist.id);
    })
    
    userPlaylistIDs.forEach(id=>{
        if(savedPlaylists[id]){
            savedPlaylists[id].tracks.items.forEach(item=>{
                seedTracks.push(item.track.id);
                item.track.artists.forEach(art=>{
                    seedArtists.push(art.id);
                })
            })
        }
    })



    seedArtists=seedArtists.map(id=>{
        return{
            id:id,
            type:'artist'
        }
    })
    seedTracks=seedTracks.map(id=>{
        return{
            id:id,
            type:'track'
        }
    })

    let seeds=[...seedArtists,...seedTracks];
    seeds.sort(()=>Math.random()-Math.random());
    return seeds;

}