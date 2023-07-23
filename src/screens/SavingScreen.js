import React, {useState, useContext} from 'react';
import { Text, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Context } from '../context/SavedContext';
import { Context as GoalContext } from '../context/GoalContext';
import { Context as BalanceContext } from '../context/BalanceContext';
import { Context as CurrencyContext } from '../context/CurrencyContext';



const SavingScreen = () => {

  const insufFundsAlert = () =>
  Alert.alert(
    "Insufficient Funds",
    "You don't have enough in your balance to save this amount",
    [
      { text: "OK" }
    ]
  );
  const negSavingAlert = () =>
  Alert.alert(
    "Not Enough Saved",
    "You don't have enough savings to withdraw this amount",
    [
      { text: "OK" }
    ]
  );

  const [deposit, setdeposit] = useState("");
  const [withdraw, setwithdraw] = useState("");

  let green = "";

  const gCon = useContext(GoalContext);
  const bCon = useContext(BalanceContext);
  const cCon = useContext(CurrencyContext);
  const { state, addSaved, subtractSaved} = useContext(Context);

  let percent = state / gCon.state * 100;
  

  for(let i = 0; i < percent/100*52; i++)
  {
    green += " "
  }
  

  const dodeposit = () => {
    if(deposit <= bCon.state){
      addSaved(parseInt(deposit));
      bCon.subtractBalance(parseInt(deposit));
    } else {
      insufFundsAlert();
    }
    setdeposit(0)
  }

  const dowithdraw = () => {
    if(state - withdraw > 0){
      subtractSaved(parseInt(withdraw));
      bCon.addBalance(parseInt(withdraw));
    } else {
      negSavingAlert();
    }
    setwithdraw(0)
  }

  let displayperc = Math.round(percent * 10) / 10;


  return <ScrollView style={{ backgroundColor: '#99CCFF'}} bounces='false'>
    <View style={styles.goal}>
      <Text style={styles.gtext1}>
        Goal: {gCon.state} {cCon.state}
     </Text>
     <Text style={styles.gtext2}>
       {displayperc} %
     </Text>
     <View style={styles.txtbox2}>
      <Text style={{backgroundColor: 'green', textAlign: 'left'}}>{green}</Text>
      </View>
    </View>
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
  goal: {
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
    marginTop: '10%',
    marginBottom: 10,
    justifyContent: 'center'
  },
  gtext1: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  25,
  },
  gtext2: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  40,
  },
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
    marginTop: '10%',
    marginBottom: 30,
    justifyContent: 'center'
  },
  btext: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  40,
    marginTop: '7%',
    marginBottom: '7%',
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
    marginBottom: 5,
    justifyContent: 'center'
  },
  txtbox2: {
    backgroundColor: 'white',
    color: 'black',
    width: "76%",
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 7,
    borderColor: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: '12%',
    padding: "2%",
    fontSize:  20,
    marginTop: '5%',
    marginBottom: 5,
    flexDirection: 'row'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
});

export default SavingScreen;
