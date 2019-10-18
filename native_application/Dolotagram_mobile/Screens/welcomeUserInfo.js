import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,TextInput, TouchableOpacity,Image,Alert} from 'react-native'
import {Container,Content,Form,Item,Input, Button} from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

//初回起動時に表示したい。
export class WelcomeUserInfoScreen extends Component {
  constructor(props){
    super(props)
    this.getImageFromStorage = this.getImageFromStorage.bind(this)
    this.registerUser = this.registerUser.bind(this)
    this.state={
      hasCameraRollPermission:null,
      userId:"",
      userName:"",
      userIconUrl:null
    }
  }

  async getImageFromStorage(){
    // Image Pickerを起動す
    if(this.state.hasCameraRollPermission !== 'granted'){
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ hasCameraRollPermission: status === 'granted' });
    }
    let result = await ImagePicker.launchImageLibraryAsync();
    if(result.cancelled === false){
        this.setState({ userIconUri: result.uri });
    }
}

  async registerUser(){
    console.log(this.state.userIconUrl)
    console.log(this.state.userId)
    console.log(this.state.userName)
    if(this.state.userId === "" || this.state.userName === ""){
      Alert.alert(
        '入力に不備があります',
        'ユーザーIDと表示名は必須入力です',
        [
          {text: 'OK', style: 'default'},
        ],
        { cancelable: false }
      )
      return
    }
    //await DBに登録するメソッド
    //await Asyncに登録するメソッド
    //.then Homeに移動する
  }

  render() {
    return (
      <Container style={styles.container} keyboardDismissMode="interactive">
        <Text style={styles.title}>おたぐらむへようこそ！</Text>
        <TouchableOpacity 
          style={{alignItems:"center"}}
          onPress={()=>this.getImageFromStorage()}>
          {this.state.userIconUrl === null &&
          <Image 
            style={styles.icon}
            source={require('../assets/img/addPhoto.jpg')}/>
          }{this.state.userIconUrl !== null &&
            <Image 
            style={styles.icon}
            source={{uri:this.state.userIconUrl}}/>
          }
        </TouchableOpacity>
        <Form style={{marginTop:10}}>
          <Item>
            <Input 
              placeholder = "ユーザーID"
              onChangeText = {(value) => this.setState({userId:value})}/>
          </Item>
          <Item>
            <Input 
              placeholder = "表示名"
              onChangeText = {(value) => this.setState({userName:value})}/>
          </Item>
        </Form>
          <Button block 
            style={{marginTop:30,alignItems:"center",}}
            onPress={() => this.registerUser()}>
              <Text style={{color:'#fff',fontSize:wp('3%')}}>登録</Text>
          </Button>
      </Container>
  )
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:hp('5%')
  },
  title:{
    fontSize:wp('8%'),
    textAlign:"center"
  },
  icon:{
    marginTop:30,
    width:wp('50%'),
    height:wp('50%'),
    borderRadius:wp('50%')/2,
    backgroundColor: "gray"
  }
  });