import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,
  TextInput,Image,TouchableOpacity,Picker,Alert } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Separator() {
    return <View style={styles.separator} />;
  }
class TransferSelfScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
   
  };

  constructor(props) {
    super(props);
 this.state={
   outGoingAccount:'',
   inCommingAccount:'',
   _amount: '0' ,
   explanation:'Virman...'
 }

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

 AccountSelectionChanged=()=>
 {
  
  // alert("sdfsdf");
 }
 


 TransferMoneyValidations=()=>
 {
  var amount=this.state._amount;
  amount=parseFloat(amount);
  var outgoingacc="";
  var incommingacc="";


try
{
   outgoingacc=this.state.outGoingAccount.split('-')[0];
   incommingacc=this.state.inCommingAccount.split('-')[0];
}
catch
{

}
if(outgoingacc=="" || incommingacc=="")
{
  alert("Lütfen hesap seçiniz");
  return;
}


  if(outgoingacc==incommingacc)
  {
    alert("Aynı hesaba virman yapamazsınız!");
    return;
  }
  if(amount==0)
  {
    alert("Lütfen Virman Tutarı Giriniz!");
    return;
  }
  var availableBalance=this.state.outGoingAccount.split('-')[1];
  availableBalance=parseFloat(availableBalance);
  if(amount>availableBalance)
  {
    alert("Bakiyeniz bu işlem için yeterli değil");
    return;
  }
 

  var explanation=this.state.explanation;
  Alert.alert(
    'VİRMAN İŞLEMİ',
     amount+' TL tutarında virman yapmak istediğinize emin misiniz?',
    [
      
      {
        text: 'Vazgeç',          
        style: 'cancel',
      },
      {text: 'Evet', onPress: () => this.TransferMoney(outgoingacc,incommingacc,amount,explanation)},
    ],
    {cancelable: false},
  ); 

 
 }
 
 TransferMoney=(_outgoingacc,_incommingacc,_amount,_explanation)=>
 {
  
    var Customer=this.props.navigation.state.params.Customer;
    var CustomerId=Customer.CustomerId;
   // alert(_outgoingacc+_incommingacc+_amount+_explanation+CustomerId);
    fetch('http://yazilimbakimi.pryazilim.com/api/TransferService/eft', 
    {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          CustomerId:CustomerId,
          OwnerAccountId:_outgoingacc,
          TargetAccountId:_incommingacc,
          TotalAmount:_amount,
          Description:_explanation
      })
  })

      .then((response) => response.json())
      .then((responseData) =>
       {
        var success=responseData['Success']; 
         
        if(success)
        {
          Alert.alert('VİRMAN BAŞARI İLE YAPILDI',"Hesabınıza "+_amount+" TL virman yaptınız.");
          this.props.navigation.navigate('MainMenu',{Customer:Customer });
        }
        else
        {
          var mesaj=responseData['Message']; 
          Alert.alert('VİRMAN YAPILAMADI',mesaj);
        }
             
     
      })
.catch((error) =>{
  alert(error);
}) 
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
        <KeyboardAwareScrollView enableOnAndroid={true}     
      resetScrollToCoords={{ x: 0, y: 0 }}  
      scrollEnabled={false}
      extraScrollHeight={100}
    >
        <ScrollView >
        <SafeAreaView style={styles.container}>
      
        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'VİRMAN (Hesaplarım Arası)'}</Text>
  
        

  <Separator/>
  <Text style={{color:'white'}}>Gönderen Hesap</Text>

  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
  <Picker
  selectedValue={this.state.outGoingAccount}
  // onValueChange={(itemValue, itemIndex) => this.setState({outGoingAccount: itemValue})}
  onValueChange={
    (itemValue, itemIndex) => this.setState({outGoingAccount: itemValue})

  }
   
   >
 
 
 
 
  {this.props.navigation.state.params.outgoingBoard}
</Picker>
</View >

  <Text style={{color:'white'}}>Alan Hesap</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
  <Picker
  selectedValue={this.state.inCommingAccount}
   onValueChange={(itemValue, itemIndex) => this.setState({inCommingAccount: itemValue})}>
   {this.props.navigation.state.params.inCommingBoard}
</Picker>
</View >

  <Text style={{color:'white'}}>Tutar</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:40}}>
  <TextInput 
        style={{ height: 40, fontSize:20,
        textAlign:'left' }}
        ref= {(el) => { this._amount = el; }}     
        onChangeText={value => this.OnChangeAmount(value)}
        value={this.state._amount}
        maxLength={15}
        keyboardType={'numeric'}
        />
  </View >
 
  <Text style={{color:'white'}}>Açıklama</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:80}}>
  <TextInput numberOfLines={2} 
   ref= {(el) => { this.explanation = el; }}
   onChangeText={(explanation) => this.setState({explanation})}
   value={this.state.explanation}
 
  />
  </View >
  <Separator/>
 <View style={[styles.parent]}>
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3} ]}
          onPress={() => { this.TransferMoneyValidations(); }}
          >
          <Text style={{fontSize:25,color:'white'}}>GÖNDER</Text>
          </TouchableOpacity >
             
       </View>


  <Separator/>
  < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
         onPress={() => this.Logout()} 
       >
       <Image 
            style={styles.stretch} source={require('./../MyImages/exit2.png')}        />
            <Text style={{color:'white'}}>   Güvenli Çıkış</Text>
      </TouchableOpacity>
  
       </SafeAreaView>     
       </ScrollView >
  
  </KeyboardAwareScrollView>
  
       
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
      aspectRatio: 6,
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

  export default TransferSelfScreen;