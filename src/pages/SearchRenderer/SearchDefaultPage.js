import React,{useEffect,useRef, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {fetchUserBrowseCategories} from '../../state/ducks/userCollection';
import {showSearchInHeader} from '../../state/ducks/metadata';

import HomePageSection from '../../components/HomePageSection';
import baseStyle from '../Style.module.scss';

function SearchDefaultPage() {

    const dispatch = useDispatch();

    const country = useSelector(state=>state.authentication.userProfile.country);
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const browse = useSelector(state=>state.userCollection.browse);

    useEffect(() => {
        dispatch(showSearchInHeader(true));
        return () => {
            dispatch(showSearchInHeader(false));
        }
    }, [])


    const divref = useRef();
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        if(loading)
            setLoading(false);
        checkToLoadMore();
    },[browse.categories])
    const checkToLoadMore = () =>{
        if(!loading && divref.current.scrollHeight-divref.current.clientHeight-divref.current.scrollTop < 40){
            dispatch(fetchUserBrowseCategories(country,browse.categories.length,20,accessToken));
            setLoading(true);
        }
    }

    return (
        <div className={baseStyle.FullScreenSectionPage} onScroll={checkToLoadMore} ref={divref}>
            <HomePageSection title='Browse All' isTitleALink={false} items={browse.categories}/>            
        </div>
    )
}

export default SearchDefaultPage
