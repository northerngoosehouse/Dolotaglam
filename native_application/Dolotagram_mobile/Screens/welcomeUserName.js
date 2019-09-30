import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,TextInput, InputAccessoryView,Image} from 'react-native'
import { Card } from 'react-native-elements'

export class UserScreen extends Component {
  render() {
    return (
      <View keyboardDismissMode="interactive">
        <ScrollView>
        <Card
            title='WelcomeUserName'>
        </Card>
        <View style={styles.nextButton}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddReportInfo')}>
            <Ionicons name="ios-arrow-round-forward" size={40}/>
        </TouchableOpacity>
        </View>
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
    nextButton:{
      marginTop:20,
      marginRight:20,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  });