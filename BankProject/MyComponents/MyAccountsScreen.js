import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity,Alert } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';


function Separator() {
    return <View style={styles.separator} />;
  }
class MyAccountsScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
   
  };

  CreateAccountConfirmation = () => {

    Alert.alert(
      'YENİ HESAP',
      'Yeni bir hesap açmak istediğinize emin misiniz?',
      [
        
        {
          text: 'Vazgeç',          
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => this.CreateAccount()},
      ],
      {cancelable: false},
    );

   
  }
  CreateAccount = () => {
    fetch('http://yazilimbakimi.pryazilim.com/api/AccountService/Create', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      } ,body: JSON.stringify({
        CustomerId : this.props.navigation.state.params.CustomerNo,
        Balance: '0',
      })
  })
  
      .then((response) => response.json())
      .then((responseData) => {
        var success=responseData['Success']; 
        if(success)
        {
          alert("Hesabınız oluşturulmuştur!");
          this.props.navigation.navigate('MyAccounts');
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
      
        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'HESAPLARIM'}</Text>
  
        

        <Separator/>
        < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
        onPress={() => { this.CreateAccountConfirmation(); }}
        >   
       <Image 
            style={styles.stretch} source={require('./../MyImages/newAccount.png')}        />
          <Text style={{color:'white'}}>   Yeni Hesap Ekle</Text>
      </TouchableOpacity>
      <Separator/>

      <ScrollView>
        <View style={[styles.parent]}>
      

     {this.props.navigation.state.params.board}
     
      
      
  </View>
  </ScrollView>
  <Separator/>
       < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} >
       <Image 
            style={styles.stretch} source={require('./../MyImages/exit2.png')}        />
            <Text style={{color:'white'}}>   Güvenli Çıkış</Text>
      </TouchableOpacity>
  
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
      flexWrap: 'wrap'
  },
  child: {
      width: '90%', 
      marginLeft: '5%',
      marginRight: '5%', 
      marginBottom:'1%',
      aspectRatio: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:10,
      backgroundColor: '#D5DBDB',
      borderColor: '#2C3E50', borderWidth: 3,
  },
  stretch: {
    width: 25,
    height: 25,
    resizeMode: 'stretch',
  
  }
  });

  export default MyAccountsScreen;