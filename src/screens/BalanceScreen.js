import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';  
import { useRoute } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../context/BalanceContext';
import { Context as CurrencyContext } from '../context/CurrencyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BalanceScreen = () => {

  const { state, addBalance, subtractBalance} = useContext(Context);
  const cCon = useContext(CurrencyContext);



  const [deposit, setdeposit] = useState(0);
  const [withdraw, setwithdraw] = useState(0);

  const dodeposit = () => {
    addBalance(parseInt(deposit))
    setdeposit(0)
  }

  const dowithdraw = () => {
    subtractBalance(parseInt(withdraw))
    setwithdraw(0)
  }


  return <ScrollView style={{ backgroundColor: '#99CCFF'}} bounces='false'>
    <View style={styles.blance}>
      <Text style={styles.btext}>
        {state} {cCon.state}
     </Text>
    </View>
    <TextInput
      style={styles.txtbox}
      autoCapitalize='none'
      autoCorrect={false} 
      value= {deposit}
      onChangeText={newValue =>  setdeposit(newValue)}
    ></TextInput>
    <TouchableOpacity
    onPress = {() => dodeposit()}
    >
      <Text style={styles.text}>
        Deposit
      </Text>
    </TouchableOpacity>
    <TextInput
      style={styles.txtbox}
      autoCapitalize='none'
      autoCorrect={false} 
      value= {withdraw}
      onChangeText={newValue =>  setwithdraw(newValue)}
    ></TextInput>
    <TouchableOpacity
    onPress = {() => dowithdraw()}
    >
      <Text style={styles.text}>
        Withdraw
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

export default BalanceScreen;
