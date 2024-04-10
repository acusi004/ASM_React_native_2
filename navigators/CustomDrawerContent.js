import { StyleSheet, Text, View, Image, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'


const MyHeader = ()=>{
    return (<View style={{height: 200, width:'100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#252A32'}}>
     <Image
      source={require('../img/logo_splash.png')}
      style = {{width: 100, height: 100, marginBottom: 20}}
      />
    
    </View>)
   }

   const handleLogout = (props) => {
    Alert.alert(
      'Xác nhận',
      'Are you sure want to log out?',
      [
        {
          text: 'No',
          onPress: () =>  ToastAndroid.show('Hủy đăng xuất', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            if (props && props.navigation) {
              ToastAndroid.show('Đăng xuất thành công', ToastAndroid.SHORT)
                props.navigation.navigate('Login');
              }
          },
        },
      ],
      { cancelable: false }
    );
  };

const CustomDrawerContent = (props) => {
    return (
             <DrawerContentScrollView {...props} style={{ backgroundColor: '#252A32', borderRightColor: 'orange', borderWidth: 1 }}>
                <MyHeader />
                <DrawerItemList {...props} />
                <DrawerItem label="Log out" onPress={() =>  {
                    handleLogout(props)
                  }} 
                  labelStyle={{ color: 'white', fontSize: 18, }} />
              </DrawerContentScrollView>
   
   
    );
   }

export default CustomDrawerContent

const styles = StyleSheet.create({})