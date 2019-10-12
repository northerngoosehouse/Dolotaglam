import React, {Component} from 'react'
import { ActivityIndicator ,StyleSheet, View, TextInput, TouchableOpacity, Text,Image,Button, ScrollView} from 'react-native'
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { SegmentedControlIOS } from "react-native";
import { AsyncStorage } from "react-native"
import {KeyboardAvoidingView} from 'react-native';
import moment from "moment";

export class AddCardScreen extends Component{
    constructor(props) {
        super(props);
        this.getImageFromStorage = this.getImageFromStorage.bind(this)
        this.getImageFromCamera = this.getImageFromCamera.bind(this)
        this.openImageModal = this.openImageModal.bind(this)
        this.openReportModal = this.openReportModal.bind(this)
        this.closeImageModal = this.closeImageModal.bind(this)
        this.closeReportModal = this.closeReportModal.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.addSentence = this.addSentence.bind(this)
        this.createJSON = this.createJSON.bind(this)
    this.uploadReport = this.uploadReport.bind(this)
        this.state={
            hasCameraRollPermission:null,
            hasCameraPermission:null,
            reportModalVisible:false,
            imageModalVisible:false,
            imageUrl:"",
            idolName:"",
            eventDate:"",
            eventName:"",
            selectedIndex:0,
            sentence:"",
            report:"",
            loading:false,
        }
    }

    openReportModal() {
        this.setState({reportModalVisible:true});
      }

    openImageModal() {
        this.setState({imageModalVisible:true});
    }
    
    closeReportModal() {
        this.setState({reportModalVisible:false});
    }

    closeImageModal() {
        this.setState({imageModalVisible:false});
    }

    async getImageFromCamera(){
        // Image Pickerを起動す
        if(this.state.hasCameraPermission !== 'granted'){
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          this.setState({ hasCameraPermission: status === 'granted' });
        }
        if(this.state.hasCameraRollPermission !== 'granted'){
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          this.setState({ hasCameraRollPermission: status === 'granted' });
        }
        let result = await ImagePicker.launchCameraAsync();
        console.log(result);
        if(result.cancelled === false){
            this.setState({ imageUrl: result.uri });
        }
      }

    async getImageFromStorage(){
        // Image Pickerを起動す
        if(this.state.hasCameraRollPermission !== 'granted'){
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          this.setState({ hasCameraRollPermission: status === 'granted' });
        }
        let result = await ImagePicker.launchImageLibraryAsync();
        console.log(result);
        if(result.cancelled === false){
            this.setState({ imageUrl: result.uri });
        }
    }

    //消えてるけど、すぐに消えてくれない。
    deleteImage(){
        console.log('deleteImage')
        this.setState({ imageUrl: "" });
    }

    addSentence(){
        const input = this.state.sentence
        if(this.state.selectedIndex === 0){
            var sentence = 'アイドル「' + input + '」\n\n'
            this.setState({selectedIndex:1})
        }else if(this.state.selectedIndex === 1){
            var sentence = 'ぼく「' +  input + '」\n\n'
            this.setState({selectedIndex:0})
        }
        const report = this.state.report + sentence
        this.setState({report:report})
        this.setState({sentence:""})
    }

