import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView ,Image} from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { Card } from 'react-native-elements'

export class HomeScreen extends Component {
  render() {
    return (
      <View>
        <ScrollView>
        <Card>
            <View style={styles.userInfo}>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.icon}
            />
            <Text style={styles.username}>
              塩見きらに飼われたい僕
            </Text>
            </View>
            <View style={styles.repoInfo}>
            <Text style={styles.idolName}>
              vs 塩見きら
            </Text>
            <Text style={styles.date}>
              2019/9/29
            </Text>
            </View>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.image}
            />
            <Text style={styles.repoSummary}>
              しおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしお...
            </Text>
        </Card>
        <Card>
            <View style={styles.userInfo}>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.icon}
            />
            <Text style={styles.username}>
              塩見きらに飼われたい僕
            </Text>
            </View>
            <View style={styles.repoInfo}>
            <Text style={styles.idolName}>
              vs 塩見きら
            </Text>
            <Text style={styles.date}>
              2019/9/29
            </Text>
            </View>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.image}
            />
            <Text style={styles.repoSummary}>
              しおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしお...
            </Text>
        </Card>
        <Card>
            <View style={styles.userInfo}>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.icon}
            />
            <Text style={styles.username}>
              塩見きらに飼われたい僕
            </Text>
            </View>
            <View style={styles.repoInfo}>
            <Text style={styles.idolName}>
              vs 塩見きら
            </Text>
            <Text style={styles.date}>
              2019/9/29
            </Text>
            </View>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.image}
            />
            <Text style={styles.repoSummary}>
              しおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしお...
            </Text>
        </Card>
        <Card>
            <View style={styles.userInfo}>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.icon}
            />
            <Text style={styles.username}>
              塩見きらに飼われたい僕
            </Text>
            </View>
            <View style={styles.repoInfo}>
            <Text style={styles.idolName}>
              vs 塩見きら
            </Text>
            <Text style={styles.date}>
              2019/9/29
            </Text>
            </View>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.image}
            />
            <Text style={styles.repoSummary}>
              しおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしお...
            </Text>
        </Card>
        <Card>
            <View style={styles.userInfo}>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.icon}
            />
            <Text style={styles.username}>
              塩見きらに飼われたい僕
            </Text>
            </View>
            <View style={styles.repoInfo}>
            <Text style={styles.idolName}>
              vs 塩見きら
            </Text>
            <Text style={styles.date}>
              2019/9/29
            </Text>
            </View>
            <Image 
              source = {{uri:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg'}}
              style={styles.image}
            />
            <Text style={styles.repoSummary}>
              しおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしお...
            </Text>
        </Card>
        </ScrollView>
      </View>
    )
  }
}


  const styles = StyleSheet.create({
    userInfo:{
      height:40,
      flexDirection: 'row',
      borderBottomWidth:1,
      borderBottomColor:'#c0c0c0',
      alignItems: 'center',
    },
    icon:{
      width:36,
      height:36,
      borderRadius:18,
      marginBottom:5  
    },
    username:{
      marginLeft:10,
      alignItems:'center',
      fontWeight:"bold"
    },
    repoInfo:{
      marginTop:5,
      flexDirection: 'row',
      textAlign:"right",
      marginBottom:5,
      justifyContent:'flex-end'
    },
    idolName:{
      textAlign:"right"
    },
    date:{
      textAlign:"right",
      marginLeft:10
    },
    card: {
      flex:1,
      height: 500,
    },
    repoSummary:{
      marginTop:10
    },
    image: {
      height: 300,
      resizeMode: 'contain'
    },
  });

  const actions = [
    {
      text: "Accessibility",
      name: "bt_accessibility",
      position: 2
    },
    {
      text: "Language",
      name: "bt_language",
      position: 1
    },
    {
      text: "Location",
      name: "bt_room",
      position: 3
    },
    {
      text: "Video",
      name: "bt_videocam",
      position: 4
    }
  ];