import React,{Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import {NavigationContainer} from "@react-navigation/native";
import { createAppContainer } from "react-navigation";
import Home from "./Widgets/Home";
import Splash from "./Widgets/Splash";
import Computer from "./Widgets/Computer";



export default class App extends Component {
  render(){
    return(
      <AppContainer/>
    )
  }
 
}
const Screens={
  Home:{
    Screen:Home,
    navigationOption:{
      title:"Play With Friends"
    }
  },
  Splash:{
    Screen:Splash,
    navigationOption:{
      title:"Play With Friends",
      
    }
  }
}
const Stack = createStackNavigator({
    'Splash' : Splash,
    'Home' :Home,
    'Computer':Computer,

},{
    defaultNavigationOptions:{
       headerShown: false,
      
    }
  },

);

const AppContainer = createAppContainer(Stack)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
