import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,
  TextInput,Image,TouchableOpacity,ScrollView,Alert,Picker} from 'react-native';

import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



function Separator() {
    return <View style={styles.separator} />;
  }
  

class CreditPredictionScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} 
  };

  state = { creditAmount: '0', age: '18',ownHouse: '0',prevCreds: '0',ownPhone:'0'};

  CreditPrediction = () => {    
   var name=this.props.navigation.state.params.Customer.Name;
   var surname=this.props.navigation.state.params.Customer.Surname;



   var customerid=this.props.navigation.state.params.Customer.CustomerId;
   var creditAmount=this.state.creditAmount;
   var age=this.state.age;
   var ownHouse=this.state.ownHouse;
   var prevCreds=this.state.prevCreds;
   var ownPhone=this.state.ownPhone;

   


   fetch('http://www.orcunozdil.site/Add.aspx?p1='+customerid+'&p2='+creditAmount+'&p3='+age+
   '&p4='+ownHouse+'&p5='+prevCreds+'&p6='+ownPhone, 
   {
     method: 'GET',
     headers: {'Accept': 'application/json','Content-Type': 'application/json'},     
    }).then((response) => response.json())
     .then((responseData) =>
      {
        var sonuc=JSON.stringify(responseData);
        if(sonuc=="1")
        {
          alert("Sayın Orçun Özdil, kredi tahmin sonucunuzu, 'Sorgu Geçmişim'den öğrenebilirsiniz!");
          this.setState({ creditAmount: '0', age: '18',ownHouse: '0',prevCreds: '0',ownPhone:'0'});
        }
        else{
          alert("Bir hata oluştu!"+sonuc);
        }
     })
     .catch((error) =>{
       alert(error);
     }) 



   }


    PreviousPredictions = () => {  
    
    
    this.props.navigation.navigate('PredictionHistory',{Customer:this.props.navigation.state.params.Customer})    
    }
 

 

    OnCreditAmount(value) { 
      value=value.replace(',','.');
      if(value.length==2 && value[0]=='0' && value[1]!='.')
      value=value[1];
  
  
      if(value.split('.').length>2)
      {
        value=value.substring(0,value.length-1);     
      }
  
      if(value.split('.').length==2 && value.split('.')[1].length==3)
      value=value.substring(0,value.length-1);
  
  
      this.setState({creditAmount:value})
     
    }

    OnChangePrevCredCount=(value)=>
    {
     
      var lastChar=value[value.length-1];
      var numbers="0123456789";
     
      //Sayı mı?
      if(numbers.includes(lastChar))
      {
        if(value.length==2 && value[0]=='0' )
        value=value[1];

        this.setState({prevCreds:value})
      }
      if(value.length==0)
      this.setState({prevCreds:value})
    }
    OnChangeAge=(value)=>
    {
      var lastChar=value[value.length-1];
      var numbers="0123456789";
     
      //Sayı mı?
      if(numbers.includes(lastChar))
      {
        if(value.length==2 && value[0]=='0' )
        value=value[1];

        this.setState({age:value})
      }
      if(value.length==0)
      this.setState({age:value})
      
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
    textShadowRadius: 10}}>{'Kredi Tahmin Robotu'}</Text>
     <Separator/>



      <Text style={{fontSize:15}}>İstediğiniz Kredi Miktarı :</Text>
  
      <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:40}}>
       <TextInput 
        style={{ height: 40, fontSize:20,
        textAlign:'left' }}
        ref= {(el) => { this.creditAmount = el; }}     
        onChangeText={value => this.OnCreditAmount(value)}
        value={this.state.creditAmount}
        maxLength={12}
        keyboardType={'numeric'}
        />
       </View >





      <Text style={{fontSize:15}}>Yaşınız :</Text>
       <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:40}}>
          <TextInput  
            style={{ height: 40, fontSize:20,
            textAlign:'left' }}
            ref= {(el) => { this.age = el; }}     
            onChangeText={value => this.OnChangeAge(value)}
            value={this.state.age}
            keyboardType={'numeric'}
            maxLength={2}
          />
        </View >












      <Text style={{fontSize:15}}>Ev Durumunuz :</Text>
      <View style={{height: 35,borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
         <Picker
        selectedValue={this.state.ownHouse}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ownHouse: itemValue})
        }>
        <Picker.Item label="Kira" value="0" />
        <Picker.Item label="Kendi Evim" value="1" />     
      </Picker>
      </View>

  
        
      <Text style={{fontSize:15}}>Önceden Aldığınız Kredi Sayısı :</Text>
    
         <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',backgroundColor:'#CACFD2',height:40}}>
          <TextInput  
            style={{ height: 40, fontSize:20,
            textAlign:'left' }}
            ref= {(el) => { this.prevCreds = el; }}     
            onChangeText={value => this.OnChangePrevCredCount(value)}
            value={this.state.prevCreds}
            keyboardType={'numeric'}
            maxLength={2}
          />
        </View >





      <Text style={{fontSize:15}}>Kendinize Ait Telefonunuz :</Text> 
    
         <View style={{height: 35,borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden',backgroundColor:'#CACFD2'}}>
         <Picker
        selectedValue={this.state.ownPhone}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ownPhone: itemValue})
        }>
        <Picker.Item label="Telefonum Yok" value="0" />
        <Picker.Item label="Telefonum Var" value="1" />     
      </Picker>
      </View>

      


        <Separator/>
      
  

      <View style={[styles.parent]}>
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { this.CreditPrediction(); }}
          >
          <Text style={{fontSize:15,color:'white'}}>KREDİ TAHMİNİM</Text>
          </TouchableOpacity >         
         
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#D5DBDB',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { this.PreviousPredictions(); }}
          >
          <Text style={{fontSize:15}}>SORGU GEÇMİŞİM</Text>
          </TouchableOpacity > 

       </View>
       < TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:25}}
         onPress={() => this.Logout()} 
       >
       <Image 
            style={styles.stretch} source={require('./../MyImages/exit2.png')}  />
            <Text style={{color:'white'}}> Güvenli Çıkış</Text>
      </TouchableOpacity>

   </SafeAreaView>     
   </ScrollView >
  
   </KeyboardAwareScrollView>
  
       
        </ImageBackground>
      );
    }
  };



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
      aspectRatio: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15
  },
  stretch: {
    width: 25,
    height: 25,
    resizeMode: 'stretch',
  
  }
  });

  export default CreditPredictionScreen;