import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity,Alert } from 'react-native';

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
  constructor(props) {
    super(props);

  }
  Logout = () => {

    Alert.alert(
      'ÇIKIŞ İŞLEMİ',
      'Bankacılık Uygulamasından çıkmak emin misiniz?',
      [
        
        {
          text: 'Vazgeç',          
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => this.props.navigation.navigate('Login',{username:'',password:''})},
      ],
      {cancelable: false},
    );
  }




 
  GetAccountDetails = (_longAccNo,_shortAccNo) => {


 this.props.navigation.navigate('AccountDetail',{longAccNo:_longAccNo,shortAccNo:_shortAccNo,
  CustomerNo:this.props.navigation.state.params.CustomerNo});

  
  }


  GetAccounts = () => {
    let board = []
    let cNo=this.props.navigation.state.params.CustomerNo;

    fetch('http://yazilimbakimi.pryazilim.com/api/AccountService/GetAccountList/'+cNo, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  })
  
      .then((response) => response.json())
      .then((responseData) => {
        var accListCount=responseData['ResultList'].length;
     
        for(var i=0;i<accListCount;i++)
        {
         let longAcc=cNo+"-"+ responseData['ResultList'][i].AccountNo+"-"+responseData['ResultList'][i].AccountId;
         let shortAcc=cNo+"-"+ responseData['ResultList'][i].AccountNo;
         board.push( 
         <TouchableOpacity style={[styles.child_acc, {backgroundColor: '#D5DBDB'} ]} 
         onPress={() => { this.GetAccountDetails(longAcc,shortAcc)}}
         >
         <Text>
        {shortAcc}   ==> ({ responseData['ResultList'][i].AccountBalance} TL)
         </Text>
         </TouchableOpacity>);      
        }
        this.props.navigation.navigate('MyAccounts',{board:board,CustomerNo:cNo});
  
     
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
       

       <Text style={{color:'white',fontSize:18}}>Sayın : 
       {this.props.navigation.state.params.Name} {this.props.navigation.state.params.Surname} {this.props.navigation.state.params.CustomerNo}
       </Text>
       <Separator/>

        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'İşlemler Menüsü'}</Text>
        <Separator/>
        <View style={[styles.parent]}>
   
        <Text style={{color:'white',fontSize:18}}>Varlıklarım : {this.props.navigation.state.params.TotalBalance} TL
       </Text>
      <TouchableOpacity style={[styles.child_2, {backgroundColor: '#D5DBDB'} ]} 
      
      onPress={() => { this.GetAccounts(); }}
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
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]}
        onPress={() => this.props.navigation.navigate('Bill')}
      >
       <Text>Fatura Ödeme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} 
         onPress={() => this.props.navigation.navigate('CreditPrediction')} 
         >
       <Text>Kredi Tahminim</Text>
       </TouchableOpacity>
  </View>
  <Separator/>
       < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
         onPress={() => this.Logout()} 
       >
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
  child_2: {
    width: '98%', 
    margin: '1%', 
    aspectRatio: 3.50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
    backgroundColor: '#D5DBDB',
    borderColor: '#2C3E50', borderWidth: 3,
},
child_acc: {
  width: '98%', 
  margin: '1%', 
  aspectRatio: 5,
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