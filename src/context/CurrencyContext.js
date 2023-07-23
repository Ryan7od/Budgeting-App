import React, { useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';

const currencyReducer = (state, action) => {
    switch(action.type){
        case 'set':
            saveCurr(action.payload)
            return action.payload;
        default:
            return state;
    }
};

const saveCurr = async ( amount ) =>{
    try{
        if(await AsyncStorage.getItem('currency'))
            await AsyncStorage.removeItem('currency');
        await AsyncStorage.setItem('currency', amount.toString());
    } catch(e){
        console.log(e);
    }
}


const setCurrency = (dispatch) => {
    return (curr) => {
        dispatch({type: 'set', payload: curr})
    };
}

export const { Context, Provider } = createDataContext(currencyReducer, { setCurrency }, "$")
