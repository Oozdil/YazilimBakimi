import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,
  Image,TouchableOpacity,Picker,Alert } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Separator() {
    return <View style={styles.separator} />;
  }
class TransferScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
   
  };
  constructor(props) {
    super(props);
 this.state={
   outGoingAccount:'',  
   targetValid:false,
   targetCustomerFullName:'',
   _amount: '0' ,
   explanation:'Havale...',
   TargetCustomerNo:'', 
   TargetCustomerAccNo:''
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

  TransferMoneyValidations=()=>
  {
    
    if(this.state.targetValid)
    {
      var amount=this.state._amount;
      amount=parseFloat(amount);
     


      if(amount==0)
      {
        alert("Lütfen Havale Tutarı Giriniz!");
        return;
      }
    
      var availableBalance=this.state.outGoingAccount.split('-')[1];
      availableBalance=parseFloat(availableBalance);



      
      var outgoingacc="";
      var incommingacc="";
    
    
    try
    {
       outgoingacc=this.state.outGoingAccount.split('-')[0];      
    }
    catch
    {
    
    }
    if(outgoingacc=="")
    {
      alert("Lütfen hesap seçiniz");
      return;
    }



      if(amount>availableBalance)
      {
        alert("Bakiyeniz bu işlem için yeterli değil");
        return;
      }
      var explanation=this.state.explanation;
   Alert.alert(
     'HAVALE İŞLEMİ',
      this.state.targetCustomerFullName+" adlı müşteriye "+amount+' TL tutarında havale yapmak istediğinize emin misiniz?',
     [
       
       {
         text: 'Vazgeç',          
         style: 'cancel',
       },
       {text: 'Evet', 
       onPress: () => this.TransferMoney(outgoingacc,amount,explanation)
      },
     ],
     {cancelable: false},
   ); 

    }
    else
    {
      alert("Havale yapmak istediğiniz müşteri bulunamadı");
    }
  }

  TransferMoney=(_outgoingacc,_amount,_explanation)=>
  {
   
     var Customer=this.props.navigation.state.params.Customer;
     var CustomerId=Customer.CustomerId;
     var targetCustomerNo=this.state.TargetCustomerNo;
     var targetAccountNo=this.state.TargetCustomerAccNo;
    //  alert(_outgoingacc+"-"+targetCustomerNo+"-"+targetAccountNo+"-"+_amount+"-"+_explanation+CustomerId);
     fetch('http://yazilimbakimi.pryazilim.com/api/TransferService/transfer', 
     {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({          
           OwnerAccountId:_outgoingacc,
           TargetCustomerNo:targetCustomerNo,
           TargetAccountNo:targetAccountNo,
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
           Alert.alert('HAVALE BAŞARI İLE YAPILDI',"Hesabınıza "+_amount+" TL havale yaptınız.");    

           this.props.navigation.navigate('MainMenu',{Customer:Customer });
         }
         else
         {
           var mesaj=responseData['Message']; 
           Alert.alert('HAVALE YAPILAMADI',mesaj);
         }
              
      
       })
 .catch((error) =>{
   alert(error);
 }) 
  }
















  OnChangeIncommingAccount=(value)=>
  {
    if(value.length==12)
    {
        if(value.split('-').length!=2)
        {
          alert("Lütfen Hesap numarasını 1000000-1001 formatında giriniz");
          value=value.substring(0,value.length-1);
        }
        else
        {
          var targetCustomerNo=value.split('-')[0];
          var targetAccountNo=value.split('-')[1];

          if(targetCustomerNo.length==7)
          {          
            if(targetCustomerNo==this.props.navigation.state.params.Customer.CustomerNo)
            {            
              alert("Bu size ait bir hesap numarası! Kendinize para gönderebilmek için lütfen virman adımını kullanınız.");
              value=value.substring(0,6);
            }
            else{
              this.FindCustomer(targetCustomerNo,targetAccountNo);
            }
        
          }
          else{
            alert("Lütfen Hesap numarasını 1000000-1001 formatında giriniz");
          }
        }
    }
    else{
      this.setState({
        targetValid:false,
        targetCustomerFullName:''      
      });  
    }
    
    
    this.setState({incommingAccount:value})
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
  FindCustomer=(CustomerNo,AccNo)=>
  {    
    fetch('http://yazilimbakimi.pryazilim.com/api/CustomerService/GetCustomerDetailByNo/'+CustomerNo, 
    {
      method: 'GET',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},     
     }).then((response) => response.json())
      .then((responseData) =>
       {
         var _CustomerNo='';
         var _CustomerId='';
         var _CustomerName='';
         var _CustomerSurname='';

         try{
           _CustomerNo=responseData['ResultObj'].CustomerNo;
           _CustomerId=responseData['ResultObj'].CustomerId;
           _CustomerName=responseData['ResultObj'].Name;
           _CustomerSurname=responseData['ResultObj'].Surname;          
            }
        catch
         {
           alert("Müşteri Bulunamadı");
           return;
         }
        finally
        {
          this.setState({ TargetCustomerNo:_CustomerNo,targetCustomerFullName: _CustomerName+" "+_CustomerSurname });
        }
       

         if(this.state.CustomerNo!='')
         {
         var accFound=false;
          fetch('http://yazilimbakimi.pryazilim.com/api/AccountService/GetAccountList/'+_CustomerId, 
          {
            method: 'GET',
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},           
          }).then((response) => response.json())
            .then((responseData) =>
             {
              var accListCount=responseData['ResultList'].length;
              for(var i=0;i<accListCount;i++)
              {        
               var AccountNo=responseData['ResultList'][i].AccountNo;  
                 
                  if(AccountNo==AccNo)
                  {                    
                    accFound=true;
                    this.setState({TargetCustomerAccNo:AccountNo});
                    
                  }  
              } 
              
              if(!accFound)
              {
                alert("Hesap bulunamadı");
                this.setState({targetValid:false}); 
              }
              else{
                this.setState({targetValid:true});           
              }
              
            })
      .catch((error) =>{
        alert(error);
      })               
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

        <KeyboardAwareScrollView enableOnAndroid={true}     
      resetScrollToCoords={{ x: 0, y: 0 }}  
      scrollEnabled={false}
      extraScrollHeight={100}
    >
        <ScrollView >
        <SafeAreaView style={styles.container}>
      
        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'HAVALE (Başka Hesaba)'}</Text>
  
        

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

  <Text style={{color:'white'}}>Alan Hesap({this.state.targetCustomerFullName})</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:40}}>
  <TextInput  
    style={{ height: 40, fontSize:20,
    textAlign:'left' }}
    ref= {(el) => { this.incommingAccount = el; }}     
    onChangeText={value => this.OnChangeIncommingAccount(value)}
    value={this.state.incommingAccount}
    keyboardType={'numeric'}
    maxLength={12}
  />
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
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
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

  export default TransferScreen;