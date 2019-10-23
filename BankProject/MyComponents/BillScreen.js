import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity,Picker } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';


function Separator() {
    return <View style={styles.separator} />;
  }
class BillScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
   
  };
  state = {
    billType: 'java',
  };
  GotoBillDetail=()=>{

    this.props.navigation.navigate('BillDetail');
  }
    render() {
      return (
        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}
        <SafeAreaView style={styles.container}>
      
      <View style={{flex:2}}>
        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Kayıtlı Faturalarım'}</Text>
  <Separator/>
  

      <ScrollView Style={{flexGrow: 0.05}}>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]}
        onPress={() => { this.GotoBillDetail()}} >
      <Text>Elektrik - 2548745 - İşyeri Elektriğim</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>SU- 4561238</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>Telefon- 2324561231</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} >
      <Text>Elektrik - 2548745 - Ev Elektriğim</Text>
      </TouchableOpacity>
      </ScrollView>
      </View>
  <Separator/>
  <View style={{flex:3}}>
  <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Fatura No İle Ödeme'}</Text>
  <Separator/>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
  <Picker
  selectedValue={this.state.billType}
   onValueChange={(itemValue, itemIndex) =>
    this.setState({billType: itemValue})
  }>
  <Picker.Item label="Elektrik" value="java" />
  <Picker.Item label="Su" value="js" />
  <Picker.Item label="Telefon" value="js" />
</Picker>
</View >
<Text style={{color:'white'}}>Abone / Sözleşme No</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:30}}>
  <TextInput   />
</View >
<TouchableOpacity  style={[styles.child, {marginTop:20,backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { alert("Borç Sorgulanıyor"); }}
          >
          <Text style={{fontSize:25,color:'white'}}>Borç Sorgula - Öde</Text>
          </TouchableOpacity >
<Separator/>
       < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} >
       <Image 
            style={styles.stretch} source={require('./../MyImages/exit2.png')}        />
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
      width: '90%', 
      marginLeft: '5%',
      marginRight: '5%', 
      marginBottom:'1%',
      aspectRatio: 7,
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

  export default BillScreen;