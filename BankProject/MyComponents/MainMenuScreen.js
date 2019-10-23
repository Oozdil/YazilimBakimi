import * as React from 'react';
import { Button, View, Text,ImageBackground, StyleSheet,SafeAreaView,TextInput,
  Image,TouchableOpacity,Alert,Picker } from 'react-native';

import Constants from 'expo-constants';



function Separator() {
    return <View style={styles.separator} />;
  }
class MainMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'MCBU Bank Cep Şubesi',
    headerTintColor:'white',
    headerStyle: {backgroundColor: '#17202A',} ,
    headerLeft:null
  };
  constructor(props) {
    super(props);
   

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



  GetAccountsToPicker = (navigationIndex) => 
  {   
    
    let outgoingBoard = [];
    let inCommingBoard = [];
    let Customer=this.props.navigation.state.params.Customer;
    let CustomerId=Customer.CustomerId;


    outgoingBoard.push(<Picker.Item label="Lütfen hesap seçiniz" value="" />);      
    inCommingBoard.push(<Picker.Item label="Lütfen hesap seçiniz" value="" />); 



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
         var CustomerNo=Customer.CustomerNo;
         var AccountNo=responseData['ResultList'][i].AccountNo;
         var Balance = responseData['ResultList'][i].AccountBalance;
         var AccountId=responseData['ResultList'][i].AccountId;
         
         var AccInfo=CustomerNo+"-"+AccountNo+"-("+Balance+" TL)";
         var AccInfo2=AccountId+"-"+Balance;
         
         outgoingBoard.push(<Picker.Item label={AccInfo} value={AccInfo2} />);      
        
         //if(i>0)
         inCommingBoard.push(<Picker.Item label={AccInfo} value={AccInfo2} />);     
        }
      



        if(navigationIndex==1)
        {
        this.props.navigation.navigate('TransferSelf',{outgoingBoard:outgoingBoard,inCommingBoard:inCommingBoard,
          Customer:this.props.navigation.state.params.Customer});
        }

        if(navigationIndex==2)
        {
        this.props.navigation.navigate('Transfer',{outgoingBoard:outgoingBoard,
          Customer:this.props.navigation.state.params.Customer});}
      
      
      
      
  
     
  })
  .catch((error) =>{
  alert(error);
  }) 
  }



/*Test*/
state = {
  timer: null,
  counter: 0,
  fullname:this.props.navigation.state.params.Customer.Name+ " "+this.props.navigation.state.params.Customer.Surname,
  totalBalance:this.props.navigation.state.params.Customer.TotalBalance
};

componentDidMount() {
  let timer = setInterval(this.tick, 1000);
  this.setState({timer});
}

componentWillUnmount() {
  this.clearInterval(this.state.timer);
}

tick =() => {

  if(this.state.counter==15)
  {
  this.RefreshCustomer();
  this.setState({counter: 0}); 
}
  this.setState({counter: this.state.counter + 1});
}

RefreshCustomer = () => {
  var CustomerNo=this.props.navigation.state.params.Customer.CustomerNo;
  fetch('http://yazilimbakimi.pryazilim.com/api/CustomerService/GetCustomerDetailByNo/'+CustomerNo, 
  {
    method: 'GET',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},     
   }).then((response) => response.json())
    .then((responseData) =>
     {
       var fname=responseData['ResultObj'].Name+" "+responseData['ResultObj'].Surname;
       var tbalance=responseData['ResultObj'].TotalBalance;
       this.setState({fullname:fname,totalBalance:tbalance});          
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
       

       <Text style={{color:'white',fontSize:18}}>Sayın : 
       {this.state.fullname}  (
       {this.props.navigation.state.params.Customer.CustomerNo} )
       </Text>
       <Separator/>

        <Text style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'İşlemler Menüsü'}</Text>
        <Separator/>
        <Text style={{fontSize:18,textShadowColor: 'rgba(0, 0, 0, 0.75)',color:'white',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10}}>{'Varlıklarım : '}{this.state.totalBalance} TL</Text>
        <Separator/>
        <View style={[styles.parent]}>
   
       


      <TouchableOpacity style={[styles.child_2, {backgroundColor: '#D5DBDB'} ]}       
      onPress={() => { this.GetAccounts(); }}      >
       <Text>Hesap İşlemlerim</Text>
      </TouchableOpacity>
   










      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} 
     
       onPress={() => { this.GetAccountsToPicker(1); }}
      
      >
       <Text>Virman</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]}
    
      onPress={() => { this.GetAccountsToPicker(2); }}
      >
     
       <Text>Havale</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]}
        onPress={() => this.props.navigation.navigate('Bill')}
      >
       <Text>Fatura Ödeme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.child, {backgroundColor: '#D5DBDB'} ]} 
         onPress={() => this.props.navigation.navigate('CreditPrediction')} 
         >
       <Text>Kredi Tahminim</Text>
       </TouchableOpacity>
       <TouchableOpacity style={[styles.child_2, {backgroundColor: '#D5DBDB'} ]}       
      onPress={() => this.props.navigation.navigate('PersonalDetail',{Customer:this.props.navigation.state.params.Customer})}      >
       <Text>Kişisel Bilgilerimi Güncelle</Text>
      </TouchableOpacity>
  </View>
  <Separator/>
       < TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
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
      flexWrap: 'wrap'
  },
  child: {
      width: '48%', 
      margin: '1%', 
      aspectRatio: 2.50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15,
      backgroundColor: '#D5DBDB',
      borderColor: '#2C3E50', borderWidth: 3,
  },
  child_2: {
    width: '98%', 
    margin: '1%', 
    aspectRatio: 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
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
    resizeMode: 'stretch'
  }
  });

  export default MainMenuScreen;