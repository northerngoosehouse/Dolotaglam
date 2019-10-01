import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,TextInput, InputAccessoryView,Image} from 'react-native'
import { Card } from 'react-native-elements'
import { AsyncStorage } from "react-native"

export class UserScreen extends Component {
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

getUserName = async() => {
  await AsyncStorage.getItem('userName')
    .then((values)=>{
      console.log(values)
      this.setState({userName:values})
  });
}

constructor(props) {
  super(props);
  this.state={username:""}
  this.getUserName = this.getUserName.bind(this);
  this.getUserName()
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