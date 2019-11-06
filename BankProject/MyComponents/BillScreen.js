import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity,Picker,Alert } from 'react-native';

import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    billType: '0',
    auto_billType: '0',
    subscribeNo:'0'
  };
  GotoBillDetails=(billTypeNumber)=>{

    if(billTypeNumber==0)
    {      
      this.RegisteredBillPayment();
    }
    else{
      this.NewBillPayment();    
    }
   
  }

  RegisteredBillPayment=()=>{
    if(this.state.auto_billType==0)
    {
    alert("Kayıtlı Fatura Seçmediniz!");
    }
    else{
     this.GetBillDetails(this.state.auto_billType);
    }
  
    
  }

  NewBillPayment=()=>{
    if(this.state.billType=="0")
    {
      alert("Abonelik tipi seçmediniz!");
      return;
    }
    if(this.state.subscribeNo=="0")
    {
      alert("Geçerli bir müşteri numarası giriniz");
      return;
    }
    this.GetBillDetails(this.state.subscribeNo+"-"+this.state.billType);
  }



   GetBillDetails=(billDetail)=>{
    
    var subscribeNo=billDetail.split('-')[0];
    var companyName=billDetail.split('-')[1];
    fetch('http://yazilimbakimi.pryazilim.com/api/InvoiceService/InvoiceListBySubscriberNo/'+subscribeNo, 
    {
      method: 'GET',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},     
     }).then((response) => response.json())
      .then((responseData) =>
       {
         var InvoiceList=responseData['ResultList'];
       
       
        //alert(JSON.stringify(InvoiceList));
       
       
       
        if(InvoiceList.length==0)
        {
          alert("Borç bilgisi bulunamadı");
         
        }
        else
        {
          var noPaidBills=[];
          var BillsList=[];
          for(var i=0;i<InvoiceList.length;i++)
          {
            if(responseData['ResultList'][i].CompanyName==companyName)
            {
              noPaidBills.push(responseData['ResultList'][i].CompanyName);

              var Month=responseData['ResultList'][i].Month;
              var Year=responseData['ResultList'][i].Year;
              var Total=responseData['ResultList'][i].Total;
              var InvoiceId=responseData['ResultList'][i].InvoiceId;
              BillsList.push( <Picker.Item label={Month+'/'+Year+'-('+Total+' TL)'} value={InvoiceId+'-'+Total} />);            
            }
            
          }
         
          if(noPaidBills.length>0)
          {
         ///Hesap Bakiyelieri al ****************///////////////
         let accountBoard = [];    
         let CustomerId=this.props.navigation.state.params.Customer.CustomerId;    
    
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
              var CustomerNo=this.props.navigation.state.params.Customer.CustomerNo;
              var AccountNo=responseData['ResultList'][i].AccountNo;
              var Balance = responseData['ResultList'][i].AccountBalance;
              var AccountId=responseData['ResultList'][i].AccountId;
              
              var AccInfo=CustomerNo+"-"+AccountNo+"-("+Balance+" TL)";
              var AccInfo2=AccountId+"-"+Balance;
              
              accountBoard.push(<Picker.Item label={AccInfo} value={AccInfo2} />);     
             } 
       })
       .catch((error) =>{
       alert(error);
       }) 
/////****************************************** */


         
          this.props.navigation.navigate('BillDetail',{Customer:this.props.navigation.state.params.Customer,
            BillsList:BillsList,AccountList:accountBoard,BillDetailHeader: billDetail});
          }
          else{
            alert("Borç bilgisi bulunamadı");
          }
         
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
        <Separator/>
      <View style={{flex:1.6}}>

        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Kayıtlı Faturalarım'}</Text>
      <Separator/>
  

      
      <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
      <Picker
        selectedValue={this.state.auto_billType}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({auto_billType: itemValue})
        }>
          {this.props.navigation.state.params.recordedBills}
      </Picker>

    
      </View>
      <TouchableOpacity  style={[styles.child, {marginTop:20,backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { this.GotoBillDetails(0);}}
          >
          <Text style={{fontSize:18,color:'white'}}>Kayıtlı Fatura Borç Sorgula - Öde</Text>
          </TouchableOpacity >
     
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
  <Picker.Item label="Abonellik Tipi Seçiniz..." value="0" />
  <Picker.Item label="İZMİRGAZ" value="İZMİRGAZ" />
  <Picker.Item label="GEDİZ ELEKTRİK" value="GEDİZ ELEKTRİK" />
  <Picker.Item label="İZSU" value="İZSU" />
</Picker>

</View >
<Text style={{fontSize:18,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>Abone / Sözleşme No</Text>
  <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:40}}>
  <TextInput 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
        ref= {(el) => { this.subscribeNo = el; }}
        onChangeText={(subscribeNo) => this.setState({subscribeNo})}
        value={this.state.subscribeNo}
        maxLength={7}
        keyboardType={'numeric'}
        />


</View >
<TouchableOpacity  style={[styles.child, {marginTop:20,backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
                onPress={() => { this.GotoBillDetails(1);}}
          >
          <Text style={{fontSize:18,color:'white'}}>Yeni Fatura Borç Sorgula - Öde</Text>
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
      marginVertical: 6,
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