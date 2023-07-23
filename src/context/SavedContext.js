import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';

const savedReducer = (state, action) => {
    switch(action.type){
        case 'addSave':
            saveSaved(state + action.payload);
            return state + action.payload;
        case 'subSave':
            saveSaved(state - action.payload);
            return state - action.payload;
        default:
            return state;
    }
};

const saveSaved = async ( amount ) =>{
    try{
        if(await AsyncStorage.getItem('savedbal'))
            await AsyncStorage.removeItem('savedbal');
        await AsyncStorage.setItem('savedbal', amount.toString());
    } catch(e){
        console.log(e);
    }
}

const addSaved = (dispatch) => {
    return (amount) => {
        if(!isNaN(amount)){
            dispatch({ type: 'addSave', payload: amount });
        }
    };
}
const subtractSaved = (dispatch) => {
    return (amount) => {
        if(!isNaN(amount)){
            dispatch({ type: 'subSave', payload: amount });
        }
    };
}

export const { Context, Provider } = createDataContext(savedReducer, { addSaved, subtractSaved }, 0)