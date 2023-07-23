import React, { useState, useContext } from 'react';
import { Text, StyleSheet,  View, TouchableOpacity, TextInput, Alert } from 'react-native';  
import { useRoute } from "@react-navigation/native";
import { Context } from '../context/SpendListContext';
import { Context as SpentContext } from '../context/SpentContext'
import { Feather } from '@expo/vector-icons';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

const NewSpendingScreen = ({ navigation }) => {

  const isFoundAlert = () =>
  Alert.alert(
    "Already added",
    "This spending category is already in the list",
    [
      { text: "OK" }
    ]
  );

    const { state, addList, delList } = useContext(Context);
    const spCon = useContext(SpentContext)

    const [add, setadd] = useState("");

    const addcat = () =>{

      const isFound = state.some(element => {
        if (element.name === add) {
          return true;
        }
      
        return false;
      });

      if(add === ""){

      } else {
        if(isFound){
          isFoundAlert();
          setadd("")
        } else {
        addList(add)
        setadd("")
        }
      }

    }

    const delItem = (lname) => {
      state.map((List) => {
        if(List.name === lname)
            spCon.subtractSpent(parseInt(List.amount))
      })
      delList(lname)
    }
    

    return <View style={{ backgroundColor: '#99CCFF'}} bounces='false'>
            <FlatList
                style={{ height: 500, marginTop: "10%" }}
                data = {state}
                keyExtractor = {(listItem) => listItem.name}
                renderItem={({ item }) => {
                    return (<TouchableOpacity onPress={() => navigation.navigate('AddSpending', { cat: item.name })}>
                        <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress = {() => delItem(item.name)}>
                                <Feather name="trash" style={styles.btext}/>
                            </TouchableOpacity>
                            <Text style={styles.btext2}>
                                {item.name}
                            </Text>
                            
                        </View>
                    </TouchableOpacity>
                    );
                }}
            />
            <TextInput
            style={styles.txtbox}
            autoCapitalize='none'
            autoCorrect={false} 
            value= {add}
            onChangeText={newValue =>  setadd(newValue)}
            ></TextInput>
            <TouchableOpacity onPress={() => addcat()}>
                <Text style={styles.btext}>
                    Add Category
                </Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: '#99CCFF', height: 500}}>

            </View>
    </View>
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
    marginTop: '0%',
    marginBottom: '10%',
  },
  btext2: {
    textAlign: 'left',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  40,
    marginTop: '0%',
    marginBottom: '10%',
    width: 360,
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
    marginBottom: 10,
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 55
  },
});

export default NewSpendingScreen;