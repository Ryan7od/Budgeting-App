import React, { useState, useContext } from 'react';
import { Text, StyleSheet, ScrollView, View, Alert } from 'react-native';  
import { useRoute } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../context/SpendListContext';
import { Context as BalanceContext } from '../context/BalanceContext';
import { Context as SpentContext } from '../context/SpentContext';
import { Context as CurrencyContext } from '../context/CurrencyContext';
import { Feather } from '@expo/vector-icons';

const AddSpendingScreen = ({ navigation }) => {

  const insufFundsAlert = () =>
  Alert.alert(
    "Insufficient Funds",
    "You don't have enough in your balance to save this amount",
    [
      { text: "OK" }
    ]
  );

  const { state, addSpendList, delList } = useContext(Context)
  const bCon = useContext(BalanceContext)
  const spCon = useContext(SpentContext)
  const cCon = useContext(CurrencyContext);
  const [increase, setincrease] = useState("")

  const category = state.find((category) => category.name === navigation.getParam('cat'));


  const dodeposit = () => {
    if(increase <= bCon.state){
      addSpendList(category.name, parseInt(increase));
      bCon.subtractBalance(parseInt(increase));
      spCon.addSpent(parseInt(increase));
    } else {
      if(!isNaN(increase)){
        insufFundsAlert();
      }   
    }
    setincrease(0)
  }
  

  return <ScrollView style={{ backgroundColor: '#99CCFF'}} bounces='false'>
    <View style={styles.blance}>
      <Text style={styles.btext}>
        {category.name}
      </Text>
    </View>
    <Text style={styles.btext}>
      {category.amount} {cCon.state}
    </Text>
    <TextInput
      style={styles.txtbox}
      autoCapitalize='none'
      autoCorrect={false} 
      value= {increase}
      onChangeText={newValue =>  setincrease(newValue)}
    ></TextInput>
    <TouchableOpacity onPress = {() => dodeposit()}>
      <Text style={styles.btext}>
        Add Spending
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
    marginTop: '0%',
    marginBottom: 20,
    justifyContent: 'center'
  },
  btext: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  40,
    marginTop: '5%',
    marginBottom: '5%',
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

export default AddSpendingScreen;