// import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from '../actions/types';
import {AUTH_USER} from '../actions/types';
const initialState = {
    authResponse : []
}

export default function(state = initialState, action){
    switch(action.type){
        case AUTH_USER :
         return {
             ...state,
             authResponse :[action.payload]
         };
         
         default:
          return state;
    }
}