import  { useState, useEffect } from 'react';


export default function useDebounce(value,delay){
    const [debouncedValue, setDebouncedValue] = useState(value);

    let handler;
    const updateValue = newValue =>{
        if(handler)
            clearTimeout(handler);
        handler = setTimeout(()=>{
            setDebouncedValue(newValue);
        },delay)
    }
    return [debouncedValue,updateValue];
}
