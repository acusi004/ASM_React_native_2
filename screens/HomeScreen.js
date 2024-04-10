import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeScreen = ({navigation}) => {
  const [search, setsearch] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState('');
  const [section, setSection] = useState([
    {title: 'All', id: 1, uriIcon: require('../img/cafe.png'), hide: true},
    {
      title: 'Cappuccino',
      id: 2,
      uriIcon: require('../img/cappuccino.png'),
      hide: false,
    },
    {
      title: 'Americano',
      id: 3,
      uriIcon: require('../img/americano.png'),
      hide: false,
    },
    {
      title: 'Coffee Beans',
      id: 4,
      uriIcon: require('../img/beans.png'),
      hide: false,
    },
    {title: 'Cake', id: 5, uriIcon: require('../img/cake.png'), hide: false},
  ]);
  const [danhSach, setDanhSach] = useState([]);
  const [initData, setInitData] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  const translateYInterpolate = scrollY.interpolate({
    inputRange: [0, 160],
    outputRange: [0, -110],
    extrapolate: 'clamp',
  });

  const containerStyle = {
    transform: [{ translateY: translateYInterpolate }],
  };
  useEffect(() => {
    // Fetch dữ liệu từ API ở đây
    // Ví dụ sử dụng fetch:
    fetch('https://661605dfb8b8e32ffc7c25cc.mockapi.io/products')
      .then(response => response.json())
      .then(data => {
        // Kiểm tra xem data có tồn tại và có thuộc tính products không
        if (data) {
          setDanhSach(data);
          setInitData(data);
        } else {
          console.error('Dữ liệu không hợp lệ:', data);
        }
      })
      .catch(error => console.error('Lỗi khi fetch dữ liệu:', error));
  }, []);

  const handleSection = index => {
    if (index === 0) {
      setSection(
        section.map((item, position) => ({
          ...item,
          hide: position === index ? true : false,
        })),
      );
    } else {
      const sectionNew = section.map(item => ({...item, hide: true}));
      sectionNew[index].hide = false;
      setSection(sectionNew);
    }
  };

  const filteredProducts = () =>
    initData.filter(product => {
      if (
        product.tenSP &&
        product.loaiSP &&
        (product.tenSP.toLowerCase().includes(search.toLowerCase()) ||
          product.loaiSP.toLowerCase().includes(search.toLowerCase()))
      ) {
        return product;
      }
      return false;
    });

  const handleSearch = value => {
    setsearch(value);
    if (!value.trim()) {
      setDanhSach(initData);
    } else {
      setDanhSach(filteredProducts());
    }
  };

  const addCart = async item => {
    const responseCart = await fetch('https://65dae5d53ea883a15290dd1b.mockapi.io/cart');
    const dataCart = await responseCart.json();
    const cart = dataCart.find(element => element.idSP == item.id);
    let method = 'POST';
    let url = URL + '/carts';
    let body = {
      idSP: item.id,
      data: {S: '1', '250gm': '1'},
    };
    if (cart) {
      url = URL + '/carts/' + cart.id;
      method = 'PATCH';
      body = {
        idSP: item.id,
        data: {
          S: Number(cart.data['S']) + 1 + '',
          '250gm': Number(cart.data['250gm']) + 1 + '',
        },
      };
    }
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      ToastAndroid.show('Thêm giỏ hàng thành công', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        'Đã xảy ra lỗi khi thêm vào giỏ hàng',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <SafeAreaView
      style={{backgroundColor: 'black', ...StyleSheet.absoluteFillObject}}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={{marginLeft: 20, marginTop: 20}}>
            <Image
              source={require('../img/menu.png')}
              style={{width: 40, height: 40}}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('PersonalDetailsScreen')}>
          <View style={styles.ImageContainer}>
            <Image
              source={require('../img/avatar.png')}
              style={{width: 40, height: 40}}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.container, containerStyle]}>

        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontWeight: 'bold',
            margin: 20,
          }}>
          Find the best{'\n'}coffee for you
        </Text>

        <View style={styles.InputContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../img/search.png')}
              style={styles.InputIcon}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TextInput
            style={styles.search}
            value={search}
            onChangeText={handleSearch}
            placeholder="Find your coffee..."
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.menu}>
          <ScrollView horizontal={true}>
            {section.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSection(index)}>
                <View style={styles.item}>
                  <Image style={styles.image} source={item.uriIcon} />
                  <Text style={styles.text}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        </Animated.View>


      <ScrollView>
        {section
          .filter(item => !item.hide)
          .map(element => {
            const list = danhSach.filter(obj => obj.loaiSP === element.title);
            return !list.length ? null : (
              <View key={element.id}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginLeft: 20,
                  }}>
                  {element.title}
                </Text>

                <FlatList
                  data={list}
                  keyExtractor={item => parseInt(item.id, 10).toString()}
                  horizontal={true}
                  renderItem={({item}) => (
                    <View style={styles.productItem}>
                      <TouchableOpacity
                        onPress={() => {
                          const priceS = item.giaSP.find(
                            price =>
                              price.size === 'S' || price.size === '250gm',
                          );
                          const price = priceS
                            ? priceS.price + ' ' + priceS.currency
                            : 'N/A';

                          navigation.navigate('DetailsScreen', {
                            item,
                            id: item.id,
                            giaSP: item.giaSP,
                            image: item.linkAnh,
                            title: item.tenSP,
                            price: price,
                            gia: item.giaSP,
                            rate: item.danhGia,
                            description: item.moTa,
                          });
                        }}>
                        <Image
                          style={{
                            width: 150,
                            height: 150,
                            borderRadius: 20,
                            margin: 7,
                          }}
                          source={{uri: item.linkAnh}}
                        />
                      </TouchableOpacity>

                      <View style={styles.ngang}>
                        <View style={{width: 115, marginLeft: 5}}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 17,
                              fontWeight: 'bold',
                            }}>
                            {item.tenSP}
                          </Text>

                          {item.giaSP.map(price =>
                            price.size === 'S' || price.size === '250gm' ? (
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 16,
                                  marginTop: 5,
                                  fontWeight: 'bold',
                                }}>
                                {price.currency} {price.price}
                              </Text>
                            ) : null,
                          )}
                        </View>

                        <TouchableOpacity
                          style={styles.buttonadd}
                          onPress={() => addCart(item)}>
                          <Image
                            style={styles.imgadd}
                            source={require('../img/add.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'serif',
    color: 'black',
  },
  productItem: {
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 20,
    width: 170,
    height: 250,
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: '#222222',
    borderBottomColor: 'black',
  },
  img: {
    width: 10,
    borderRadius: 10,
    height: 140,
    margin: 5,
  },
  buttonadd: {
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  ngang: {
    marginTop: 10,
    flexDirection: 'row',
    marginLeft: 5,
  },
  imgadd: {
    width: 20,
    height: 20,
  },

  headerBar: {
    flexDirection: 'row',
  },

  ImageContainer: {
    height: 40,
    width: 40,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 20,
    borderColor: 'gray',
    alignItems: 'center',
    marginLeft: 310,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  InputContainer: {
    margin: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    flexDirection: 'row',
  },

  InputIcon: {
    marginHorizontal: 20,
  },

  search: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: 'white',
  },

  menu: {
    height: 90,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },

  item: {
    alignItems: 'center',
    marginHorizontal: 15,
  },

  image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 30,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'normal',
    color: 'orange',
  },
});

export default HomeScreen;
