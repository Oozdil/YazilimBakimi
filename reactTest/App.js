import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

export default function App() {


  Login = () => {
      
    fetch('http://yazilimbakimi.pryazilim.com/api/customerservice/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              IdentityNo : '51475223166',
                Password: '12345678',
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
                alert( JSON.stringify(responseData))

           
      })
      .catch((error) =>{
        alert(error);
      }) 

    
   }

   Register = () => {
      
    fetch('http://yazilimbakimi.pryazilim.com/api/customerservice/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IdentityNo : '51475223166',              
                Name :'Orçun',
                Surname: 'Özdil',
                Email : 'cbu@cbudeneme.com',
                Password : '12345678',
                RePassword: '12345678'
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
                alert( JSON.stringify(responseData))

           
      })
      .catch((error) =>{
        alert(error);
      }) 

    
   }




  
  return (
    <View style={styles.container}>
       <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { this.Login(); }}
          >
          <Text style={{fontSize:25,color:'white'}}>GİRİŞ YAPIN</Text>
          </TouchableOpacity >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
