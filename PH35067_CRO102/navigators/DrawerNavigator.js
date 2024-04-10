import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import TabNavigator from './TabNavigator';
import ContactScreen from '../screens/ContactScreen';
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';



const DrawerDEMO = createDrawerNavigator();

const About = ({navigation}) => {
    return(
       
             <SafeAreaView style={{ backgroundColor: "black", ...StyleSheet.absoluteFillObject }}>
             <View style={styles.headerBar}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <View>
                            <Image
                                source={require('../img/menu.png')}
                                style={{width: 40,height: 40}}
                                resizeMode="cover"
                            />
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.cart}>About</Text>
                    </View>

                </View>

                <Image
                                source={{uri: "https://tranhsondautranphu.com/wp-content/uploads/2021/07/tranh-tuong-quan-cafe-2.jpg"}}
                                style={{width: 'auto',height: 300}}
                                resizeMode="cover"
                            />
                              <View style={{marginVertical: 50, marginHorizontal: 20}}>
                        <Text style={styles.call}>Lungo Coffee</Text>
                        <Text style={styles.call1}>Email: Lungocoffee@gmail.com</Text>
                        <Text style={styles.call1}>Address: Số 23, Nguyễn Xiển, Thanh Xuân , Hà Nội</Text>
                        <Text style={styles.call1}>Phone: 09830072004</Text>
                    </View>
             </SafeAreaView>
       
    )
}

const MyDrawer = () => {
    return (
        <DrawerDEMO.Navigator initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} 
            />}
            screenOptions={{
                headerStyle: {
                  backgroundColor: 'black', 
                },
                headerTintColor: 'white', 
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                  drawerLabelStyle: {
                    color: 'white',
                    fontSize: 18, 
                    
                  },
                  headerShown: false,
                  
                 
              }}>
            <DrawerDEMO.Screen name="Home" component={TabNavigator} options={{
            }}/>
            <DrawerDEMO.Screen name="About" component={About} />
            <DrawerDEMO.Screen name="Contact" component={ContactScreen} />
        </DrawerDEMO.Navigator>
    );
}

const DrawerNavigator = () => {
  return (
    <MyDrawer />
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 150,
        color: "white",
    },
    call: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    call1: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',

    }

})