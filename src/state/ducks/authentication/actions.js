import axios from 'axios';
import {USER_LOGIN,USER_LOGOUT,SET_USER_PROFILE} from './types';

export const userLogin = (token) => {
    return ({
        type:USER_LOGIN,
        payload:{
            token
        }
    })
}

export const userLogout = () => {
    return ({
        type:USER_LOGOUT
    })
}

export const setUserProfile = (profile) => {
    return ({
        type:SET_USER_PROFILE,
        payload:{
            profile
        }
    })
}

export const fetchUserProfile = (accessToken) => {
    return (dispatch) =>{
        axios.get("https://api.spotify.com/v1/me",{
            'headers': { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }).then(res=>{
            // console.log(res);
            dispatch(setUserProfile(res.data));
        }).catch(err=>{
            console.log(err);
            dispatch(setUserProfile({}));
        })
    }
}