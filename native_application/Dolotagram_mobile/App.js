import React from 'react';
import {StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import { HomeScreen } from './Screens/home';
import {AddReportScreen} from './Screens/addReport'
import {ReportDetailScreen} from './Screens/reportDetail'
import { UserScreen } from './Screens/UserScreen';
import { SearchScreen } from './Screens/SearchScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator }from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation
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
    ReportDetail: {
      screen: ReportDetailScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    User: {
      screen: UserScreen,
    },
  },
  {
    initialRouteName: 'Home'
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

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  addButton:{
    height:30,
    width:30,
    borderRadius:15,
    backgroundColor: 'white',
    color:'black',
    marginRight:10
  },
});