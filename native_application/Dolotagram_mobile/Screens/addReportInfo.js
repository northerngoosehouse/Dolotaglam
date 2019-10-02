import React, {Component} from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text,Image} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { AsyncStorage } from "react-native"

export class AddReportInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.setImage = this.setImage.bind(this)
    this.createJSON = this.createJSON.bind(this)
    this.state = { 
      idolName : this.props.navigation.state.params.idolName[0],
      report : this.props.navigation.state.params.report[0],
      eventDate:"",
      eventName:"",
      imageUrl:""
    }
  }

  setImage(){
    const imageUrl = getImageUrl()
    this.setState({imageUrl:imageUrl})
  }

  createJSON = async()=>{
    const userName = await getUserName()
    const data = JSON.stringify({
        "user_id":userName,
        "idol_name" :this.state.idolName,
        "report" : this.state.report,
        "event_date":this.state.eventDate,
        "event_name":this.state.eventName,
        "cheki_url":this.state.imageUrl
    })
    console.log(data)
  }

  render() {
      return (
        <View style={styles.container}>
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
          
          <TouchableOpacity onPress={this.setImage}>
              <View style={styles.inputRow}>
                  <AntDesign name="camerao" size={40}/>
                  <Text style={{marginLeft:5}}>画像を追加する</Text>
              </View>
          </TouchableOpacity>
          
          <Image 
              source = {{uri:this.state.imageUrl}}
              style={styles.image}
          />

          <View style={styles.nextButton}>
            <TouchableOpacity onPress={() => {
              this.createJSON()
              this.props.navigation.navigate('Home')
              }}>
              <Feather name="upload" size={40}/>
            </TouchableOpacity>
          </View>
          <Text>{this.state.idolName}</Text>
          <Text>{this.state.report}</Text>
        </View>
    )
  }
}

const getUserName = async() => {
  return await AsyncStorage.getItem('userName')
}

const getImageUrl = () => {
  return 'https://pbs.twimg.com/media/EFKbznkU0AARx6b?format=jpg'
}
const styles = StyleSheet.create({
    container:{
      margin:20,
    },
    inputRow:{
      paddingTop:10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputTitle:{
      width:120,
      textAlign:"right"
    },
    inputBox:{
      marginTop:10,
      height:40,
      width:250,
      // marginLeft:10,
      borderWidth:0.5,
      borderRadius:10,
      borderColor: 'gray'
    },
    image: {
        height: 300,
        resizeMode: 'contain',
        padding:30,
      },
    nextButton:{
      marginTop:40,
      marginRight:40,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  });