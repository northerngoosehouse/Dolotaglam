import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,TextInput, InputAccessoryView,Image} from 'react-native'
import { Card } from 'react-native-elements'
import { AsyncStorage } from "react-native"

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
        this.setState({userName:values})
    });
  }

  render() {
    return (
      <View keyboardDismissMode="interactive">
        <ScrollView>
        <Card
            title={this.state.userName}>
        </Card>
    </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    card: {
      flex:1,
      height: 500,
    },
    addImage: {
      height: 300,
      resizeMode: 'contain',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });