import { useLayoutEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {setNumberOfCards} from '../state/ducks/metadata';


export default function useCardSetterWrtWidth() {

    const dispatch = useDispatch();
    const numberOfCards = useSelector(state=>state.appMetadata.numberOfCards);

    const [actualWidth, setActualWidth] = useState(window.innerWidth);
    const [debouncedWidth, setDebouncedWidth] = useState(window.innerWidth);


  useLayoutEffect(() => {

    function updateActualWidth() {
      setActualWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateActualWidth);

    return () => window.removeEventListener('resize', updateActualWidth);
  }, []);

  useLayoutEffect(() =>{
    // console.error('actual width',actualWidth);

    const timer = setTimeout(() =>{
      if(actualWidth !== debouncedWidth)
        setDebouncedWidth(actualWidth)
    },100)

    return () => clearTimeout(timer);

  },[actualWidth])

  useLayoutEffect(() => {
    // console.error('db width',debouncedWidth);
    let n = Math.floor((83*debouncedWidth-4500)/21700);
    n=Math.max(n,1);
    // console.error(n); 
    if(n !== numberOfCards)
      dispatch(setNumberOfCards(n));
  },[debouncedWidth])
}