import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,
  TextInput,Image,TouchableOpacity,Alert,Modal,TouchableHighlight } from 'react-native';

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

  GetAccounts = () => 
  {
    let board = [];
    let Customer=this.props.navigation.state.params.Customer;
    let CustomerId=Customer.CustomerId;

    fetch('http://yazilimbakimi.pryazilim.com/api/AccountService/GetAccountList/'+CustomerId, {
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
         let longAcc=Customer.CustomerNo+"-"+ responseData['ResultList'][i].AccountNo+"-"+responseData['ResultList'][i].AccountId;
         let shortAcc=Customer.CustomerNo+"-"+ responseData['ResultList'][i].AccountNo;
         board.push( 
         <TouchableOpacity style={[styles.child_acc, {backgroundColor: '#D5DBDB'} ]} 
         onPress={() => { this.GetAccountDetails(longAcc,shortAcc,Customer)}}
         >
         <Text>
        {shortAcc}   ==> ({ responseData['ResultList'][i].AccountBalance} TL)
         </Text>
         </TouchableOpacity>);      
        }
        this.props.navigation.navigate('MyAccounts',{board:board,Customer:Customer});
  
     
  })
  .catch((error) =>{
  alert(error);
  }) 
  }

  GetAccountDetails = (_longAccNo,_shortAccNo,_Customer) => 
  {   
    this.props.navigation.navigate('AccountDetail',
    {
     longAccNo:_longAccNo,
     shortAccNo:_shortAccNo,
     Customer:_Customer
   });    
  }
 
   






  
  DeleteAccountConfirmation = () => {
   
   


    Alert.alert(
      'DİKKAT HESAP SİLME',
      'Bu hesabı silmek istediğinize emin misiniz?',
      [
        
        {
          text: 'Vazgeç',          
          style: 'cancel',
        },
        {text: 'Evet',
         onPress: () => this.DeleteAccount()
        },
      ],
      {cancelable: false},
    );

     
  }
  DeleteAccount = () => {

    var CustomerId=this.props.navigation.state.params.Customer.CustomerId;
    var AccNo=this.props.navigation.state.params.longAccNo.split('-')[1];
    var AccId=this.props.navigation.state.params.longAccNo.split('-')[2];
   

    fetch('http://yazilimbakimi.pryazilim.com/api/AccountService/Close', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      } ,body: JSON.stringify({
        CustomerId :CustomerId,
        AccountId:AccId,
      })
  })
  
      .then((response) => response.json())
      .then((responseData) => {
        var success=responseData['Success']; 
        if(success)
        {
          alert("Hesabınız silinmiştir!");
          this.GetAccounts();
        }
        else{
          alert(responseData['Message']);
        }
        
  
     
  })
  .catch((error) =>{
  alert(error);
  }) 

  }

  
  PayInto = () => {    
    var Customer=this.props.navigation.state.params.Customer;
    var longAcc=this.props.navigation.state.params.longAccNo;   
    this.props.navigation.navigate('PayIntoAccount',{ Customer:Customer,longAccNo:longAcc });
  }



    render() {
      return (
       

        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}
        <SafeAreaView style={styles.container}>

      
        <Text style={{fontSize:20,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>HESAP DETAYI ({this.props.navigation.state.params.shortAccNo})</Text>
  
        

        <Separator/>
      
 

      <View style={{flexDirection:'row',width: '100%'}} >
        
        < TouchableOpacity style={{flexDirection:'row',alignItems:'center',width: '40%',marginRight:'10%'}} 
         onPress={() => {this.PayInto();}}
        >   
       <Image 
            style={styles.stretch} source={require('./../MyImages/deleteAccount.png')}        />
          <Text style={{color:'white'}}>   Hesaba Para Yatır</Text>
      </TouchableOpacity>


      < TouchableOpacity style={{flexDirection:'row',alignItems:'center',width: '40%',marginLeft:'10%'}}
        onPress={() => { this.DeleteAccountConfirmation(); }}
      > 
       <Image 
            style={styles.stretch} source={require('./../MyImages/deleteAccount.png')}        />
          <Text style={{color:'white'}}>   Hesabı Kapat</Text>
      </TouchableOpacity>
      </View>
      <Separator/>

      <ScrollView>
        <View style={[styles.parent]}>
      



      
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
  child2: {
    width: '47%', 
    marginLeft: '1%',
    marginRight: '1%', 
    marginBottom:'1%',
    aspectRatio: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
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
    resizeMode: 'stretch',
  
  }
  });

  export default AccountDetailScreen;