import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './HomeScreen';

const PersonalDetailsScreen = ({ navigation, route }) => {
    const initialUsername = route.params?.username || '';
    const initialEmail = route.params?.email || '';
    const [username, setusername] = useState(initialUsername);
    const [email, setemail] = useState(initialEmail);
    const [newpassword, setnewpassword] = useState('');
    const [repassword, setrepassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowRePassword = () => {
        setShowRePassword(!showRePassword);
    };

    const [showErrors, setshowErrors] = useState(false);
    const [errors, seterrors] = useState({});

    useEffect(() => {
        const getLoginInfo = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
                const email = await AsyncStorage.getItem('email');
                if (username !== null && email !== null) {
                    setusername(username);
                    setemail(email);

                }
            } catch (e) {
                console.log(e);
            }
        };

        getLoginInfo();
    }, []);


    const getErrors = (email, username, newpassword, repassword) => {
        const errors = {};



        if (!email) {
            errors.email = "Vui lòng nhập Email"
        } else if (!email.includes('@') || !email.includes('.')) {
            errors.email = "Email không hợp lệ";
        }

        if (!username) {
            errors.username = "Vui lòng nhập Username"
        } else if (username.length < 6) {
            errors.username = "Username phải có tối thiểu 6 ký tư"
        }



        if (!newpassword) {
            errors.newpassword = "Vui lòng nhập New-Password"
        } else if (newpassword.length < 6) {
            errors.newpassword = "Password phải có tối thiểu 6 ký tự"
        }

        if (!repassword) {
            errors.repassword = "Nhập lại Password"
        } else if (repassword.length < 6) {
            errors.repassword = "Password phải có tối thiểu 6 ký tự"
        } else if (newpassword !== repassword) {
            errors.repassword = 'Password không khớp'

        }
        return errors;
    }




    const handelSave = async () => {
        const errors = getErrors(email, username, newpassword, repassword);


        if (Object.keys(errors).length > 0) {
            setshowErrors(true)
            seterrors(errors)
            console.log(errors);
        } else {
            const responseUser = await fetch('https://661605dfb8b8e32ffc7c25cc.mockapi.io/users');
            const dataUser = await responseUser.json();
            const emailStorage = await AsyncStorage.getItem('email');
            const indexUser = dataUser.findIndex(item => item.email === emailStorage);
            if(indexUser !== -1){
                const response = await fetch(`https://661605dfb8b8e32ffc7c25cc.mockapi.io/users/${dataUser[indexUser].id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: newpassword,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })

                const result = await response.json();
                if (result.id) {
                    seterrors({});
                    setshowErrors(false);
                    ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
                    navigation.goBack();
                }
            }
        }
        try {
            // Lưu thông tin đăng nhập vào AsyncStorage
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('email', email);

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: "black", ...StyleSheet.absoluteFillObject }}>
  <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
            <ScrollView>

                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View>
                            <Image
                                source={require('../img/back1.png')}
                                style={styles.image1}
                                resizeMode="cover"
                            />
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.cart}>Personal Details</Text>
                    </View>

                </View>



                <View style={styles.ImageContainer}>


                    <Image
                        source={require('../img/info.png')}
                        style={{ width: 150, height: 150, alignSelf: 'center', margin: 20 }}
                        resizeMode="cover"
                    />

                </View>

                <TextInput
                    style={styles.khung}
                    value={username}
                    onChangeText={(txt) => { setusername(txt) }}
                    placeholder="Username"
                    placeholderTextColor="gray"


                />

                {errors.username && (
                    <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                        {errors.username}
                    </Text>
                )}

                <TextInput
                    style={styles.khung}
                    value={email}
                    onChangeText={(txt) => { setemail(txt) }}
                    placeholder="Email"
                    placeholderTextColor="gray"


                />
                {errors.email && (
                    <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                        {errors.email}
                    </Text>
                )}




                <View>
                    <TextInput
                        style={styles.khung}
                        value={newpassword}
                        onChangeText={(txt) => { setnewpassword(txt) }}
                        placeholder="New Password"
                        placeholderTextColor="gray"
                        secureTextEntry={!showPassword}

                    />
                    {errors.newpassword && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.newpassword}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={toggleShowPassword}
                        style={{ position: 'absolute', right: 40, top: 40 }}
                    >
                        <Image
                            source={showPassword ? require('../img/eye.png') : require('../img/eye1.png')}
                            style={{ width: 24, height: 24, tintColor: 'white' }}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <TextInput
                        style={styles.khung}
                        value={repassword}
                        onChangeText={(txt) => { setrepassword(txt) }}
                        placeholder="Re-Password"
                        placeholderTextColor="gray"
                        secureTextEntry={!showRePassword}

                    />
                    {errors.repassword && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.repassword}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={toggleShowRePassword}
                        style={{ position: 'absolute', right: 40, top: 40 }}
                    >
                        <Image
                            source={showRePassword ? require('../img/eye.png') : require('../img/eye1.png')}
                            style={{ width: 24, height: 24, tintColor: 'white' }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                onPress={() => handelSave()}
                style={styles.khungButton}

            >
                <Text style={{ color: "white", textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>


            </ScrollView>

            </KeyboardAvoidingView>




        </SafeAreaView>
    )
}

export default PersonalDetailsScreen

const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 110,
        color: "white",
    },
    khung: {
        borderColor: "orange",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        margin: 20,
        color: "white",
        fontSize: 20
    },
    khungButton: {
        backgroundColor: "#D2691E",
        borderWidth: 1,
        borderRadius: 25,
        padding: 15,
        margin: 15
    },


})
