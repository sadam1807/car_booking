import {ADD_ITEM} from './types';
import axios from 'axios';

export const createCar = values => dispatch => {
    axios
    .post('/api/v1/cars/add' , values).then(res => 
    dispatch({
        type :ADD_ITEM,
        payload: res.data
    }))
    .catch(error => {
        	if(error.response) {
                dispatch({
                    type :ADD_ITEM,
                    payload: error.response.data
                })
            }
         }  
        );  
};