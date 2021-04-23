import {USER_LOGIN,USER_LOGOUT,SET_USER_PROFILE} from './types';

const initialState = {
    isUserLoggedIn:false,
    token:{},
    show_login_dialog:false,
    userProfile:{}
}

const authenticationReducer = (state=initialState,action)=>{
    let oldState={...state};
    switch(action.type){
        case USER_LOGIN:
            oldState.token={...action.payload.token};
            oldState.isUserLoggedIn=true;
            return oldState;
        case USER_LOGOUT:
            return {...initialState,show_login_dialog:true};
        case SET_USER_PROFILE:
            oldState.userProfile={...action.payload.profile};
            return oldState;
        default:
            return oldState;
    }
}

export default authenticationReducer;
;