import React, {Component} from 'react'
import { ActivityIndicator ,StyleSheet, View, TextInput, TouchableOpacity, Text,Image,ScrollView,CameraRoll} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { AsyncStorage } from "react-native"
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class AddReportInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this)
    this.createJSON = this.createJSON.bind(this)
    this.uploadReport = this.uploadReport.bind(this)
    this.state = { 
      idolName : this.props.navigation.state.params.idolName[0],
      report : this.props.navigation.state.params.report[0],
      eventDate:"",
      eventName:"",
      imageUrl:null,
      loading:false,
      hasCameraRollPermission: null,
      };
  }

  async componentWillMount(){
    // カメラロールに対するPermissionを許可
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: status === 'granted' });
  }

  async getImage(){
      // Image Pickerを起動す
      if(this.state.hasCameraRollPermission !== 'granted'){
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted' });
      }
      let result = await ImagePicker.launchImageLibraryAsync();
      console.log(result);
      this.setState({ imageUrl: result.uri });
  }

  createJSON = async()=>{
    const userName = await getUserName()
    const now = new Date()
    const eventDate_arr = this.state.eventDate.split('/')
    const eventDate = new Date(eventDate_arr[0],eventDate_arr[1],eventDate_arr[2])
    const data = {
        "user_id":userName,
        // "idol_name" :this.state.idolName,
        "report" : this.state.report,
        "event_date":eventDate,
        "created_at": now,
        // "event_name":this.state.eventName,
        "cheki_url": this.state.imageUrl
    }
    this.uploadReport(data)
  }

  uploadReport = (data) =>{
    const JsonRpcBody =  JSON.stringify({
      "jsonrpc": "2.0", 
      "method": "K.SaveCard", 
      "params": data, 
      "id": "1"
    })
    console.log(JsonRpcBody)
    this.setState({loading:true})
    fetch('https://k-dot-dolotagram-254717.appspot.com/jrpc', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JsonRpcBody
      }).then(response => {
          return response.json();
        }).then(jsonData => {
          console.log('jsonData:', jsonData); 
          this.setState({loading:false})
          this.props.navigation.navigate('Home')
      }).catch(error => {
      console.log(error)
      this.setState({loading:false})
      this.props.navigation.navigate('Home')
    })
  }

  render() {

    if (this.state.loading === true) { // ←追記部分
      return <ActivityIndicator size="large" />;
    }
      return (
        <View style={styles.container}>
          <ScrollView>
          <TextInput 
            style={styles.inputBox}
            onChangeText = {(value) => this.setState({eventDate: value})}
            placeholder={"イベント日"}/>
          <TextInput 
            style={styles.inputBox}
            onChangeText = {(value) => this.setState({eventName:value})}
            placeholder={"イベント名"}/>
      
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddReport')}>
              <View style={styles.inputRow}>
                  <AntDesign name="filetext1" size={40}/>
                  <Text style={{marginLeft:5}}>レポを確認する</Text>
              </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this.getImage}>
              <View style={styles.inputRow}>
                  <AntDesign name="camerao" size={40}/>
                  <Text style={{marginLeft:5}}>画像を追加する</Text>
              </View>
          </TouchableOpacity>
          
          <View style={styles.inputRow}>
          <Image 
              source = {{uri:this.state.imageUrl}}
              style={styles.image}
          />

          <View style={styles.nextButton}>
            <TouchableOpacity onPress={() => {
              this.createJSON()
              }}>
              <Feather name="upload" size={40}/>
            </TouchableOpacity>
          </View>
          </View>
          </ScrollView>
        </View>
    )
  }
}

const getUserName = async() => {
  return await AsyncStorage.getItem('userName')
}

const styles = StyleSheet.create({
    container:{
      margin:20,
    },
    inputRow:{
      marginTop:10,
      flexDirection: 'row',
    },
    inputTitle:{
      width:120,
      textAlign:"right"
    },
    inputBox:{
      marginTop:10,
      height:hp('5%'),
      width:wp('65%'),
      // marginLeft:10,
      borderWidth:0.5,
      borderRadius:10,
      borderColor: 'gray'
    },
    image: {
        height: hp('40%'),
        width:wp('60%'),
        resizeMode: 'contain',
        borderWidth:0.5,
        borderRadius:10,
        borderColor: 'gray'
    },
    nextButton:{
      marginTop:hp('35%'),
      marginLeft:wp('15%'),
      alignItems: 'flex-end'
    }
  });