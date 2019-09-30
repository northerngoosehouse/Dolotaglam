import React, {Component} from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text,Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

export class AddReportInfoScreen extends Component {
    render() {
        return (
          <View style={styles.container}>
            <TextInput 
              style={styles.inputBox}
              placeholder={"イベント日"}/>
            <TextInput 
              style={styles.inputBox}
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
            
            <Image 
                source = {{uri:this.state.imageUrl}}
                style={styles.image}
            />

            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                <Feather name="upload" size={40}/>
              </TouchableOpacity>
            </View>

          </View>
     )
    }

    getImage(){
        this.setState({imageUrl:'https://pbs.twimg.com/media/EFKbznkU0AARx6b?format=jpg'});
    }

    constructor(props) {
        super(props);
        this.state = { tenki : "" };
        this.getImage = this.getImage.bind(this);
    }
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