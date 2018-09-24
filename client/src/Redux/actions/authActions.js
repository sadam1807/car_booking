import {AUTH_USER} from './types';
import axios from 'axios';

export const authUser = values => dispatch => {
    axios
    .post('/api/v1/users/login' , values).then(res => 
    dispatch({
        type :AUTH_USER,
        payload: res.data
    }))
    .catch(error => {
        	if(error.response) {
                dispatch({
                    type :AUTH_USER,
                    payload: error.response.data.message
                })
            }
         }  
        );  
};

