import React, { useEffect,useState,useRef } from 'react'
import Style from './Style.module.scss'; 
import {useSelector,useDispatch} from 'react-redux';
import{useHistory} from 'react-router-dom';

import useDebounce from '../customHooks/useDebounce';
import {userLogout} from '../state/ducks//authentication';


function Header() {

    const dispatch = useDispatch();
    const bgColor = useSelector(state=>state.appMetadata.headerBgColor);
    const userName = useSelector(state=>state.authentication.userProfile.display_name);
    const showSearch = useSelector(state=>state.appMetadata.showSearchInHeader);
    const history = useHistory();

    const [debouncedSearchTerm,setDebouncedSearchTerm] = useDebounce('',700);
    useEffect(()=>{
        if(showSearch)
        history.push(`/search/${debouncedSearchTerm}`);
    },[debouncedSearchTerm, history, showSearch])

    const arrowSpanRef = useRef(null);
    const optionsDivRef = useRef(null);
    const [accountClicked, setAccountClicked] = useState(false);

    useEffect(()=>{
        if(accountClicked){
            arrowSpanRef.current.innerText = '▴';
            optionsDivRef.current.style.display='block';
        }
        else{

            arrowSpanRef.current.innerText = '▾';
            optionsDivRef.current.style.display='none';
        }

    },[accountClicked])


    return (
        <div className={[Style.header,"MainHeader"].join(' ')} style={{backgroundColor:bgColor}}>
            
            <div className={Style.historyButtons}>
                <button title="Go back" onClick={()=>history.goBack()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fillRule="evenodd" fill="currentcolor" clipRule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg>
                </button>
                <button title="Go forward" onClick={()=>history.goForward()}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fillRule="evenodd" fill="currentcolor" clipRule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
                </button>
                <div className={Style.searchInput} style={{display:showSearch?'inline-flex':'none'}}>
                    <span>
                        <svg height="24" role="img" width="24" viewBox="0 0 512 512" className="_08f8133e4f703ce562826348eb158f87-scss" aria-hidden="true"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor"></path></svg>
                    </span>
                    <input type='text' maxLength="80" autoCorrect="off" autoCapitalize="off" spellCheck="false" placeholder="Artists, songs, or podcasts" onChange={(e)=>{
                        // console.log('inp',e.target.value);
                        setDebouncedSearchTerm(e.target.value);
                        
                    }}/>
                </div>
            </div>

            <div className={Style.account}>
                <button className={Style.accountDisplay} onClick={()=>{
                    setAccountClicked(prev=>!prev);
                }}>
                    <figure title="MadTitan">
                        <div>
                            <svg width="22" height="22" fill="currentColor" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" data-testid="user-icon"><path d="M15.216 13.717L12 11.869C11.823 11.768 11.772 11.607 11.757 11.521C11.742 11.435 11.737 11.267 11.869 11.111L13.18 9.57401C14.031 8.58001 14.5 7.31101 14.5 6.00001V5.50001C14.5 3.98501 13.866 2.52301 12.761 1.48601C11.64 0.435011 10.173 -0.0879888 8.636 0.0110112C5.756 0.198011 3.501 2.68401 3.501 5.67101V6.00001C3.501 7.31101 3.97 8.58001 4.82 9.57401L6.131 11.111C6.264 11.266 6.258 11.434 6.243 11.521C6.228 11.607 6.177 11.768 5.999 11.869L2.786 13.716C1.067 14.692 0 16.526 0 18.501V20H1V18.501C1 16.885 1.874 15.385 3.283 14.584L6.498 12.736C6.886 12.513 7.152 12.132 7.228 11.691C7.304 11.251 7.182 10.802 6.891 10.462L5.579 8.92501C4.883 8.11101 4.499 7.07201 4.499 6.00001V5.67101C4.499 3.21001 6.344 1.16201 8.699 1.00901C9.961 0.928011 11.159 1.35601 12.076 2.21501C12.994 3.07601 13.5 4.24301 13.5 5.50001V6.00001C13.5 7.07201 13.117 8.11101 12.42 8.92501L11.109 10.462C10.819 10.803 10.696 11.251 10.772 11.691C10.849 12.132 11.115 12.513 11.503 12.736L14.721 14.585C16.127 15.384 17.001 16.884 17.001 18.501V20H18.001V18.501C18 16.526 16.932 14.692 15.216 13.717Z"></path></svg>
                        </div>
                    </figure>
                    <span>{userName}</span>
                    <span ref={arrowSpanRef}>▾</span>
                </button>

                <div className={Style.accountOptions} ref={optionsDivRef}>
                    <button onClick={()=>dispatch(userLogout())}>Log Out</button>
                </div>
            </div>

        </div>
    )
}

export default Header
