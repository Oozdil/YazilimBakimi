import React from 'react';
import { View, TextInput, Image,Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from 'react-native-gesture-handler';


class Test extends React.Component {
  
  state = {data : []};
  componentWillMount()
    {
      var uname="51475223166";
      var pword="12345678";


      fetch('http://yazilimbakimi.pryazilim.com/api/customerservice/login', 
      {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          IdentityNo : uname,
            Password: pword,
        })
    })

        .then((response) => response.json())
        .then((responseData) =>
         {
          var success=responseData['Success']; 
          if(success)
          {
          
            this.setState({data : JSON.stringify(responseData)});
    
          }
          else
          {
            var mesaj=responseData['Message']; 
            Alert.alert('HATALI GİRİŞ',mesaj);
          }
               
       
        })
  .catch((error) =>{
    alert(error);
  }) 

















      
  }





  render() {
    return (
     <View><Text>Selam : {this.state.data}</Text></View>
    );
  }
}
export default Test;