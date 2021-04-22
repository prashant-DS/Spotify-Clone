import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';

import {userLogin,fetchUserProfile} from '../../state/ducks/authentication';
import {CLIENT_ID,redirect_uri,scopes} from './constants';
import { Redirect } from 'react-router-dom';

import logo from '../../assests/spotifyLogo.svg';
import baseStyle from '../Style.module.scss';


function Login() {

    const dispatch = useDispatch();
    let logged=useSelector(state=>state.authentication.isUserLoggedIn);
    let accessToken =useSelector(state=>state.authentication.token.access_token);

    // const browse = useSelector(state=>state.userCollection.browse);

    // console.log('Login');
    // console.log(browse);


    const getTokenFromUrl = ()=>{
        return window.location.hash.substring(1).split('&').reduce((initial,item)=>{
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        },{})
    }

    useEffect(() => {
        if(window.location.hash==="")
            return;
        let hash=getTokenFromUrl();
        dispatch(userLogin(hash));
    }, [])

    useEffect(() => {
        if(logged){
            dispatch(fetchUserProfile(accessToken));
        }
    }, [logged])


    const authURL=`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes.join('%20')}&show_dialog=false`;

    if(logged){
        return(
            <Redirect to='/home'/>
        )
    }   
    return (
        <div className={baseStyle.login}>
            <img src={logo}  />
            {/* <h1>Spotify</h1> */}
            
            <p><a href={authURL}>Login With Spotify</a></p>
        </div>
    )
}

export default Login
