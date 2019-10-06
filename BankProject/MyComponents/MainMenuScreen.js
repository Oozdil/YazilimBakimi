import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';


function Separator() {
    return <View style={styles.separator} />;
  }
class MainMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
    headerLeft:null
  };
    render() {
      return (
        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}
        <SafeAreaView style={styles.container}>
       

       <Text style={{color:'white',fontSize:18}}>Hoşgeldiniz : {this.props.navigation.state.params.welcome}</Text>
       <Separator/>

        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'İşlemler Menüsü'}</Text>
        <Separator/>
        <View style={[styles.parent]}>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>Varlıklarım</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} 
      onPress={() => this.props.navigation.navigate('MyAccounts')}
      
      >
       <Text>Hesap İşlemlerim</Text>
      </TouchableOpacity>
   
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} 
        onPress={() => this.props.navigation.navigate('TransferSelf')}
      >
       <Text>Virman</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]}
      onPress={() => this.props.navigation.navigate('Transfer')} >
       <Text>Havale</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
       <Text>Fatura Ödeme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} 
         onPress={() => this.props.navigation.navigate('CreditPrediction')} 
         >
       <Text>Kredi Tahminim</Text>
       </TouchableOpacity>
  </View>
  <Separator/>
       < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} >
       <Image 
            style={styles.stretch} source={require('./../MyImages/exit2.png')}        />
            <Text style={{color:'white'}}> Güvenli Çıkış</Text>
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
      width: '48%', 
      margin: '1%', 
      aspectRatio: 1.50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15,
      backgroundColor: '#D5DBDB',
      borderColor: '#2C3E50', borderWidth: 3,
  },
  stretch: {
    width: 25,
    height: 25,
    resizeMode: 'stretch'
  }
  });

  export default MainMenuScreen;