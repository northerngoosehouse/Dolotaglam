import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,TextInput, InputAccessoryView,Image} from 'react-native'
import { Card } from 'react-native-elements'

export class AddReportScreen extends Component {
  render() {
    return (
      <View keyboardDismissMode="interactive">
        <ScrollView>
        <Card
            title='Test Card'>
            <Image 
              source = {require('../assets/img/addPhoto.jpg')}
              style={styles.addImage}
            />
            <TextInput
              style={{
                padding: 10,
                paddingTop: 50,
              }}
            />
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