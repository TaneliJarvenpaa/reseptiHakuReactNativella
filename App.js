import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button,FlatList,Image} from 'react-native';

export default function App() {

  const [hakusana, setHakuSana] = useState('');
  const [reseptit,setReseptit] = useState('[]');

  const haeReseptit = () =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
    .then(response => response.json())
    .then(responseJson =>setReseptit(responseJson.meals))
    .catch(err =>{
      console.log(err)});
  };


  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };




  return (
    <View style={styles.container}>
      
        <FlatList
        style={styles.flatlist}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.strMeal}</Text>
              <Image style={{width:50, height: 50}} source={{ uri:`${item.strMealThumb}`, }}/>
            </View>
          );
          }}
          data={reseptit}
          ItemSeparatorComponent={listSeparator} 
          />
      
      
      <View style={styles.bottom}>
        <TextInput
          placeholder='hae nimellä'
          style={{height: 40,width:200,fontSize:18,borderColor:'black',borderWidth:2}}
          onChangeText={(text) => setHakuSana(text)}
          
        />
        <Button title='Hae' onPress={haeReseptit}></Button>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingBottom:5
       
  },
  bottom: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
     }
    ,
    flatlist: {
      marginTop: 100,
      fontSize:22,
      fontWeight:'bold'
    }
});
