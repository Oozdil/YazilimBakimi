import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,Alert,TouchableOpacity  } from 'react-native';
import Constants from 'expo-constants';

function Separator() {
    return <View style={styles.separator} />;
  }


class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'MCBU Bank Cep Şubesi',
      headerTintColor:'white',
      headerStyle: {backgroundColor: '#17202A',} 
    };

   

   //  state = { username: '', password: '' };
    state = { username: '51475223166', password: '12345678' };

    Login = () => {
      var uname=this.state.username;
      var pword=this.state.password;
      // alert(uname+" "+pword);

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
           // alert(JSON.stringify(responseData));   
            var Customer=responseData['ResultObj'];         
            this.setState({username: '', password: '' });
            this.props.navigation.navigate('MainMenu',{Customer:Customer });
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
        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}
        <SafeAreaView style={styles.container}>
         
     <Separator/>
     <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Lütfen Giriş Yapınız '}</Text>
     <Separator/>
     <Text style={{fontSize:20}}>T.C. Kimlik Numaranız :</Text>
      <TextInput 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
        ref= {(el) => { this.username = el; }}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        maxLength={11}
        keyboardType={'numeric'}
        />
      <Text style={{fontSize:20}}>Şifreniz :</Text>  
      <TextInput secureTextEntry={true}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
        ref= {(el) => { this.password = el; }}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        maxLength={250}
        />
        <Separator/>
     

      <View style={[styles.parent]}>
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { this.Login(); }}
          >
          <Text style={{fontSize:25,color:'white'}}>GİRİŞ YAPIN</Text>
          </TouchableOpacity >
          
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#D5DBDB',borderColor: 'white', borderWidth: 3,} ]}
           onPress={() => this.props.navigation.navigate('Register')}
          >
          <Text style={{fontSize:25}}>ÜYE DEĞİLİM</Text>
          </TouchableOpacity >     
       </View>
    
   </SafeAreaView>     
  
  
       
        </ImageBackground>
      );
    }
  }
  const styles = StyleSheet.create({

    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 16,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop:25
    },
    parent: {
      width: '100%', 
      flexDirection: 'row', 
      flexWrap: 'wrap',
      marginTop:30
      
  },
  child: {
      width: '48%', 
      margin: '1%', 
      aspectRatio: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15,
      
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch'
  }
  });
  export default LoginScreen;

