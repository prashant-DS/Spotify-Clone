import React,{useEffect,useRef, useState} from 'react'
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import Style from './Style.module.scss';
import {
    fetchCategory,
} from '../state/ducks/userCollection';
import HomePageSection from '../components/HomePageSection';
import loadingImg from '../assests/loading.svg';


function CategoryRenderer() {

    const {categoryID} = useParams();

    const dispatch = useDispatch();
    const accessToken = useSelector(state=>state.authentication.token.access_token);
    const country = useSelector(state=>state.authentication.userProfile.country);
    const browse = useSelector(state=>state.userCollection.browse);
    const savedCategories = useSelector(state=>state.userCollection.savedData.categories);

    let collectionArray = savedCategories[categoryID];
    const loadMoreCategoryPlaylists = () => {
        if(!collectionArray)
            dispatch(fetchCategory(categoryID,country,20,0,accessToken));
        else
            dispatch(fetchCategory(categoryID,country,20,collectionArray.length,accessToken));
    }

    const divref = useRef();
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(false);
        checkToLoadMore();
    },[collectionArray])

    const checkToLoadMore = () =>{
        if(!loading && divref.current.scrollHeight-divref.current.clientHeight-divref.current.scrollTop < 40){
            loadMoreCategoryPlaylists();
            setLoading(true);
        }
    }
    

    return (
        <div className={Style.categoryPage} onScroll={checkToLoadMore} ref={divref}>
            {
                collectionArray ? <HomePageSection title={categoryID} 
                    isTitleALink={false} 
                    items={collectionArray}
                />:<img className={Style.loading} src={loadingImg}/>
            }
        </div>
    )
}

export default CategoryRenderer
