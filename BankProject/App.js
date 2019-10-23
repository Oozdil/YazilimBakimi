import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';

//Ekranlar
import Test from './MyComponents/Test'
import LoginScreen from './MyComponents/LoginScreen'
import RegisterScreen from './MyComponents/RegisterScreen'
import MainMenuScreen from './MyComponents/MainMenuScreen'
import MyAccountsScreen from './MyComponents/MyAccountsScreen'
import AccountDetailScreen from './MyComponents/AccountDetailScreen'
import TransferSelfScreen from './MyComponents/TransferSelfScreen'
import TransferScreen from './MyComponents/TransferScreen'
import CreditPredictionScreen from './MyComponents/CreditPredictionScreen'
import BillScreen from './MyComponents/BillScreen'
import PayIntoAccountScreen from './MyComponents/PayIntoAccountScreen'
import PersonalDetailScreen from './MyComponents/PersonalDetailScreen'
import BillDetailScreen from './MyComponents/BillDetailScreen';
import WithDrawMoneyScreen from './MyComponents/WithDrawMoneyScreen'
//Ekranlar




const RootStack = createStackNavigator(
  {
    Test:Test,
    Login: LoginScreen,
    Register: RegisterScreen,
    MainMenu: MainMenuScreen,
    MyAccounts:MyAccountsScreen,
    AccountDetail:AccountDetailScreen,
    TransferSelf:TransferSelfScreen,
    Transfer:TransferScreen,
    CreditPrediction:CreditPredictionScreen,
    Bill:BillScreen,
    BillDetail:BillDetailScreen,
    PayIntoAccount:PayIntoAccountScreen,
    PersonalDetail:PersonalDetailScreen,
    WithDrawMoney:WithDrawMoneyScreen
  },
  {
    initialRouteName: 'Login',
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {
    
    return <AppContainer     />;
  }
}








