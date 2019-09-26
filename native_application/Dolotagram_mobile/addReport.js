import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,Image} from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { Card } from 'react-native-elements'

export class AddReportScreen extends Component {
  render() {
    return (
      <View>
        <ScrollView>
        <Card
            title='Test Card'>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.image}
            />
            <Text style={{flexDirection:'row'}}>
              しおみぃ…
            </Text>
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
    image: {
      height: 300,
      resizeMode: 'contain'
    },
  });