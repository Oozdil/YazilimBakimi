import React from 'react';
import { View, TextInput, Image,Text,TouchableOpacity,Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from 'react-native-gesture-handler';


class Test extends React.Component {
  



  state={
    fullname:"",
    totalBalance:""
  }


  RefreshCustomer = () => {
    fetch('http://yazilimbakimi.pryazilim.com/api/CustomerService/GetCustomerDetailByNo/'+"1000002", 
    {
      method: 'GET',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},     
     }).then((response) => response.json())
      .then((responseData) =>
       {
         var fname=responseData['ResultObj'].Name+" "+responseData['ResultObj'].Surname;
         var tbalance=responseData['ResultObj'].TotalBalance;
         this.setState({fullname:fname,totalBalance:tbalance});          
      })
      .catch((error) =>{
        alert(error);
      }) 
  }

  render() {
    return (
      <View>
      <TouchableOpacity  style={{backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} }
      onPress={() => { this.RefreshCustomer() }}
      >
      <Text style={{fontSize:25,color:'white'}}>GİRİŞ YAPIN</Text>
      </TouchableOpacity >

      <Text>{this.state.fullname} {this.state.totalBalance}</Text>
      </View>
    );
  }
}
export default Test;