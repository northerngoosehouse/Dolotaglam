import React, {Component} from 'react'
import { View, Text, Button } from 'react-native'

export class Home extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
        <Text style={{marginTop: 100}}>Dolotagram-home</Text>
      </View>
    )
  }
}