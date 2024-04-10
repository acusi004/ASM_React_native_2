import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image , ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import { URL } from './HomeScreen';

const PaymentScreen = ({route,navigation}) => {
  const {totalPrice, data} = route.params;
  const [payments, setPayments] = useState([
    {title: 'Wallet', image: require('../img/wallet.png'), highlight: false, subTitle: '$ 100.5' },
    {title: 'Google Payt', image: require('../img/ggpay.png'), highlight: false },
  {title: 'Apple Pay', image: require('../img/applepay.png'), highlight: false },
  {title: 'Amazon Pay', image: require('../img/amazonpay.png'), highlight: false }])

  const onPayment = async () => {
    const resopnseCart = await fetch(`https://65dae5d53ea883a15290dd1b.mockapi.io/cart`);
    const dataCart = await resopnseCart.json();
    const listIdCart = dataCart.map(item => item.id);
    if(listIdCart.length){
      for (let i = 0; i < listIdCart.length; i++) {
        const id = listIdCart[i];
        await fetch(`https://65dae5d53ea883a15290dd1b.mockapi.io/cart/${id}`, {method: 'DELETE'})
      }
    }
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let totalPrice = 0;
      for (let j = 0; j < element.giaSP.length; j++) {
        const {price, size} = element.giaSP[j];
        totalPrice += (Number(price) * (element.data[size] || 0))
      }
      if(totalPrice){
        await fetch('https://65dae5d53ea883a15290dd1b.mockapi.io/orders', {
          method: 'POST',
          body: JSON.stringify({
            idSP: element.idSP,
            createAt: Date.now()+"",
            data: element.data,
            totalPrice: Number(totalPrice.toFixed(2))
          })
        })
      }
    }

  }



  return (
   <SafeAreaView style={{ backgroundColor: "black", ...StyleSheet.absoluteFillObject }}>

<View>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../img/back1.png')}
                style={{width: 15, height: 20}}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.cart}>Payment</Text>
          </View>

        </View>

        <View style = {{borderRadius: 10, borderColor: 'orange', borderWidth: 1, margin: 10, paddingVertical: 10}}>
          <Text style = {{color: 'white', marginHorizontal: 10, fontWeight: 'bold', marginBottom: 10}}>Credit Card</Text>
          <View style = {{borderRadius: 20, backgroundColor: '#262B33' ,borderWidth: 1, marginHorizontal: 10,height: 200}}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image
              source={require('../img/chip.png')}
              style = {{margin: 15}}
              />
               <Image
              source={require('../img/visa.png')}
              style = {{margin: 10, height: 15, width: 50}}
              />

            </View>

            <Text style = {{color: 'white',  fontWeight: 'bold', fontSize: 18 , marginTop: 30, marginLeft: 5}}> 3 0 0 7   2 0 0 4    1 4 0 6    2 0 0 4 </Text>


            <View style = {{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
            <Text style = {{color: 'gray',marginTop: 30}}> Card Holder Name </Text>
            <Text style = {{color: 'gray',marginTop: 30}}> Expiry Date</Text>
            </View>

            <View style = {{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
            <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 18,}}> Rine </Text>
            <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 18,}}> 02/30 </Text>

            </View>
          </View>

        </View>

        {payments.map((item, index) => {
          return  <TouchableOpacity onPress={() => {
            for (let i = 0; i < payments.length; i++) {
              payments[i].highlight = false;

            }
            payments[index].highlight = true;
            setPayments([...payments])
          }} key={item.title} style = {[styles.khung, {backgroundColor: item.highlight ? 'orange' : 'black'}]}>
          <View style = {styles.press}>
            <Image
            source={item.image}
            />
            <Text style = {styles.textPayment}>{item.title}</Text>
            {item.subTitle ? <Text style = {{marginLeft: 230, color: 'white', fontSize: 15}}>{item.subTitle}</Text> : null}

          </View>

        </TouchableOpacity>
        })}



      </View>

      <View style = {{flexDirection: 'row', position: 'absolute', top: 650, backgroundColor: 'black', width: '100%', height: 70}}>
        <View>
        <Text style = {{color: 'white', marginLeft: 10,marginTop: 10, fontSize: 15}}>Total Price</Text>
        <Text style = {{color: 'white', marginLeft: 10, fontSize: 25, fontWeight: 'bold'}}>$ {totalPrice}</Text>
      </View>
      <TouchableOpacity onPress={ async() => {
        await onPayment();
        navigation.navigate('OrderHistoryScreen')
      }}
      style = {{backgroundColor: "orange", width: '55%',justifyContent: 'center', alignItems: 'center', marginLeft: 80, margin: 10, borderRadius: 15}}>
          <Text style = {{color: 'white', textAlign: 'center', fontSize: 19,fontWeight: 'bold'}}>Pay from Credit Card</Text>
      </TouchableOpacity>
      </View>
   </SafeAreaView>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cart: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 150,
    top: 10,
    color: "white",
  },
  khung: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 30,
    marginHorizontal: 10,
    backgroundColor: 'black',
    marginTop: 10,
  },
  press:{
    flexDirection: 'row',
    padding: 10,
    top: 3,
    left: 10,


  },
  textPayment: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    bottom: 5
  }

})
