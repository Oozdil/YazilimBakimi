import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';


function Separator() {
    return <View style={styles.separator} />;
  }
  

class CreditPredictionScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} 
  };

  state = { TCKN: '', name: '',sname: '',email: '',password: '',passwordRep: '' };

  Register = () => {
      
    var _TCKN=this.state.TCKN;
    var _name=this.state.name;
    var _sname=this.state.sname;
    var _email=this.state.email;
    var _password=this.state.password;
    var _passwordRep=this.state.passwordRep;
   
   alert("Kayı yapılıyor : "+_TCKN+" "+_name+" "+_sname+" "+_email+" "+_password+" "+_passwordRep);
   this.props.navigation.navigate('Login');
    
   }


    render() {
      return (
        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}
        <SafeAreaView style={styles.container}>   
     <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Kredi Tahmin Robotu'}</Text>
     <Separator/>



      <Text style={{fontSize:15}}>T.C. Kimlik Numaranız</Text>
      <TextInput 
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.TCKN = el; }}
       onChangeText={(TCKN) => this.setState({TCKN})}
       value={this.state.TCKN}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white' }}/>


     <Text style={{fontSize:15}}>Adınız</Text>
     <TextInput 
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.name = el; }}
       onChangeText={(name) => this.setState({name})}
       value={this.state.name}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white' }}/>


     <Text style={{fontSize:15}}>Soyadınız</Text>
     <TextInput 
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.sname = el; }}
       onChangeText={(sname) => this.setState({sname})}
       value={this.state.sname}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white' }}/>


  
        
     <Text style={{fontSize:15}}>Email Adresiniz</Text>
     <TextInput 
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.email = el; }}
       onChangeText={(email) => this.setState({email})}
       value={this.state.email}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white' }}/>





      <Text style={{fontSize:15}}>Şifreniz</Text>  
      <TextInput secureTextEntry={true}
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.password = el; }}
       onChangeText={(password) => this.setState({password})}
       value={this.state.password}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white' }}/>

      <Text style={{fontSize:15}}>Şifreniz Tekrar</Text>  
      <TextInput secureTextEntry={true}
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.passwordRep = el; }}
       onChangeText={(passwordRep) => this.setState({passwordRep})}
       value={this.state.passwordRep}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white' }}/>


        <Separator/>
      
  

      <View style={[styles.parent]}>
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { this.Register(); }}
          >
          <Text style={{fontSize:25,color:'white'}}>KAYIT OL</Text>
          </TouchableOpacity >         
         
       </View>


   </SafeAreaView>     
  
  
       
        </ImageBackground>
      );
    }
  };



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
      flexWrap: 'wrap'
  },
  child: {
      width: '98%', 
      margin: '1%', 
      aspectRatio: 7,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch'
  }
  });

  export default CreditPredictionScreen;