import React, {Component} from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity,ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class AddReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      idolName:"",
      report:""
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <TextInput 
          style={styles.inputBox}
          placeholder={"アイドルの名前"}
          name="idolName"
          onChangeText = {(value) => this.setState({idolName: value})}
          />
        <TextInput 
          style={styles.repoBox}
          multiline={true}
          name="report"
          onChangeText = {(value) => this.setState({report: value})}
          placeholder={"レポ（レポ無しの場合はそのまま次へ）"} />
        
        <View style={styles.nextButton}>
          <TouchableOpacity onPress={() => 
            this.props.navigation.navigate('AddReportInfo',
            {
              idolName:[this.state.idolName],
              report:[this.state.report]
            })}>
            <Ionicons name="ios-arrow-round-forward" size={40}/>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
 )
}
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:20,
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
      // marginLeft:10,
      borderWidth:0.5,
      borderRadius:10,
      borderColor: 'gray'
    },
    repoBox:{
      height:hp('55%'),
      padding:5,
      marginTop:30,
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
    }
  });