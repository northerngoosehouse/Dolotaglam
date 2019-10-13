import React, {Component} from 'react'
import { StyleSheet, View, Text, SafeAreaView ,Image,TouchableOpacity,FlatList,RefreshControl} from 'react-native'
import { Card } from 'react-native-elements'
import { AsyncStorage } from "react-native"

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.getUserName = this.getUserName.bind(this);
    this.getCard = this.getCard.bind(this);
    this.initialList = this.initialList.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state={
        serName:"",
        cardListJSON:[],
        refreshing:false
        }
    this.initialList()
  }

  componentWillMount = () =>{
    this.initialList()
  }

  initialList = async() => {
    await this.getUserName()
    await this.getCard(this.state.userName)
  }

  onRefresh = async() => {
    console.log('onRefresh')
    this.setState({refreshing:true})
    await this.getCard(this.state.userName)
    .then(()=>{
      this.setState({refreshing:false})
  });
  }

  getUserName = async() => {
    await AsyncStorage.getItem('userName')
      .then((values)=>{
        this.setState({userName:values})
    });
  }

  getCard = async(userName) => {
    const JsonRpcBody =  JSON.stringify({
      "jsonrpc": "2.0", 
      "method": "K.GetAllCard", 
      "params": {"user_id":userName}, 
      "id": "1"
    })
    this.setState({loading:true})
    await fetch('https://m-dot-dolotagram-254717.appspot.com/jrpc', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JsonRpcBody
      }).then(response => {
          return response.json();
        }).then(jsonData => {
          this.setState({cardListJSON:jsonData.result.cards})
          this.setState({loading:false})
      }).catch(error => {
      console.log(error)
      this.setState({loading:false})
      })
    }

  render() {
    return (
      <SafeAreaView>
      <FlatList
        data={this.state.cardListJSON.reverse()}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} />
        }
        renderItem={({ item }) => 
          <Item 
            user_id={item.user_id}
            userIconUrl=""
            idolName=""
            cheki_url={item.cheki_url}
            created_at={item.created_at}
            event_date={item.event_date}
            report={item.report}
            props={this.props}
            />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    )
  }
}

function Item({ 
  user_id,
  userIconUrl,
  idolName,
  cheki_url,
  event_date,
  report,
  props}) {
  //レポからリストに表示するサマリを作成
  const reportSummary = (report.length > 30 ) ? String(report).slice(0,30) : report
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('ReportDetail')}>
      <Card>
          <View style={styles.userInfo}>
          <Image 
            source = {{uri:userIconUrl}}
            style={styles.icon}
          />
          <Text style={styles.username}>
            {user_id}
          </Text>
          </View>
          <View style={styles.repoInfo}>
          <Text style={styles.idolName}>
            vs {idolName}
          </Text>
          <Text style={styles.date}>
            {event_date}
          </Text>
          </View>
          <Image 
            source = {{uri:cheki_url}}
            style={styles.image}
          />
          <Text style={styles.repoSummary}>
            {reportSummary}
          </Text>
      </Card>
    </TouchableOpacity>
  );
}

//とりあえず仮データ
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
