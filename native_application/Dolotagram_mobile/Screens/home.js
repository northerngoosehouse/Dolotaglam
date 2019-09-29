import React, {Component} from 'react'
import { StyleSheet, View, Text, SafeAreaView ,Image,TouchableOpacity,FlatList} from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import { Card } from 'react-native-elements'

export class HomeScreen extends Component {

  render() {
    return (
      <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={({ item }) => 
          <Item 
            userName={item.userName}
            userIconUrl={item.userIconUrl}
            idolName={item.idolName}
            imageUrl={item.imageUrl}
            registerDate={item.registerDate}
            reportData={item.reportData}
            reportSummary={item.reportSummary}
            props={this.props}
            />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    )
  }
}

function Item({ 
  userName,
  userIconUrl,
  idolName,
  imageUrl,
  registerDate,
  reportData,
  reportSummary,
  props}) {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('ReportDetail')}>
      <Card>
          <View style={styles.userInfo}>
          <Image 
            source = {{uri:userIconUrl}}
            style={styles.icon}
          />
          <Text style={styles.username}>
            {userName}
          </Text>
          </View>
          <View style={styles.repoInfo}>
          <Text style={styles.idolName}>
            vs {idolName}
          </Text>
          <Text style={styles.date}>
            {reportData}
          </Text>
          </View>
          <Image 
            source = {{uri:imageUrl}}
            style={styles.image}
          />
          <Text style={styles.repoSummary}>
            {reportSummary}
          </Text>
      </Card>
    </TouchableOpacity>
  );
}

const DATA = [
  {
    id: '1',
    userName: '塩見きらいに飼われたい僕',
    userIconUrl:'https://pbs.twimg.com/profile_images/1173948373788790784/qlM4dnNj_400x400.jpg',
    idolName: '塩見きら',
    registerDate:'2019/9/28',
    reportData:'2019/9/24',
    imageUrl:'https://pbs.twimg.com/media/EFT6jOmU4AA7sIl?format=jpg',
    reportSummary:'しおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしお...',
    report:'しおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃしおみぃ！！！！！！！！！！！！！.'
  },
  {
    id: '2',
    userName: 'りんちゃんしか',
    userIconUrl:'https://pbs.twimg.com/profile_images/1168021839836147712/hC4sqxDF_400x400.jpg',
    idolName: '来栖りん',
    registerDate:'2019/9/26',
    reportData:'2019/9/10',
    imageUrl:'https://pbs.twimg.com/media/EFXf3X9U0AAzE91?format=jpg',
    reportSummary:'来栖りん',
    report:'来栖りん！！！！！！！！！！.'
  
  },
  {
    id: '3',
    userName: 'やす',
    userIconUrl:'https://pbs.twimg.com/profile_images/952202077777752065/pL4fKMwB_400x400.jpg',
    idolName: '塩見きら',
    registerDate:'2019/9/21',
    reportData:'2019/9/21',
    imageUrl:'https://pbs.twimg.com/media/EFKbznkU0AARx6b?format=jpg',
    reportSummary:'「可愛すぎて引いてるぅ」',
    report:'しおみぃ…'
  },
];


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
