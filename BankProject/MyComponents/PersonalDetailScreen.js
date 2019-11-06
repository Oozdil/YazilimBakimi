import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,Image,TouchableOpacity,ScrollView,Alert } from 'react-native';

import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Separator() {
    return <View style={styles.separator} />;
  }
  

class PersonalDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} 
  };

 
  
  constructor(props) {
    super(props);
    this.state={
    CustomerId:this.props.navigation.state.params.Customer.CustomerId,
    Name:this.props.navigation.state.params.Customer.Name,
    Surname:this.props.navigation.state.params.Customer.Surname,
    Email:this.props.navigation.state.params.Customer.Email,
    Address:this.props.navigation.state.params.Customer.Address  
    }
   
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

  UpdateConfirmation = () => {
        
    Alert.alert(
      'GÜNCELLEME İŞLEMİ',
      'Bilgilerinizi güncellemek istediğinize emin misiniz?',
      [        
        {
          text: 'Vazgeç',          
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => this.Update()},
      ],
      {cancelable: false},
    ); 
    }

  Update = () => {
  var email=this.state.Email;
  var name=this.state.Name;
  var sname=this.state.Surname;
  var address=this.state.Address;
  var CId=this.state.CustomerId;

 // alert("Güncelleniyor :"+email+" "+name+" "+sname+" "+address+" "+CId);  
  fetch('http://yazilimbakimi.pryazilim.com/api/customerservice/update', 
  {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        CustomerId :CId,
        Name:name,
        Surname:sname,
        Email:email,
        Address:address
    })
})

    .then((response) => response.json())
    .then((responseData) =>
     {
      var success=responseData['Success']; 
      if(success)
      {       
       alert(responseData['Message']);

    
      }
      else
      {
        var mesaj=responseData['Message']; 
        Alert.alert('HATALI GİRİŞ',mesaj);
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
    textShadowRadius: 10}}>{'Kişisel Bilgilerim'}</Text>
     <Separator/>



     <Text style={{fontSize:15}}>Adınız</Text>
     <TextInput 
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.Name = el; }}
       onChangeText={(Name) => this.setState({Name})}
       value={this.state.Name}
     />


     <Text style={{fontSize:15}}>Soyadınız</Text>
     <TextInput 
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.Surname = el; }}
       onChangeText={(Surname) => this.setState({Surname})}
       value={this.state.Surname}
       />


  
        
     <Text style={{fontSize:15}}>Email Adresiniz</Text>
     <TextInput 
       style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.Email = el; }}
       onChangeText={(Email) => this.setState({Email})}
       value={this.state.Email}
       />





      <Text style={{fontSize:15}}>Adresiniz</Text>  
      <TextInput 
       style={{ height: 120, borderColor: 'gray', borderWidth: 1,borderRadius:5,backgroundColor:'white',fontSize:20 }}
       ref= {(el) => { this.Address = el; }}
       onChangeText={(Address) => this.setState({Address})}
       value={this.state.Address}
     
       numberOfLines={4}/>
      


        <Separator/>
      
  

      <View style={[styles.parent]}>
          <TouchableOpacity  style={[styles.child, {backgroundColor: '#943126',borderColor: 'white', borderWidth: 3,} ]}
          onPress={() => { this.UpdateConfirmation(); }}
          >
          <Text style={{fontSize:25,color:'white'}}>BİLGİLERİMİ GÜNCELLE</Text>
          </TouchableOpacity >         
         
       </View>
       < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
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
      width: '98%', 
      margin: '1%', 
      aspectRatio: 7,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15
  },
  stretch: {
    width: 25,
    height: 25,
    resizeMode: 'stretch'
  }
  });

  export default PersonalDetailScreen;