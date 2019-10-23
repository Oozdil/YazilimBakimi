import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,
  TextInput,Image,TouchableOpacity,Picker,CheckBox } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';


function Separator() {
    return <View style={styles.separator} />;
  }
class BillDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
   
  };
  state = {
    billType: 'java',
  };



    render() {
      return (
        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}
        <SafeAreaView style={styles.container}>
      
      <View style={{flex:2}}>
        <Text style={{fontSize:20,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Borç Detayı (Elektrik - 2548745)'}</Text>
  <Separator/>
  

  <ScrollView Syle={{flexGrow: 0.05}}>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB',flexDirection:'row'} ]}
        onPress={() => { this.GotoBillDetail()}} >      
      <Text>Haziran 2019 - Fat.No:1231456 Tutar : 132,15 TL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB',flexDirection:'row'} ]}
        onPress={() => { this.GotoBillDetail()}} >
       <Text>Temmuz 2019 - Fat.No:1231456 Tutar : 132,15 TL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB',flexDirection:'row'} ]}
        onPress={() => { this.GotoBillDetail()}} >
       <Text>Ağustos 2019 - Fat.No:1231456 Tutar : 132,15 TL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB',flexDirection:'row'} ]}
        onPress={() => { this.GotoBillDetail()}} >
       <Text>Eylül 2019 - Fat.No:1231456 Tutar : 132,15 TL</Text>
      </TouchableOpacity>
      </ScrollView>
      </View>
  <Separator/>
  <View style={{flex:3}}>
  <Text style={{fontSize:15,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Seçili Faturalar Toplamı : 135,54 TL'}</Text>
  <Separator/>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
  <Picker
  selectedValue={this.state.billType}
   onValueChange={(itemValue, itemIndex) =>
    this.setState({billType: itemValue})
  }>
  <Picker.Item label="1000002-1001  50 TL" value="java" />
  <Picker.Item label="1000002-1002  500 TL" value="java" />
  <Picker.Item label="1000002-1003  250 TL" value="java" />
</Picker>
</View >
<Separator/>

  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:30}}>

  <TextInput  placeholder='Aboneliklerime kaydet...'  placeholderTextColor="black" />
</View >
<TouchableOpacity  style={[styles.child, {marginTop:20,backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { alert("Borç Sorgulanıyor"); }}
          >
          <Text style={{fontSize:25,color:'white'}}>Borç Öde</Text>
          </TouchableOpacity >
<Separator/>
       < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} >
       <Image 
            style={styles.stretch} source={require('./../MyImages/exit2.png')}  />
            <Text style={{color:'white'}}>   Güvenli Çıkış</Text>
      </TouchableOpacity>


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
      flexWrap: 'wrap'
  },
  child: {
      width: '98%', 
      marginLeft: '1%',
      marginRight: '1%', 
      marginBottom:'1%',
      aspectRatio: 8,
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

  export default BillDetailScreen;