import React from 'react';
import {StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import { HomeScreen } from './home';
import {AddReportScreen} from './addReport'
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
  },
  {
    initialRouteName: 'Home',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
      Home: AppNavigator,
      Search: AddReportScreen,
      User: AppNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        }else if (routeName === 'User') {
          iconName = `ios-contact`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    })
  });

export default createAppContainer(TabNavigator);

// export default class App extends React.Component {
//   render() {
//     return <RootStack />;
//   }
// }

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