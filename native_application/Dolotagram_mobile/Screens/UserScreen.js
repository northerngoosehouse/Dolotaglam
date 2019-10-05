import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,TextInput, InputAccessoryView,Image} from 'react-native'
import { Card } from 'react-native-elements'
import { AsyncStorage } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state={username:""}
    this.getUserName = this.getUserName.bind(this);
    this.getUserName()
  }

  getUserName = async() => {
    await AsyncStorage.getItem('userName')
      .then((values)=>{
        console.log(values)
        this.setState({username:values})
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.card} title='User'>
          <Image 
            source = {{uri:userIconUrl}}
            style={styles.icon}/>
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>名前</Text>
            <Text style={styles.infoText}>塩見きらに飼われたいボク</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>ID</Text>
            <Text style={styles.infoText}>{this.state.username}</Text>
          </View>
        </Card>
    </View>
    )
  }
}

const userIconUrl = 'https://pbs.twimg.com/profile_images/1173948373788790784/qlM4dnNj_400x400.jpg'

const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop:20
    },
    card: {
      flexDirection: 'column',
      paddingBottom:50,
      alignItems: 'center',
      height: hp('60%'),
    },
    icon:{
      width:hp('20%'),
      height:hp('20%'),
      borderRadius: hp('20%') / 2,
    },
    infoSection:{
      marginTop:20,
      alignItems:'center'
    },
    infoTitle:{
      textAlign:'center'
    },
    infoText:{
      textAlign:'center'
    }
  });