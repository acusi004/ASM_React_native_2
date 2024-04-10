import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';




const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);


  const getData = async () => {
    const response = await fetch('https://65d06e41ab7beba3d5e315e1.mockapi.io/favorites');
    const listFavorite = await response.json();
    const listFavoriteId = listFavorite.map(item => item.id)
    const responseProduct = await fetch('https://661605dfb8b8e32ffc7c25cc.mockapi.io/products');
    const dataProduct = await responseProduct.json();
    setFavorites(dataProduct.filter(item =>  listFavoriteId.includes(item.id) ));
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );


  const handleLikePress = async (itemId) => {
    const response = await fetch(`https://65d06e41ab7beba3d5e315e1.mockapi.io/favorites/${itemId}`, {method: 'DELETE'});
    const result = await response.json();
    if(result){
      await getData()
    }

  };


  return (

    <SafeAreaView style={{ backgroundColor: "black", ...StyleSheet.absoluteFillObject }}>

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
            <Text style={styles.cart}>Favorites</Text>
          </View>



        </View>

      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
             {item && item.linkAnh && (
              <View key={item.id}>
            <View style={styles.container}>
              <Image style={styles.image3}
                source={{ uri: item.linkAnh }} />

              <View style={styles.view}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.text}>{item.tenSP}</Text>


                  <Image
                    source={require('../img/coffee1.png')}

                    style={{ width: 35, height: 35, borderRadius: 10, marginLeft: 80, marginTop: 10 }}
                  />
                  <Image
                    source={require('../img/milk1.png')}

                    style={{ width: 25, height: 30, borderRadius: 10, marginRight: 20, marginLeft: 10, marginTop: 10 }}
                  />
                </View>

                <Text style={{ color: 'gray', marginLeft: 20 }}>With Steamed Milk</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

                  <Image
                    source={require('../img/rate.png')}

                    style={{ width: 40, height: 30, borderRadius: 10, marginLeft: 20, marginTop: 10 }}
                  />

                  <Text style={{ color: 'white', marginRight: 160, fontSize: 25, fontWeight: 'bold' }}>{item.danhGia}</Text>

                  <Text style={{ color: 'gray', marginRight: 30, fontWeight: 'bold' }}>Medium Roasted</Text>

                </View>


              </View>

              <View style={styles.view1}>
                <Text style={{ color: 'gray', marginLeft: 20, marginTop: 20, fontSize: 20 }}>Description</Text>
                <Text style={{ color: 'white', marginLeft: 20, marginRight: 20, fontSize: 15 }}>{item.moTa}</Text>
              </View>

            </View>
            </View>
             )}
            <TouchableOpacity
              onPress={() => {
                handleLikePress(item.id);
              }}
              style={styles.heartIcon}>
              {/* Icon trái tim */}
              <Image
                source={require('../img/heart1.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        )}
      />

    </SafeAreaView>

  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    color: "black",
    margin: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
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
    marginRight: 110,
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 5
  },
  image2: {
    width: 40,
    height: 40,
    marginLeft: 110,
    borderRadius: 10,
    marginTop: 10,
  },
  image3: {
    width: 'auto',
    height: 400,
    borderRadius: 10,
  },

  view: {
    height: 150,
    color: "black",
    borderWidth: 1,
    borderRadius: 20,
  },

  view1: {
    height: 250,
    color: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#262B33'
  },

  text: {
    marginLeft: 20,
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  heartIcon: {
    position: 'absolute',
    right: 35,
    bottom: 770,

  },
})
