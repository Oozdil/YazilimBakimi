import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,
  TextInput,Image,TouchableOpacity,Picker,CheckBox,Alert } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    billDetail: '0-0',
    accountdetail:'0-0',
    billDescription:''
  };
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





  PayBill=()=>{
  var faturaId=this.state.billDetail.split('-')[0];
  var faturaTutar=this.state.billDetail.split('-')[1];
  faturaTutar=parseFloat(faturaTutar);
  var hesapId=this.state.accountdetail.split('-')[0];
  var hesapTutar=this.state.accountdetail.split('-')[1];
  hesapTutar=parseFloat(hesapTutar);



      if(faturaId=="0")
      {
      alert("Lütfen geçerli bir fatura seçiniz!");
      return;
      }
      if(hesapId=="0")
      {
      alert("Lütfen geçerli bir hesap seçiniz!");
      return;
      }
     if(faturaTutar>hesapTutar)
      {
      alert("Bakiyeniz bu işlem için yeterli değil!");
      return;
      }


      if(this.state.billDescription=="")
      this.setState({billDescription:this.props.navigation.state.params.BillDetailHeader  });

      Alert.alert(
        'KAYIT İŞLEMİ',
        'Faturanız kısayollara \"'+this.props.navigation.state.params.BillDetailHeader+'\" olarak kaydedilsin mi?',
        [        
          {text: 'Hayır', onPress: () => this.PaymentAction()},
          {text: 'Evet', onPress: () => this.AddToSubcribes()},
        ],
        {cancelable: false},
      );

  
  }



  AddToSubcribes=()=>{
    var InvoicId=this.state.billDetail.split('-')[0];
    var CustomerId=this.props.navigation.state.params.Customer.CustomerId;
    var Description=this.state.billDescription;

    fetch('http://yazilimbakimi.pryazilim.com/api/InvoiceService/AddSubscriber/', 
    {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          InvoiceId : '5',
          Description: 'Test',
          CustomerId:'2'
      })
  })

      .then((response) => response.json())
      .then((responseData) =>
       {
         this.PaymentAction();        
      })
.catch((error) =>{
  alert(error);
}) 

  }


//ToDo
  PaymentAction=()=>{

    var faturaId=this.state.billDetail.split('-')[0];
    var faturaTutar=this.state.billDetail.split('-')[1];
    faturaTutar=parseFloat(faturaTutar);
    var hesapId=this.state.accountdetail.split('-')[0];
    var hesapTutar=this.state.accountdetail.split('-')[1];
   


   fetch('http://yazilimbakimi.pryazilim.com/api/InvoiceService/InvoiceToPay', 
    {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          InvoiceId : faturaId,
          AccountId: hesapId,
          Total:faturaTutar
      })
  })

      .then((response) => response.json())
      .then((responseData) =>
       {
        var success=responseData['Success']; 
        var mesaj=responseData['Message']; 
        Alert.alert('Fatura Ödeme Durumu',mesaj);
        if(success)
        {               
          this.props.navigation.navigate('MainMenu',{Customer:this.props.navigation.state.params.Customer });
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
      
      <View style={{flex:1.3}}>
        <Text style={{fontSize:20,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Fatura Detayı : '+this.props.navigation.state.params.BillDetailHeader}</Text>
  <Separator/>
  <Text style={{fontSize:15,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Ödenmemiş Faturalarınız\n'}</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
    <Picker
    selectedValue={this.state.billDetail}
    onValueChange={(itemValue, itemIndex) =>
      this.setState({billDetail: itemValue})
    }>
    <Picker.Item label="Lütfen Bir Fatura Seçiniz" value="0-0" />
    {this.props.navigation.state.params.BillsList}
 
  </Picker>
  </View>

      </View>
  <Separator/>
  <View style={{flex:3}}>
  <Text style={{fontSize:15,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Seçili Fatura Tutarı : '+this.state.billDetail.split('-')[1]+ ' TL'}</Text>
  <Separator/>
  <Text style={{fontSize:20,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Ödeme İçin Bir Hesap Seçiniz'}</Text>
   <Separator/>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
  <Picker
  selectedValue={this.state.accountdetail}
   onValueChange={(itemValue, itemIndex) =>
    this.setState({accountdetail: itemValue})
  }>
  <Picker.Item label="Lütfen Bir Hesap Seçiniz" value="0-0" />
  {this.props.navigation.state.params.AccountList}
</Picker>
</View >


  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:35,marginTop:10}}>
  <TextInput 
        style={{ height: 35, borderColor: 'gray',fontSize:15,color:'black' }}
        ref= {(el) => { this.subscribeNo = el; }}
        onChangeText={(billDescription) => this.setState({billDescription})}
        value={this.state.billDescription}
        maxLength={7} 
        placeholder='Kayıt Adı...'      
        placeholderTextColor='gray'
        />


</View >

<TouchableOpacity  style={[styles.child, {marginTop:20,backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { this.PayBill(); }}
          >
          <Text style={{fontSize:25,color:'white'}}>Borç Öde</Text>
          </TouchableOpacity >
<Separator/>
< TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
         onPress={() => this.Logout()} 
       >
       <Image 
            style={styles.stretch} source={require('./../MyImages/exit2.png')}  />
            <Text style={{color:'white'}}> Güvenli Çıkış</Text>
      </TouchableOpacity>


  </View>
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
      width: '98%', 
      marginLeft: '1%',
      marginRight: '1%', 
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

  export default BillDetailScreen;