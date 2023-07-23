import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';

const goalReducer = (state, action) => {
    switch(action.type){
        case 'setG':
            
            saveGoal(action.payload)
            return action.payload;
        default:
            return state;
    }
};

const saveGoal = async ( amount ) =>{
    try{
        if(await AsyncStorage.getItem('goal'))
            {await AsyncStorage.removeItem('goal');}
        await AsyncStorage.setItem('goal', amount.toString());
    } catch(e){
        console.log(e);
    }
}

const setGoal = (dispatch) => {
    return (amount) => {
        if(!isNaN(amount)){
            dispatch({ type: 'setG', payload: amount });
        }
    };
}

export const { Context, Provider } = createDataContext(goalReducer, { setGoal }, 100)
