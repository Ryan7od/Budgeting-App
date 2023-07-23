import React, { useReducer, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import { Context as SpentContext } from './SpentContext'

const listReducer = (state, action) => {

    switch(action.type){
        case 'addCategory':
            saveList([...state, { name: action.payload, amount: 0}])
            return [...state, { name: action.payload, amount: 0}];
        case 'delCategory':
            saveList(state.filter((List) => List.name !== action.payload))
            return state.filter((List) => List.name !== action.payload);
        case 'delAmount':
            saveList(state.map((List) => {
                if(List.name === action.payload.name){
                    return { name: action.payload.name, amount: List.amount - action.payload.amount};
                } else {
                    return List;
                }
            }))
            return state.map((List) => {
                if(List.name === action.payload.name){
                    return { name: action.payload.name, amount: List.amount - action.payload.amount};
                } else {
                    return List;
                }
            });
        case 'addAmount':
            saveList(state.map((List) => {
                if(List.name === action.payload.name){
                    return { name: List.name, amount: parseInt(List.amount) + parseInt(action.payload.amount)};
                } else {
                    return List;
                }
            }))
            return state.map((List) => {
                if(List.name === action.payload.name){
                    return { name: List.name, amount: parseInt(List.amount) + parseInt(action.payload.amount)};
                } else {
                    return List;
                }
            });
        case 'setList':
            saveList(action.payload);
            return action.payload;
        default:
            return state;
    }
};


const saveList = async ( slist ) =>{
    try{
        if(await AsyncStorage.getItem('list'))
            await AsyncStorage.removeItem('list');
        await AsyncStorage.setItem('list', JSON.stringify(slist));
    } catch(e){
        console.log(e);
    }
}

const addList = (dispatch) => {
    return (cat) => {
            dispatch({ type: 'addCategory', payload: cat });
    };
}
const delList = (dispatch) => {
    return (cat) => {
            dispatch({ type: 'delCategory', payload: cat });
    };
}
const addSpendList = (dispatch) => {
    return(cat, amount) => {
        if(!isNaN(amount)){
            dispatch({ type: 'addAmount', payload: { name: cat, amount }})
        }
    };
}
const subtractSpendList = (dispatch) => {
    return(cat, amount) => {
        dispatch({ type: 'subAmount', payload: { name: cat, amount }})
    };
}

const setList = (dispatch) => {
    return(slist) => {
        dispatch({ type: 'setList', payload: slist })
    };
}

export const { Context, Provider } = createDataContext(listReducer, { addList, delList, addSpendList, subtractSpendList, setList }, [{name: 'Food & Drink', amount: 0}, {name: 'Clothing', amount: 0}])