import axios from 'axios';

import{
    SET_HEADER_BGCOLOR,
    SHOW_SEARCH_IN_HEADER,

    SET_SEARCH_DETAILS_DATA,
    SET_NUMBER_OF_CARDS,
} from './types'

export const setHeaderBgcolor = color =>{
    return{
        type:SET_HEADER_BGCOLOR,
        payload:{
            color
        }
    }
}

export const showSearchInHeader = display =>{
    return{
        type:SHOW_SEARCH_IN_HEADER,
        payload:{
            display
        }
    }
}

export const setSearchDetailsData = (searchTerm,type,data) =>{
    return{
        type:SET_SEARCH_DETAILS_DATA,
        payload:{
            searchTerm,type,data
        }
    }
}

export const fetchSearchDetailsData = (searchTerm,type,country,accessToken,limit=5,offset=0) =>{ 
    return (dispatch) => {
        return new Promise((resolve,reject)=>{
            axios.get(`https://api.spotify.com/v1/search?q=${searchTerm.replace(/ /g,"%20")}&type=${type}&country=${country}&limit=${limit}&offset=${offset}`,{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
            }).then(res=>{
                // console.log(res);
                if( Object.values(res.data)[0].items.length!==0){
                    dispatch(setSearchDetailsData(searchTerm,type,Object.values(res.data)[0].items));
                    resolve(true);
                }
                else
                    resolve(false);
            }).catch(err=>{
                console.log(err);
            })
        })
        
    }
}

export const setNumberOfCards = (n) =>{
    return{
        type:SET_NUMBER_OF_CARDS,
        payload:{
            n
        }
    }
}