import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';


function Separator() {
    return <View style={styles.separator} />;
  }
class AccountDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
   
  };
    render() {
      return (
        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}
        <SafeAreaView style={styles.container}>
      
        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'HESAP DETAYI'}</Text>
  
        

        <Separator/>
        <View style={{flexDirection:'row',width: '100%'}}>
        < TouchableOpacity style={{flexDirection:'row',alignItems:'center',width: '40%',marginRight:'10%'}} >   
       <Image 
            style={styles.stretch} source={require('./../MyImages/deleteAccount.png')}        />
          <Text style={{color:'white'}}>   Hesaba Para Yatır</Text>
      </TouchableOpacity>


      < TouchableOpacity style={{flexDirection:'row',alignItems:'center',width: '40%',marginLeft:'10%'}} > 
       <Image 
            style={styles.stretch} source={require('./../MyImages/deleteAccount.png')}        />
          <Text style={{color:'white'}}>   Hesabı Kapat</Text>
      </TouchableOpacity>
      </View>
      <Separator/>

      <ScrollView>
        <View style={[styles.parent]}>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>140123451-5001     5000.00 TL</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>140123451-5002     5000.00 TL</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>140123451-5003     5000.00 TL</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>140123451-5004     5000.00 TL</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>140123451-5005     5000.00 TL</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>140123451-5006     5000.00 TL</Text>
      </TouchableOpacity>
      
      
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

  export default AccountDetailScreen;