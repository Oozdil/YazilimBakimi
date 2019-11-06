import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,
  TextInput,Image,TouchableOpacity,ScrollView,Alert,Picker} from 'react-native';

import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



function Separator() {
    return <View style={styles.separator} />;
  }
  

class PredictionHistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} 
  };

  state = { creditAmount: '0', age: '18',ownHouse: '0',prevCreds: '0',ownPhone:'0'};
  
 

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

/*Test*/
state = {
  timer: null,
  counter: 0,
  history:[]
};

componentDidMount() {
  try{
  let timer = setInterval(this.tick, 1000);
  this.setState({timer});
  }
  catch{}
}

componentWillUnmount() {
  try{
  this.clearInterval(this.state.timer);
  }
  catch{}
  
}

tick =() => {

  if(this.state.counter==0)
  {
  this.RefreshHistory();
  }

  if(this.state.counter==15)
  {
  this.RefreshHistory();
  this.setState({counter: 0}); 
}
  this.setState({counter: this.state.counter + 1});
}

RefreshHistory = () => {
  var CustomerNo=this.props.navigation.state.params.Customer.CustomerNo;
  var CustomerId=this.props.navigation.state.params.Customer.CustomerId;
  fetch('http://www.orcunozdil.site/List.aspx', 
  {
    method: 'GET',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},     
   }).then((response) => response.json())
    .then((responseData) =>
     {
       var responseCount=responseData.length;
       var preds=[];
       for(var i=0;i<responseCount;i++)
       {
          var CId=responseData[i].CustomerId;
          if(CId==CustomerId)
          {
            var KrediMiktari=responseData[i].CreditAmount;
            var Yas=responseData[i].Age;
            var EvDurumu=responseData[i].OwnHouse;
            var KrediSayisi=responseData[i].CreditCount;
            var TelefonDurumu=responseData[i].OwnPhone;
            var Sonuc=responseData[i].Result;
            var Okundumu=responseData[i].Isread;
            var Tarih=responseData[i].DateOfCreate;

            var renk="#90ee90";
            TelefonDurumu=TelefonDurumu.replace("0","Yok").replace("1","Var");
            EvDurumu=EvDurumu.replace("0","Yok").replace("1","Var");
            

            if(Sonuc==-1)
            {
              renk="#add8e6";
              Sonuc="Sonuçlanmadı";
            }
            if(Sonuc==0)
            {
              renk="#f8d2f8";
              Sonuc="Kredi Verme";
            }
            if(Sonuc==1)
            {
              renk="#90ee90";
              Sonuc="Kredi Ver";
            }
            var detay="Kredi Tutarı : "+KrediMiktari+ 
                      "\nYaş : "+ Yas+
                      "\nKredi Sayısı : "+KrediSayisi+
                      "\nTelefon : "+TelefonDurumu+
                      "\nEv : "+EvDurumu+
                      "\n"+Tarih+
                      "\n"+Sonuc;

            preds.push(<View style={{backgroundColor:renk,width:'100%',marginBottom:5,
            borderRadius:10,padding:10,borderColor: '#2C3E50', borderWidth: 3,width:"48%",margin:"1%"}}>
              <Text>{detay}</Text></View>);

          }

        this.setState({history:preds});
       
       }
              
    })
    .catch((error) =>{
      alert(error);
    }) 
}

/*Test*/


    render() {
      return (
        <ImageBackground source={require('./../MyImages/bg_red.jpg')} style={styles.backgroundImage}>   
        {/*Header*/}

   
        
        <SafeAreaView style={styles.container}>   
     <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Kredi Tahmin İstekleriniz'}</Text>

    
     <Separator/>
     <ScrollView >
     <View style={[styles.parent]}>   
        
        {this.state.history} 
       
       
        </View>
   
    <Separator/>
      
  

     
    </ScrollView >
   </SafeAreaView>     
 
  


  
   < TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginBottom:25}}
         onPress={() => this.Logout()} 
       >
       <Image 
            style={styles.stretch} source={require('./../MyImages/exit2.png')}  />
            <Text style={{color:'white'}}> Güvenli Çıkış</Text>
      </TouchableOpacity>
       
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

  export default PredictionHistoryScreen;