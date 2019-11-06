import React from 'react';
import { View, TextInput, Image,Text,TouchableOpacity,Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from 'react-native-gesture-handler';


class Test extends React.Component {
  state={
    result:''
  }

  RefreshAccountMovements = () => {
   
  
    fetch('http://yazilimbakimi.pryazilim.com/api/InvoiceService/InvoiceAccountActionList/2', 
    {
      method: 'GET',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},     
     }).then((response) => response.json())
      .then((responseData) =>
       {
        this.setState({result:JSON.stringify(responseData)});
      })
      .catch((error) =>{
        alert(error);
      }) 
  
  }

  























  render() {
    return (
    
 
   
        <ScrollView ><View>
  

      <TouchableOpacity  style={{backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} }
      onPress={() => { this.RefreshAccountMovements() }}
      >
      <Text style={{fontSize:25,color:'white'}}>GİRİŞ YAPIN</Text>
      </TouchableOpacity >

     <Text>{this.state.result}</Text>
      </View>
       </ScrollView >
  
       
    );
  }
}
export default Test;