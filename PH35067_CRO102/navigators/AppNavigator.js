import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import Register from '../screens/Register'
import HomeScreen from '../screens/HomeScreen'
import TabNavigator from './TabNavigator'
import DetailsScreen from '../screens/DetailsScreen'
import DrawerNavigator from './DrawerNavigator'
import PaymentScreen from '../screens/PaymentScreen'
import CartScreen from '../screens/CartScreen'
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen'

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={Splash}></Stack.Screen>
                <Stack.Screen name='Login' component={Login}></Stack.Screen>
                <Stack.Screen name='Register' component={Register}></Stack.Screen>
                <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
                <Stack.Screen name='TabNavigator' component={TabNavigator}></Stack.Screen>
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}></Stack.Screen>
                <Stack.Screen name='DetailsScreen' component={DetailsScreen}></Stack.Screen>
                <Stack.Screen name='PaymentScreen' component={PaymentScreen}></Stack.Screen>
                <Stack.Screen name='CartScreen' component={CartScreen}></Stack.Screen>
                <Stack.Screen name='PersonalDetailsScreen' component={PersonalDetailsScreen}></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})