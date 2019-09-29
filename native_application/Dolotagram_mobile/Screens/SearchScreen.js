import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,TextInput, InputAccessoryView,Image} from 'react-native'
import { Card } from 'react-native-elements'

export class SearchScreen extends Component {
  render() {
    return (
      <View keyboardDismissMode="interactive">
        <ScrollView>
        <Card
            title='Search'>
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