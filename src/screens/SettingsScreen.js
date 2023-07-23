import React, { useState, useContext } from 'react';
import { Text, StyleSheet, ScrollView, View, Alert } from 'react-native';  
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as BalanceContext } from '../context/BalanceContext';
import { Context as SavedContext } from '../context/SavedContext';
import { Context as SpentContext } from '../context/SpentContext';
import { Context as GoalContext } from '../context/GoalContext';
import { Context as ListContext } from '../context/SpendListContext';
import { Context as CurrencyContext } from '../context/CurrencyContext';

const SettingsScreen = ({ navigation }) => {

  const bCon = useContext(BalanceContext);
  const saCon = useContext(SavedContext);
  const spCon = useContext(SpentContext);
  const gCon = useContext(GoalContext);
  const lCon = useContext(ListContext);
  const cCon = useContext(CurrencyContext);

  const [curr, setcurr] = useState('')

  const resetAll = async() =>{
    bCon.subtractBalance(parseInt(bCon.state));
    saCon.subtractSaved(parseInt(saCon.state));
    spCon.subtractSpent(parseInt(spCon.state));
    gCon.setGoal(100);
    lCon.setList([{name: 'Food & Drink', amount: 0}, {name: 'Clothing', amount: 0}]);
    cCon.setCurrency('$')
    navigation.navigate('Home')
  }

  const setcurren = () =>{
    cCon.setCurrency(curr)
    setcurr('')
  }

  return <ScrollView style={{ backgroundColor: '#99CCFF'}} bounces='false'>
    <TouchableOpacity onPress={() => resetAll()}>
      <Text style={styles.btext2}>
        Reset All Values
      </Text>
    </TouchableOpacity>
    <Text style={styles.btext}>
      Current Currency: {cCon.state}
    </Text>
    <TextInput
      style={styles.txtbox}
      autoCapitalize='none'
      autoCorrect={false} 
      value= {curr}
      onChangeText={newValue =>  setcurr(newValue)}
    ></TextInput>
    <TouchableOpacity
    onPress = {() => setcurren()}
    >
      <Text style={styles.text}>
        Set Currency
      </Text>
    </TouchableOpacity>
  </ScrollView>
};

const styles = StyleSheet.create({
  blance: {
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
    marginTop: '15%',
    marginBottom: 120,
    justifyContent: 'center'
  },
  btext: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  40,
    marginTop: '10%',
    marginBottom: '10%',
  },
  btext2: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  40,
    marginTop: '10%',
    marginBottom: '10%',
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 7,
    borderColor: 'black',
  },
  txtbox: {
    backgroundColor: 'white',
    color: 'black',
    width: "76%",
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 7,
    borderColor: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '12%',
    padding: "2%",
    fontSize:  20,
    marginTop: '5%',
    marginBottom: 20,
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 55
  },
});

export default SettingsScreen;