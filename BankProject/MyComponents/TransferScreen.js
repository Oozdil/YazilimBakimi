import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity,Picker } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';


function Separator() {
    return <View style={styles.separator} />;
  }
class TransferScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
   
  };
  state = {
    launguage: 'java',
  };
    render() {
      return (
        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}
        <SafeAreaView style={styles.container}>
      
        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'HAVALE (Başka Hesaba)'}</Text>
  
        

  <Separator/>
  <Text style={{color:'white'}}>Gönderen Hesap</Text>

  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
  <Picker
  selectedValue={this.state.language}
   onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
</View >
<Separator/>
  <Text style={{color:'white'}}>Alan Hesap</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:50}}>
  <TextInput   />
</View >
<Separator/>
  <Text style={{color:'white'}}>Tutar</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:50}}>
  <TextInput   />
  </View >
  <Separator/>
 <View style={[styles.parent]}>
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
      
          >
          <Text style={{fontSize:25,color:'white'}}>GÖNDER</Text>
          </TouchableOpacity >
             
       </View>


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
      aspectRatio: 3,
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

  export default TransferScreen;