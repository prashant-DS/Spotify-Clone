import{
    SET_HEADER_BGCOLOR,
    SHOW_SEARCH_IN_HEADER,

    SET_SEARCH_DETAILS_DATA,
    SET_NUMBER_OF_CARDS,
} from './types'

const initialState={
    headerBgColor:"rgb(18,18,18)",
    showSearchInHeader:false,
    searchDetails:{},
    numberOfCards:0,
}

const metedataReducer = (state=initialState,action) =>{
    const oldState={...state}
    
    switch(action.type){
        case SET_HEADER_BGCOLOR:
            oldState.headerBgColor = action.payload.color;
            return oldState;
        case SHOW_SEARCH_IN_HEADER:
            oldState.showSearchInHeader = action.payload.display;
            return oldState;
        case SET_SEARCH_DETAILS_DATA:
            oldState.searchDetails={...oldState.searchDetails}
            const{searchTerm,data,type} = action.payload;
            if(!oldState.searchDetails[searchTerm])
                oldState.searchDetails[searchTerm]={};
            oldState.searchDetails[searchTerm]={...oldState.searchDetails[searchTerm]}

            if(oldState.searchDetails[searchTerm][type])
                oldState.searchDetails[searchTerm][type]=[...oldState.searchDetails[searchTerm][type],...data]
            else
            oldState.searchDetails[searchTerm][type]=[...data]
            return oldState;
        case SET_NUMBER_OF_CARDS:
            oldState.numberOfCards = action.payload.n;
            return oldState;
        default:
            return oldState;
    }
}

export default metedataReducer;