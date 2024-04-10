import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, TouchableOpacity, Pressable, ScrollView, ToastAndroid} from 'react-native'
import React, { useState, useEffect } from 'react'
import { URL } from './HomeScreen';


const DetailsScreen = ({ navigation, route }) => {

  const { image, title, price, rate, description, giaSP, item } = route.params;

  // State để lưu trữ kích thước hiện tại của sản phẩm (S, M, L)
  const [size, setSize] = useState('S');

  // yêu thích

  const [isLiked, setIsLiked] = useState(false);

  const [currentPrice, setCurrentPrice] = useState(price);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Kiểm tra xem sản phẩm có trong danh sách yêu thích hay không
    checkIsLiked();
  }, []);

  const checkIsLiked = async () => {
    try {
      const response = await fetch(`https://65d06e41ab7beba3d5e315e1.mockapi.io/favorites?id=${route.params.id}`);
      const result = await response.json();
      if (result?.length) {
        setIsLiked(true)
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra trạng thái yêu thích:', error);
    }
  };

  const handleLikePress = async (productId) => {
    if (isLiked) {
      const response = await fetch(`https://65d06e41ab7beba3d5e315e1.mockapi.io/favorites/${route.params.id}`, { method: 'DELETE' });


    } else {
      const response = await fetch(`https://65d06e41ab7beba3d5e315e1.mockapi.io/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'id': productId }),
      });

    }
    setIsLiked(!isLiked)

  };




  // Hàm để cập nhật kích thước khi người dùng chọn
  const handleSizeSelection = (data) => {
    setSize(data.size);
    if (data.price) {
      setCurrentPrice(data.price);
    } else {
      setCurrentPrice('N/A');
    }
  };

  const addToCart = async () => {
      const responseCart = await fetch('https://65dae5d53ea883a15290dd1b.mockapi.io/cart');
      const dataCart = await responseCart.json();
      const cart = dataCart.find(element => element.idSP == item.id);
      let method = 'POST';
      let url = "https://65dae5d53ea883a15290dd1b.mockapi.io/cart";
      let body = {
          idSP: item.id,
          data: {[size]: "1"}
      }
      if(cart){
          url = "https://65dae5d53ea883a15290dd1b.mockapi.io/cart/"+cart.id;
          method = 'PATCH';
          body = {
              idSP: item.id,
              data: {...cart.data,[size]: Number(cart.data[size] || 0)+ 1 +""}
          }
      }
      const response = await fetch(url, {
          method,
          body: JSON.stringify(body),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      });
      if (response.ok) {
        // Nếu thêm vào giỏ hàng thành công, hiển thị toast
        ToastAndroid.show('Thêm vào giỏ hàng thành công', ToastAndroid.SHORT);
    } else {
        // Nếu có lỗi xảy ra, hiển thị toast thông báo lỗi
        ToastAndroid.show('Đã xảy ra lỗi khi thêm vào giỏ hàng', ToastAndroid.SHORT);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        source={{ uri: image }}
        style={styles.headerImage}
      >

        <View style={styles.body}>
          <View style={{ flexDirection: 'row' }}>

            <View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}>{title}</Text>


                <Image
                  source={require('../img/coffee1.png')}

                  style={{ width: 35, height: 35, borderRadius: 10, marginLeft: 90, marginTop: 10, }}
                />
                <Image
                  source={require('../img/milk1.png')}

                  style={{ width: 25, height: 30, borderRadius: 10, marginTop: 10, marginLeft: 20, }}
                />
              </View>

              <Text style={{ color: 'gray', marginLeft: 20 }}>With Steamed Milk</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

                <Image
                  source={require('../img/rate.png')}

                  style={{ width: 40, height: 30, borderRadius: 10, marginLeft: 20, marginTop: 10 }}
                />

                <Text style={{ color: 'white', marginRight: 160, fontSize: 25, fontWeight: 'bold' }}>{rate}</Text>

                <Text style={{ color: 'gray', fontWeight: 'bold' }}>Medium Roasted</Text>

              </View>
            </View>
          </View>

          <ScrollView contentContainerStyle={{ backgroundColor: 'black', padding: 20 }}>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'normal' }}>Description</Text>
            <Text style={styles.tripInfo}>{description}</Text>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'normal', marginTop: 15 }}>Size</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1 }}>
              {giaSP.map(item => {
                return <TouchableOpacity
                  key={item.size}
                  onPress={() => handleSizeSelection(item)}
                  style={{ padding: 7, width: '20%', borderRadius: 10, marginTop: 10, borderColor: size === item.size ? 'orange' : 'gray', borderWidth: 2 }}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>{item.size}</Text>
                </TouchableOpacity>
              })}
            </View>
          </ScrollView>

          <View style={styles.footer}>

            <View style={{ flexDirection: 'row' }}>

              <View style={styles.price}>
                <Text style={{ color: 'white' }}>Price</Text>
                <Text style={styles.priceText}>$ {currentPrice}</Text>
              </View>

              <TouchableOpacity onPress = {addToCart }
              style={styles.bookButton}>
                <Text style={styles.buttonText}>Add to Card</Text>
              </TouchableOpacity>
            </View>


            <TouchableOpacity
              onPress={() => handleLikePress(route.params.id)}
              style={styles.heartIcon}>
              {/* Icon trái tim */}
              <Image
                source={isLiked ? require('../img/heart1.png') : require('../img/heart.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.back}>

              <Image
                source={require('../img/back1.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>


      </ImageBackground>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 7,

  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

  },

  headerText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  body: {
    flex: 3,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    marginTop: 370,

  },
  tripInfo: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 'normal',
    color: 'white',
    marginTop: 10,
    height: 90,

  },
  footer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
    paddingVertical: 10,

  },
  price: {
    flex: 2,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  bookButton: {
    flex: 3,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 15,


  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
  heartIcon: {
    position: 'absolute',
    right: 16,
    bottom: 730,

  },
  back: {
    position: 'absolute',
    left: 16,
    bottom: 740,

  },
})
