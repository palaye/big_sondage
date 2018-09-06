import React from 'react';

import {
   createBottomTabNavigator,
   createStackNavigator,
   TabBarBottom,
   createSwitchNavigator,
   withNavigation} from 'react-navigation'

import {MaterialIcons,FontAwesome,Ionicons } from '@expo/vector-icons';
import backIcon from 'react-navigation/src/views/assets/back-icon.png'

import Home from '../screens/Home';
import Login from '../screens/Login';
import History from '../screens/History';
import Profile from '../screens/Profile';
import MoreOptions from '../screens/MoreOptions';
import CommentResponses from '../screens/CommentResponses';

import { Text,View,TouchableOpacity,Platform} from 'react-native';

const iconSize = 28;

const AppHeader = {  
  containerStyle : {
   backgroundColor:"#008975",
  },
  tintColor:"#ffff",
  titleStyle:{
    fontWeight:'bold',
    color:'#ffff'
  }
}


const BackBtnIOS = (props) => {
  return (
      <View style={{flexDirection:'row',alignItems:'center',marginLeft:8}} >
        <Ionicons style={{padding:4}} name="ios-arrow-back" size={iconSize} color={AppHeader.titleStyle.color} />
        <Text style={{color:AppHeader.titleStyle.color}}>Back</Text>
      </View> 
  )
}

const BackBtnAndroid = (props) => {
  return (
      <View style={{marginLeft:24}} >
        <Ionicons style={{padding:4}} name="md-arrow-back" size={iconSize} color={AppHeader.titleStyle.color} />
      </View> 
  )
}


const BackBtn = ({navigation}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.goBack(null)}>
      {Platform.OS === 'ios'?<BackBtnIOS/>:<BackBtnAndroid/>}
    </TouchableOpacity>
  );
}

const BackBtnWithNav= withNavigation(BackBtn);

const AfterHomeStack = createStackNavigator(
{
  CommentResponses: {
    screen:  CommentResponses,
    navigationOptions: {
      title: 'Commentaires',
      headerLeft:<BackBtnWithNav/>
    }
  },
},
{
  navigationOptions: {
    headerStyle : AppHeader.containerStyle,
    headerTintColor: AppHeader.tintColor,
    headerTitleStyle: AppHeader.titleStyle,
  }
});

const AfterHistoryStack = createStackNavigator(
{
  SondageHome: {
    screen:  Home,
    navigationOptions: {
      title: 'Sondage',
      headerLeft:<BackBtnWithNav/>
    }
  },
  CommentResponses: {
    screen:  CommentResponses,
    navigationOptions: {
      title: 'Commentaires',
      headerLeft:<BackBtnWithNav/>
    }
  },
},
{
  navigationOptions: {
    headerStyle : AppHeader.containerStyle,
    headerTintColor: AppHeader.tintColor,
    headerTitleStyle: AppHeader.titleStyle,
  }
});


const AfterTabSwitch = createSwitchNavigator(
{
  AfterHome: {
    screen: AfterHomeStack,
  },
  AfterHistory: {
    screen:  AfterHistoryStack,
  },
},
{

});


const Tabs = createBottomTabNavigator(
{
  HomeTab: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Accueil',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="home" size={iconSize} color={tintColor} />,
    },
  },
  HistoryTab: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'Sondages',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="history" size={iconSize} color={tintColor} />
    },
  },
  MyProfileTab: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Mon Profil',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="user-circle" size={iconSize} color={tintColor} />
    },
  },
  MoreOptionsTab: {
    screen: MoreOptions,
    navigationOptions: {
      tabBarLabel: "Plus d'options",
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="list" size={iconSize} color={tintColor} />
    },
  }
},
{ 
 // tabBarComponent: TabBarBottom,
 // tabBarPosition: 'bottom',
  tabBarOptions:{
     activeTintColor : "#263238", //#1B5E20
     inactiveTintColor: "rgba(238,238,238,0.77)",
     labelStyle:{
       fontWeight:"bold",
     },
     style:{
       backgroundColor:AppHeader.containerStyle.backgroundColor
     }
  }
});



export const Root = createStackNavigator(
{
  Login: {
    screen: Login,
  },
  Tabs: {
    screen: Tabs,
  },
  AfterTabs: {
    screen: AfterTabSwitch,
  },
}, 
{
  mode: 'modal',
  headerMode: 'none',
});
