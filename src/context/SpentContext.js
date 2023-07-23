import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';

const spentReducer = (state, action) => {
    switch(action.type){
        case 'addSp':
            saveSpent(state + action.payload);
            return state + action.payload;
        case 'subSp':
            saveSpent(state - action.payload);
            return state - action.payload;
        default:
            return state;
    }
};

const saveSpent = async ( amount ) =>{
    try{
        if(await AsyncStorage.getItem('spent'))
            await AsyncStorage.removeItem('spent');
        await AsyncStorage.setItem('spent', amount.toString());
    } catch(e){
        console.log(e);
    }
}

const addSpent = (dispatch) => {
    return (amount) => {
        if(!isNaN(amount)){
            dispatch({ type: 'addSp', payload: amount });
        }
    };
}
const subtractSpent = (dispatch) => {
    return (amount) => {
        if(!isNaN(amount)){
            dispatch({ type: 'subSp', payload: amount });
        }
    };
}

export const { Context, Provider } = createDataContext(spentReducer, { addSpent, subtractSpent }, 0)
