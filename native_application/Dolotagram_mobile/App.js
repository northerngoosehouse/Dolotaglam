import React from 'react';
import {StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native';
import { HomeScreen } from './Screens/home';
import {AddReportScreen} from './Screens/addReport'
import {AddReportInfoScreen} from './Screens/addReportInfo'
import {ReportDetailScreen} from './Screens/reportDetail'
import { UserScreen } from './Screens/UserScreen';
import { SearchScreen } from './Screens/SearchScreen';
import { WelcomeUserInfoScreen } from './Screens/welcomeUserInfo';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator }from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


const setUserName = async (userName) => {
  try{
    await AsyncStorage.setItem('userName',userName);
  }catch(error){
    console.log(error);
  }
}

const getUserName = async() => {
  try{
      await AsyncStorage.getItem('userName')
        .then((values)=>{
        this.setState({userName:values});
        })
  }catch(error){
    console.log(error);
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation
        //ヘッダエリアに「＋」ボタンを設定
        return {
          headerTitle: 'Dolotagram',
          headerRight: 
          <TouchableOpacity onPress={() => navigate('AddReport')}>
            <Ionicons name="ios-add" style={{marginRight:10}} size={40}/>
          </TouchableOpacity>
        }
      }
    },  
    AddReport: {
      screen: AddReportScreen,
    },
    AddReportInfo:{
      screen: AddReportInfoScreen,
    },
    ReportDetail: {
      screen: ReportDetailScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    User: {
      screen: UserScreen,
    },
    WelcomeUserInfo:{
      screen: WelcomeUserInfoScreen
    },
  },
  {
    initialRouteName: "Home"
  }
);

const TabNavigator = createBottomTabNavigator(
  {
      Home: AppNavigator,
      Search: SearchScreen,
      User:UserScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        }else if (routeName === 'User') {
          iconName = `ios-contact`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    })
  });

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  constructor(props){
    super(props)
    //userName設定されているかチェック＝初回起動チェック（？）
    this.state={userName:""}
    getUserName();
    if(this.state.userName == ""){
      //とりあえずShiomy_shika
      setUserName('Shiomy_shika')
    }
  }
  render() {
    return (
      <AppContainer/>
    );
  }
}