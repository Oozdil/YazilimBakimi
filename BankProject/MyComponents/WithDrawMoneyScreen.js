import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,Alert,TouchableOpacity  } from 'react-native';
import Constants from 'expo-constants';

function Separator() {
    return <View style={styles.separator} />;
  }


class PayIntoAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} 
  };

 
 
  constructor(props) {
    super(props);
    this.state={
      Balance:this.props.navigation.state.params.longAccNo.split('-')[3],
      Account:this.props.navigation.state.params.longAccNo.split('-')[0]+"-"+this.props.navigation.state.params.longAccNo.split('-')[1],
      _amount: '0' 
    }
  }

  PayIntoAccountConfirmation = () => {    

    var amount=this.state._amount;
    amount=parseFloat(amount);
    var balance=this.state.Balance;
    balance=parseFloat(balance);
    if(amount==0)
    {
      alert("Lütfen geçerli bir tutar giriniz");
      return;
    }
    if(amount>balance)
    {
      alert(amount+" TL çekmek için bakiyeniz yeterli değil");
      return;
    }



    Alert.alert(
     'PARA YATIRMA',
     'Hesabınızdan '+this.state._amount+' TL çekmek istediğinize emin misiniz?',
     [         
       {
         text: 'Vazgeç',          
         style: 'cancel',
       },
       {text: 'Evet', onPress: () => this.PayIntoAccount()},
     ],
     {cancelable: false},
   ); 
 }



  PayIntoAccount = () => {
    var amount=this.state._amount;
    var accountNo=this.props.navigation.state.params.longAccNo.split('-')[2];
    fetch('http://yazilimbakimi.pryazilim.com/api/AccountService/Deposit', 
    {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          AccountId : accountNo,
          Balance: "-"+amount,
      })
  })

      .then((response) => response.json())
      .then((responseData) =>
       {
        var success=responseData['Success']; 
         
        if(success)
        {
          Alert.alert('PARA BAŞARI İLE ÇEKİLDİ',"Hesabınızdana "+amount+" TL çektiniz.");
          this.GetAccounts();
        }
        else
        {
          var mesaj=responseData['Message']; 
          Alert.alert('PARA ÇEKİLEMEDİ',mesaj);
        }
             
     
      })
.catch((error) =>{
  alert(error);
}) 
  }

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
          let longAcc=Customer.CustomerNo+"-"+ responseData['ResultList'][i].AccountNo+"-"+responseData['ResultList'][i].AccountId+"-"+responseData['ResultList'][i].AccountBalance;
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
 
  OnChangeAmount(value) { 
  value=value.replace(',','.');
  if(value.length==2 && value[0]=='0' && value[1]!='.')
  value=value[1];


  if(value.split('.').length>2)
  {
    value=value.substring(0,value.length-1);     
  }

  if(value.split('.').length==2 && value.split('.')[1].length==3)
  value=value.substring(0,value.length-1);


  this.setState({_amount:value})
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

  render() {
    return (
      <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
      {/*Header*/}
      <SafeAreaView style={styles.container}>

        <View style={{alignItems:'center'}}>
      <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
  textShadowOffset: {width: -3, height: 3},
  textShadowRadius: 10}}>HESAPTAN PARA ÇEKME</Text>
<Separator/>
  <Text style={{fontSize:17,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
  textShadowOffset: {width: -3, height: 3},
  textShadowRadius: 10}}>HESAP NO : {this.state.Account} BAKİYE : {this.state.Balance} TL</Text>


   <Separator/>
   <Text style={{fontSize:18,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
  textShadowOffset: {width: -3, height: 3},
  textShadowRadius: 10}}>{'Çekmek İstediğiniz Tutarı Giriniz (TL) :'}</Text>
   <Separator/>
   </View>


    <TextInput 
      style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20,
      textAlign:'left',paddingLeft:15}}
      ref= {(el) => { this._amount = el; }}
      // onChangeText={(_amount) => this.setState({_amount})}
      onChangeText={value => this.OnChangeAmount(value)}
      value={this.state._amount}
      maxLength={15}
      keyboardType={'numeric'}
      />

      <Separator/>
   

    <View style={[styles.parent]}>
        <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
        onPress={() => { this.PayIntoAccountConfirmation(); }}
        >
        <Text style={{fontSize:25,color:'white'}}>PARA ÇEK</Text>
        </TouchableOpacity >
        
        <TouchableOpacity  style={[styles.child, {backgroundColor: '#D5DBDB',borderColor: 'white', borderWidth: 3,} ]}
         onPress={() => this.props.navigation.navigate('AccountDetail')}
        >
        <Text style={{fontSize:25}}>VAZGEÇ</Text>
        </TouchableOpacity >     
     </View>
     <Separator/>
     < TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:130}}
       onPress={() => this.Logout()} 
     >
     <Image 
          style={styles.stretch} source={require('./../MyImages/exit2.png')}  />
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
  export default PayIntoAccountScreen;