    createJSON = async()=>{
        const userName = await getUserName()
        const now = moment(new Date()).format('YYYY-MM-DD-HH-mm-ss')
        const eventDate_arr = (this.state.eventDate === null) ? "" : this.state.eventDate.split('/')
        const eventDate = (this.state.eventDate === null) ? "" : 
            moment(new Date(eventDate_arr[0],eventDate_arr[1],eventDate_arr[2])).format('YYYY-MM-DD')
        const imageBase64 = (this.state.imageUrl === "") ? "" :
            await ImageManipulator.manipulateAsync(this.state.imageUrl,
                [{rotate:360}],{format:ImageManipulator.SaveFormat.JPEG,base64:true}).base64
        const data = {
            "user_id":userName,
            // "idol_name" :this.state.idolName,
            "report" : this.state.report,
            "event_date":eventDate,
            "created_at": now,
            // "event_name":this.state.eventName,
            "cheki_url": imageBase64.base64
        }
        console.log(data)
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

    render(){
        if (this.state.loading === true) { // ←追記部分
            return <ActivityIndicator size="large" />;
          }
        return(
            <View style={styles.container}>
                <Modal
                    isVisible={this.state.reportModalVisible}>
                    <KeyboardAvoidingView style={styles.modalWrapper} behavior="padding" enabled>
                        <View style={styles.modalContainer}>
                            <View style={styles.reportContainer}>
                                <ScrollView style={styles.reportBox}>
                                    <Text>{this.state.report}</Text>
                                </ScrollView>
                                <SegmentedControlIOS
                                    values={['アイドル', '自分']}
                                    selectedIndex={this.state.selectedIndex}
                                    onChange={(event) => {
                                        this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                                    }}
                                />
                                <View style={styles.inputRow}>
                                    <TextInput 
                                        style={styles.writeReport}
                                        multiline={true}
                                        name="report"
                                        value={this.state.sentence}
                                        onChangeText = {(value) => this.setState({sentence: value})}
                                        placeholder={"レポ"} />
                                    <TouchableOpacity onPress={this.addSentence}>
                                        <Ionicons name="ios-add" style={{marginLeft:5}} size={35}/>
                                    </TouchableOpacity>
                                </View>
                                <Button title='close' onPress={this.closeReportModal}></Button>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>

                <Modal
                    isVisible={this.state.imageModalVisible}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalContainer}>
                        <View style={styles.imageBox}>
                            <TouchableOpacity style={styles.deleteImageButton} onPress={this.deleteImage}>
                                <Ionicons name="ios-close-circle-outline" size={30}/>
                            </TouchableOpacity>
                            <Image 
                                source = {{uri:this.state.imageUrl}}
                                style={styles.image}/>
                        </View> 
                            <View style={styles.imageModalButtons}>
                                    <TouchableOpacity onPress={this.getImageFromCamera}>
                                            <AntDesign name="camerao" size={35}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.closeImageModal}>
                                            <Ionicons name="ios-return-left" size={35}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.getImageFromStorage}>
                                            <Ionicons name="ios-images" size={35}/>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TextInput 
                    style={styles.inputBox}
                    placeholder={"アイドルの名前"}
                    name="idolName"
                    onChangeText = {(value) => this.setState({idolName: value})}
                />
                <TextInput 
                    style={styles.inputBox}
                    placeholder={"イベント日"}
                    name="eventDate"
                    onChangeText = {(value) => this.setState({eventDate: value})}
                />
                <TextInput 
                    style={styles.inputBox}
                    placeholder={"イベント名"}
                    name="eventName"
                    onChangeText = {(value) => this.setState({eventName: value})}
                />
                <TouchableOpacity onPress={this.openReportModal}>
                <View style={styles.inputRow}>
                    <AntDesign name="filetext1" size={35}/>
                    <Text style={{marginLeft:5}}>レポを書く</Text>
                </View>
            </TouchableOpacity>      
            <TouchableOpacity onPress={this.openImageModal}>
                <View style={styles.inputRow}>
                    <AntDesign name="camerao" size={35}/>
                    <Text style={{marginLeft:5}}>写真を追加する</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.nextButton}>
                <TouchableOpacity onPress={() => {
                    this.createJSON()
                }}>
                <Feather name="upload" size={40}/>
            </TouchableOpacity>
          </View>
        
            </View>
        )
    }

}

const getUserName = async() => {
    return await AsyncStorage.getItem('userName')
  }

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:20,
    },
    modalWrapper:{
        alignItems:'center',
        justifyContent:'center',
        height:hp('100%'),
        width:wp('100%')
    },
    modalContainer:{
        height:hp('90%'),
        width:wp('95%'),
        alignItems:'center',
        backgroundColor: '#fff',
        borderRadius:10,
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
      padding:5,
      width:wp('65%'),
      height:hp('5%'),
      borderWidth:0.5,
      borderRadius:10,
      borderColor: 'gray'
    },
    reportBox:{  
      padding:10,
      height:hp('55%'),
      padding:5,
      marginTop:30,
      marginBottom:30,
      borderWidth:0.5,
      borderRadius:10,
      borderColor: 'gray',
      textAlignVertical: "top"
    },
    writeReport:{
        marginTop:10,
        padding:5,
        width:wp('80%'),
        borderWidth:0.5,
        borderRadius:10,
        borderColor: 'gray',
        textAlignVertical: "top"
    },
    nextButton:{
      marginTop:20,
      marginRight:20,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    imageModalButtons:{
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        width:wp('70%'),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        height: hp('60%'),
        width:wp('70%'),
        resizeMode: 'contain',
        borderWidth:0.5,
        borderRadius:10,
        borderColor: 'gray'
    },
    deleteImageButton:{
        marginTop:10,
        backgroundColor:'#fff',
        marginBottom:-5
    },
    imageBox:{
    },
    reportContainer:{
        width:wp('90%')
    }
  });