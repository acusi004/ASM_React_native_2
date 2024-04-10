import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import ContactScreen from '../screens/ContactScreen'
import { Image } from 'react-native'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            
            tabBarBackground: () => (
                <View style = {styles.tabBarStyle}></View>
            ),
            tabBarIcon: ({ color, size, focused }) => {
                let iconName;

                if (route.name  === "Home") {
                    iconName = focused ? require('../img/home.png'): require('../img/home.png');
                } else if (route.name === "Cart") {
                    iconName = focused ? require('../img/cart.png'): require('../img/cart.png');
                } else if (route.name  === "Favorite") {
                    iconName = focused ? require('../img/heart.png'): require('../img/heart.png');
                } else if (route.name  === "OrderHistoryScreen") {
                    iconName = focused ? require('../img/bell.png'): require('../img/bell.png');
                }
                
                // return <Icon name={iconName} size={22} color={color} />
                return (
                    <Image
                        source={iconName}
                        style={{ width: 22, height: 22, tintColor: color }}
                    />
                );
            },

        })}

        >
            <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>

            <Tab.Screen name="Cart" component={CartScreen}></Tab.Screen>

            <Tab.Screen name="Favorite" component={FavoritesScreen}></Tab.Screen>

            <Tab.Screen name="OrderHistoryScreen" component={OrderHistoryScreen}></Tab.Screen>

        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 55,      
        backgroundColor: "black",
        borderTopWidth: 0,
        position: 'relative',
        elevation: 0,
        borderTopColor: 'black'
    },

    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})