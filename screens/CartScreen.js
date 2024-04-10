import { StyleSheet, Text, View, TextInput, Image, SafeAreaView,TouchableOpacity,FlatList, ToastAndroid } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { URL } from './HomeScreen';





const CartScreen = ({ navigation, route }) => {

  const [cart, setCart] = useState([]);
  const refCart = useRef(null);


  const getData = async () => {
    const response = await fetch(`https://65dae5d53ea883a15290dd1b.mockapi.io/cart`);
    const cartData = await response.json();
    const resopnseProduct =  await fetch(`https://661605dfb8b8e32ffc7c25cc.mockapi.io/products`);
    const listProduct = await resopnseProduct.json();
    const listCard = [];
    for (let i = 0; i < cartData.length; i++) {
      const product = listProduct.find(item => item.id == cartData[i].idSP)
     if(product){
      listCard.push({...product, ...cartData[i]})
     }
    }
    setCart(listCard);
  }

  useEffect(() => {
refCart.current = cart
  },[cart])

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return async () => {
        for (let i = 0; i < refCart.current.length; i++) {
          const element = refCart.current[i];
          try {
            const resopnse = await fetch(`https://65dae5d53ea883a15290dd1b.mockapi.io/cart/${element.id}`, {method: 'PATCH', body: JSON.stringify({
              data: element.data
            })})
          } catch (error) {
            console.log('error ===', error)
          }
        }
      }
    }, [])
  );



 const totalPrice = useMemo(() => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i];
     for (const value of element.giaSP) {
      total += (Number(element.data[value.size] || 0)* Number(value.price));
     }
  }
  return total.toFixed(2);
 },[cart])

  const CartCard = ({ item, index }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeSelection = (size) => {
      setSelectedSize(size);
    };
    let showItem = false;
    for (const key in item.data) {
      if(item.data[key] === '' || (item.giaSP.find(element => element.size === key) && Number(item.data[key]))){
        showItem = true;
      }
    }
    return !showItem ? null : (
      <View>


        <View style={styles.cartCard}>
          <View style={{ flexDirection: 'row', }}>
            <Image source={{ uri: item.linkAnh }} style={{ height: 90, width: 90, borderRadius: 10, }} />
            <View>

              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginLeft: 20 }}>{item.tenSP}</Text>
              <Text style={{ fontSize: 13, color: 'gray', marginLeft: 20 }}>
                {item.loaiSP}
              </Text>
            </View>
          </View>

          <View>

            {item.giaSP && item.giaSP.map(option => {
              return (item.data[option.size] === '' || (item.data[option.size] && Number(item.data[option.size]))) ? <Text
                key={option.size}
                onPress={() => handleSizeSelection(option)}

              >
                <View style={{ flexDirection: 'row',}}>
                  <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    marginTop: 10,
                    fontSize: 15,
                    fontWeight: 'bold',
                    backgroundColor: 'black',
                  }}
                  >
                    {option.size}</Text>
                  <Text style={{ color: 'white', marginTop: 15, marginHorizontal: 20, fontWeight: 'bold', fontSize: 20 }}> $ { (Number(item.data[option.size])  * option.price).toFixed(2)}</Text>
                </View>

                  <View style={styles.click1}>
                    <TouchableOpacity onPress={() =>{
                       cart[index].data[option.size] = String(Number(cart[index].data[option.size])-1);
                       setCart([...cart])
                    }}>
                      <Text style={styles.name}>-</Text>
                    </TouchableOpacity>

                    <TextInput style={styles.name1} keyboardType='numeric' value= {item.data[option.size]+""}  onChangeText={(value) => {
                      cart[index].data[option.size] = value;
                      setCart([...cart])
                    }} />


                    <TouchableOpacity onPress={() => {
                      cart[index].data[option.size] = String(Number(cart[index].data[option.size])+ 1);
                      setCart([...cart])
                    }}>
                      <Text style={styles.name}>+</Text>
                    </TouchableOpacity>
                  </View>


              </Text> : null

            })}

          </View>
        </View>
      </View>

    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>

      <View>

        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../img/menu.png')}
                style={styles.image1}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.cart}>Cart</Text>
          </View>

        </View>

      </View>

      <FlatList
        data={cart}
        renderItem={({ item, index }) => <CartCard key={item.id} item={item} index={index} />}

      />

      <View style={{ flexDirection: 'row',   backgroundColor: 'black',width: '100%' , height: 'auto', justifyContent: 'space-between',  }}>
        <View>
          <Text style={{ color: 'white', marginLeft: 20, marginTop: 10, fontSize: 15 }}>Total Price</Text>
          <Text style={{ color: 'white', marginLeft: 20, fontSize: 25, fontWeight: 'bold' }}>$ {totalPrice}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("PaymentScreen", {totalPrice, data: cart})}
          style={{ backgroundColor: "orange", width: '50%', justifyContent: 'center', alignItems: 'center', marginLeft: 80, margin: 10, borderRadius: 15 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Pay</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}



export default CartScreen

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cart: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: "white",
  },
  image1: {
    width: 40,
    height: 40,
    marginRight: 120,
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 5
  },
  image2: {
    width: 40,
    height: 40,
    marginLeft: 130,
    borderRadius: 10,
    marginTop: 10,
  },
  name: {
    color: "white",
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "orange",
    borderRadius: 5,

  },
  name1: {
    color: "white",
    marginHorizontal: 10,
    textAlign: 'center',
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'black',
    borderColor: "orange",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,


  },

  click1: {
    flexDirection: 'row',

  },

  cartCard: {
    height: 'auto',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    padding: 15,
    backgroundColor: '#262B33',
  },

})
