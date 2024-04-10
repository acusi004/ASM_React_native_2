import { Image, ScrollView, StyleSheet, Text, TextInput, View, CheckBox, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { URL } from './HomeScreen';

const Register = ({ navigation }) => {

    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
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

    const getErrors = (email, username, password, repassword) => {
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

        if (!password) {
            errors.password = "Vui lòng nhập Password"
        } else if (password.length < 6) {
            errors.password = "Password phải có tối thiểu 6 ký tự"
        }

        if (!repassword) {
            errors.repassword = "Nhập lại Password"
        } else if (repassword.length < 6) {
            errors.repassword = "Password phải có tối thiểu 6 ký tự"
        } else if (password !== repassword) {
            errors.repassword = 'Password không khớp'

        }
        return errors;
    }
    const handelRegister = async () => {
        const errors = getErrors(email, username, password, repassword);
        if (Object.keys(errors).length > 0) {
            setshowErrors(true)
            seterrors(errors)
            console.log(errors);
        } else {
            const response = await fetch('https://661605dfb8b8e32ffc7c25cc.mockapi.io/users', {
                method: 'POST',
                body: JSON.stringify({
                    id: Date.now() + Math.random(),
                    username: username,
                    email: email,
                    password: password,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            const result = await response.json();
            if(result.id){
                seterrors({});
                setshowErrors(false);
                ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
                navigation.goBack();
            }

        }

    }


    return (
        <SafeAreaView style={st.background}>
            <KeyboardAvoidingView>

                <ScrollView>


                    {/* // Logo app */}

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                        <Image
                            resizeMode='contain'
                            source={require('../img/logo_login.png')}
                            style={{ width: 200, height: 120 }}
                        />
                    </View>

                    <Text style={st.welcom}>Welcom to Lungo !!</Text>
                    <Text style={st.welcom2}>Register to Continue</Text>

                    <View>
                        <TextInput
                            style={st.khung}
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

                    </View>

                    <View>
                        <TextInput
                            style={st.khung}
                            value={email}
                            onChangeText={(txt) => { setemail(txt) }}
                            placeholder="Email Address"
                            placeholderTextColor="gray"
                        />
                        {errors.email && (
                            <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                                {errors.email}
                            </Text>
                        )}

                    </View>


                    <View>
                        <TextInput
                            style={st.khung}
                            value={password}
                            onChangeText={(txt) => { setpassword(txt) }}
                            placeholder="Password"
                            placeholderTextColor="gray"
                            secureTextEntry={!showPassword}

                        />

                        {errors.password && (
                            <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                                {errors.password}
                            </Text>
                        )}


                        <TouchableOpacity
                            onPress={toggleShowPassword}
                            style={{ position: 'absolute', right: 40, top: 35 }}
                        >
                            <Image
                                source={showPassword ? require('../img/eye.png') : require('../img/eye1.png')} // Điều này phụ thuộc vào tên biểu tượng của thư viện bạn đang sử dụng
                                style={{ width: 24, height: 24, tintColor: 'white' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TextInput
                            style={st.khung}
                            value={repassword}
                            onChangeText={(txt) => { setrepassword(txt) }}
                            placeholder="Confirm password"
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
                            style={{ position: 'absolute', right: 40, top: 35 }}
                        >
                            <Image
                                source={showRePassword ? require('../img/eye.png') : require('../img/eye1.png')}
                                style={{ width: 24, height: 24, tintColor: 'white' }}
                            />
                        </TouchableOpacity>
                    </View>



                    <TouchableOpacity
                        onPress={() => handelRegister()}
                        style={st.khungButton}
                    >
                        <Text style={{ color: "white", textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Register</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: "gray", fontWeight: 'bold', textAlign: 'center', marginTop: 15 }}>
                            You have an account? Click</Text>

                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: "orange", fontWeight: 'bold', marginTop: 15 }}> Sign in</Text>
                        </TouchableOpacity>


                    </View>

                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register

const st = StyleSheet.create({
    background: { ...StyleSheet.absoluteFillObject, backgroundColor: "black" },
    welcom: { fontSize: 30, textAlign: "center", color: "white", fontWeight: 'bold' },
    welcom2: { fontSize: 20, textAlign: "center", color: "gray", marginTop: 20, fontWeight: 'bold' },
    khung: {
        borderColor: "orange", borderWidth: 1, borderRadius: 10, padding: 15, margin: 20
        , color: "white", fontSize: 20
    },
    khungButton: { backgroundColor: "#D2691E", borderWidth: 1, borderRadius: 25, padding: 15, margin: 15 },
    khungButton1: { backgroundColor: "#FFFFFF", borderWidth: 1, borderRadius: 25, padding: 15, margin: 15 },

})
