import React, { useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';

const balanceReducer = (state, action) => {
    switch(action.type){
        case 'addB':
            saveBal( state + action.payload);
            return state + action.payload;
        case 'subB':
            saveBal( state - action.payload);
            return state - action.payload;
        default:
            return state;
    }
};

const saveBal = async ( amount ) =>{
    try{
        if(await AsyncStorage.getItem('balance'))
            await AsyncStorage.removeItem('balance');
        await AsyncStorage.setItem('balance', amount.toString());
    } catch(e){
        console.log(e);
    }
}


const addBalance = (dispatch) => {
    return (amount) => {
        if(!isNaN(amount)){
            dispatch({ type: 'addB', payload: amount });
        }
    };
}
const subtractBalance = (dispatch) => {
    return (amount) => {
        if(!isNaN(amount)){
            dispatch({ type: 'subB', payload: amount });
        }
    };
}

export const { Context, Provider } = createDataContext(balanceReducer, { addBalance, subtractBalance }, 0)
