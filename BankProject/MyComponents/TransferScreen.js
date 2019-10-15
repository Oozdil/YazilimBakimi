import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,
  Image,TouchableOpacity,Picker,Alert } from 'react-native';

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
  constructor(props) {
    super(props);
 this.state={
   outGoingAccount:'',  
   targetValid:false,
   targetCustomerFullName:'*******-****',
   _amount: '0' ,
   explanation:'Havale...'
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
     
      if(amount>availableBalance)
      {
        alert("Bakiyeniz bu işlem için yeterli değil");
        return;
      }
      var explanation=this.state.explanation;
   Alert.alert(
     'HAVALE İŞLEMİ',
      this.state.targetCustomerFullName+"adlı müşteriye"+amount+'TL tutarında havale yapmak istediğinize emin misiniz?',
     [
       
       {
         text: 'Vazgeç',          
         style: 'cancel',
       },
       {text: 'Evet', 
      // onPress: () => this.TransferMoney(outgoingacc,incommingacc,amount,explanation)
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
          //Müşteri isim sorgulama
          this.setState({
            targetValid:true,
            targetCustomerFullName:'Orçun ÖZDİL'
          
          });

          
        }

    }
    
    
    this.setState({incommingAccount:value})
  }
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
  selectedValue={this.state.outGoingAccount}
  // onValueChange={(itemValue, itemIndex) => this.setState({outGoingAccount: itemValue})}
  onValueChange={
    (itemValue, itemIndex) => this.setState({outGoingAccount: itemValue})
  } 
   >
  {this.props.navigation.state.params.outgoingBoard}
</Picker>
</View >

  <Text style={{color:'white'}}>Alan Hesap({this.state.targetCustomerFullName}})</Text>
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