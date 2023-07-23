import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Context as BalanceContext } from '../context/BalanceContext';
import { Context as SavedContext } from '../context/SavedContext';
import { Context as SpentContext } from '../context/SpentContext';
import { Context as GoalContext } from '../context/GoalContext';
import { Context as ListContext } from '../context/SpendListContext';
import { Context as CurrencyContext } from '../context/CurrencyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

  const [balanceCount, setbalanceCount] = useState(10)
  const bCon = useContext(BalanceContext);
  const saCon = useContext(SavedContext);
  const spCon = useContext(SpentContext);
  const gCon = useContext(GoalContext);
  const lCon = useContext(ListContext);
  const cCon = useContext(CurrencyContext);
  
  const getBal = async() =>{
    try{
      const val = await AsyncStorage.getItem('balance')
      bCon.subtractBalance(bCon.state)
      bCon.addBalance(parseInt(val))
    } catch(e){
      console.log(e)
    }
  }

  const getSpent = async() =>{
    try{
      const val = await AsyncStorage.getItem('spent')
      spCon.subtractSpent(spCon.state)
      spCon.addSpent(parseInt(val))
    } catch(e){
      console.log(e)
    }
  }

  const getSaved = async() =>{
    try{
      const val = await AsyncStorage.getItem('savedbal')
      saCon.subtractSaved(saCon.state)
      saCon.addSaved(parseInt(val))
    } catch(e){
      console.log(e)
    }
  }

  const getList = async() =>{
    try{
      const val = await AsyncStorage.getItem('list')
      lCon.setList(JSON.parse(val))
    } catch(e){
      console.log(e)
    }
  }

  const getGoal = async() =>{
    try{
      const val = await AsyncStorage.getItem('goal')
      gCon.setGoal(parseInt(val))
    } catch(e){
      console.log(e)
    }
  }

  const getCurrency = async() =>{
    try{
      const val = await AsyncStorage.getItem('currency')
      if(val)
        cCon.setCurrency(val)
    } catch(e){
      console.log(e)
    }
  }

  useEffect(() =>{
      getBal()
      getSaved()
      getSpent()
      getGoal()
      getList()
      getCurrency()
    }, []
  );
  

  return <ScrollView style={{ backgroundColor: '#99CCFF'}} bounces='false'>
    <TouchableOpacity
      onPress = {() => navigation.navigate('Balance', {bCount: balanceCount})}
      style={styles.buttons}
    >
      <Text style={styles.text}>
          {'\n'}
          Balance
          {'\n'}
          {bCon.state} {cCon.state}
          {'\n'}
      </Text> 
    </TouchableOpacity>
    <TouchableOpacity
      onPress = {() => navigation.navigate('Saving')}
      style={styles.buttons}
    >
      <Text style={styles.text}>
          {'\n'}
          Balance Saved
          {'\n'}
          {saCon.state} {cCon.state}
          {'\n'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress = {() => navigation.navigate('Spending')}
      style={styles.buttons}
    >
     <Text style={styles.text}>
          {'\n'}
          Total Spent
          {'\n'}
          {spCon.state} {cCon.state}
          {'\n'}
      </Text>
    </TouchableOpacity>
      <TouchableOpacity
        onPress = {() => navigation.navigate('SavingGoal')}
        style={styles.buttons}
      >
        <Text style={styles.text}>
          {'\n'}
          Goal
          {'\n'}
          {Math.round((saCon.state / gCon.state * 100) * 10) / 10} %
          {'\n'}
      </Text>
    </TouchableOpacity>
  </ScrollView>
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => <TouchableOpacity onPress ={() => navigation.navigate('Settings')} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
      <Feather name="settings" size={30}/>
    </TouchableOpacity>
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  buttons: {
    backgroundColor: 'white',
    color: 'black',
    width: "90%",
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 7,
    borderColor: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '5%',
    padding: "2%",
    fontSize:  20,
    marginTop: '5%',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  20,
  }
});

export default HomeScreen;
