import React, {useContext} from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Context } from '../context/SpentContext';
import { Context as CurrencyContext } from '../context/CurrencyContext';



const SpendingScreen = ({ navigation }) => {

  const { state } = useContext(Context)
  const cCon = useContext(CurrencyContext);

  

  return <ScrollView style={{ backgroundColor: '#99CCFF'}} bounces='false'>
    <View style={styles.blance}>
      <Text style={styles.btext}>
        {state} {cCon.state}
     </Text>
    </View>
    <TouchableOpacity onPress = {() => navigation.navigate('NewSpending')}>
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
    marginTop: '30%',
    marginBottom: 120,
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
});

export default SpendingScreen;