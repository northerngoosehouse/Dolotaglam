import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Home } from './home';

export default function App() {
  return (
      // <View style={styles.container}>
      //   <Text>Dolotagram!!!!!!</Text>
      // </View>
      <Home />
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
});