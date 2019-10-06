import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';

//Ekranlar
import LoginScreen from './MyComponents/LoginScreen'
import RegisterScreen from './MyComponents/RegisterScreen'
import MainMenuScreen from './MyComponents/MainMenuScreen'
import MyAccountsScreen from './MyComponents/MyAccountsScreen'
import AccountDetailScreen from './MyComponents/AccountDetailScreen'
import TransferSelfScreen from './MyComponents/TransferSelfScreen'
import TransferScreen from './MyComponents/TransferScreen'
import CreditPredictionScreen from './MyComponents/CreditPredictionScreen'
//Ekranlar




const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    MainMenu: MainMenuScreen,
    MyAccounts:MyAccountsScreen,
    AccountDetail:AccountDetailScreen,
    TransferSelf:TransferSelfScreen,
    Transfer:TransferScreen,
    CreditPrediction:CreditPredictionScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  
  render() {
    
    return <AppContainer />;
  }
}








