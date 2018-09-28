// import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from '../actions/types';
import {ADD_ITEM} from '../actions/types';
const initialState = {
    cars : []
}

export default function(state = initialState, action){
    switch(action.type){
        case ADD_ITEM :
         return {
             ...state,
             cars :[action.payload]
         };
         
         default:
          return state;
    }
}