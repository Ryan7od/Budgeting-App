import React, {useState, useContext} from 'react';
import { Text, StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Context } from '../context/GoalContext';
import { Context as SavedContext } from '../context/SavedContext';
import { Context as CurrencyContext } from '../context/CurrencyContext'



const sGoalScreen = () => {

  const { state, setGoal } = useContext(Context);
  const saCon = useContext(SavedContext);
  const cCon = useContext(CurrencyContext);

  let left = ""
  if(state - saCon.state >= 0){
    left =  state - saCon.state + "BD Left"
  }
  else{
    left = state - saCon.state * -1 +  "BD Excess"
  }
  
  const setgoal = () => {
    if(parseInt(txtgoalb) > 0){
      setGoal(parseInt(txtgoalb))
      settxtgoalb(0)
    }else{
      negGoalAlert()
    }
  }

  const [txtgoalb, settxtgoalb] = useState("");

  const percent = Math.round(saCon.state / state * 100);
  let green = "";
  for(let i = 0; i < percent/100*52; i++)
  {
    green += " "
  }

  const negGoalAlert = () =>
  Alert.alert(
    "Error",
    "Your savings goal is 0 or lower OR you didn't input a number",
    [
      { text: "OK" }
    ]
  );

  return <ScrollView style={{ backgroundColor: '#99CCFF'}} bounces='false'>
    <View style={styles.goal}>
      <Text style={styles.gtext}>
        {state} {cCon.state}
     </Text>
    </View>
    <TextInput
      style={styles.txtbox}
      autoCapitalize='none'
      autoCorrect={false} 
      value= {txtgoalb}
      onChangeText={newValue =>  settxtgoalb(newValue)}
    ></TextInput>
    <TouchableOpacity
    onPress = {() => setgoal()}
    >
      <Text style={styles.text}>
        Set Goal
      </Text>
    </TouchableOpacity>
    <Text style={styles.savedtxt}>
      {saCon.state}BD Saved
    </Text>
    <View style={styles.txtbox2}>
      <Text style={{backgroundColor: 'green', textAlign: 'left', fontSize: 25}}>{green}</Text>
    </View>
    <Text style={styles.lefttxt}>
      {left}
    </Text>

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
    marginTop: '15%',
    marginBottom: 70,
    justifyContent: 'center'
  },
  gtext: {
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
    marginBottom: 5,
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 55
  },
  txtbox2: {
    backgroundColor: 'white',
    color: 'black',
    width: "90%",
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 7,
    borderColor: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: '5%',
    padding: "2%",
    fontSize:  50,
    marginTop: '5%',
    marginBottom: 5,
    flexDirection: 'row'
  },
  savedtxt: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  lefttxt: {
    textAlign: 'right',
    marginRight: 25,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default sGoalScreen;
