import { StyleSheet, Text, View, Pressable, TextInput, Dimensions } from 'react-native'
import { React, useCallback, useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "../api/axios";
import Context from '../Providers/Context';
import Toast from 'react-native-toast-message';
import storage from '../services/storage';

const LoginScreen = () => {

    const windowWidth = Dimensions.get('window').width;
    const width_80 = windowWidth * 85 / 100;
    const windowHeight = Dimensions.get('screen').height;
    const navigation = useNavigation();
    const data = useState();
    const user_Context = useContext(Context);

    const [email, setEmail] = useState("");// State for email input
    const [password, setPassword] = useState("");// State for password input

     // Function to display toast message
    function showToast(message) {
        Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: message
        });
    }
// Effect hook to check if user is already logged in
    useEffect(() => {
        storage
            .load({
                key: 'loginState',
            })
            .then(ret => {
                // found data goes to then()
                user_Context.setUser(ret.user)
                navigation.replace('main')
                console.log(ret.user);
            })
            .catch(err => {
                // any exception including data not found
                // goes to catch()
                // console.warn(err.message);
                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }
            })
    }, [])
 // Function to authenticate user
    async function authenticate() {
        try {
            const response = await axios.post(`/getUser`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'username': email,
                'password': password
            });

            if (response.data) {
                if (response.data[0]['ban'])
                    showToast('Sorry you have been banned');
                else {
                    await axios.get('/getUserPlaylists', {
                        'params': { 'url': response.data[0].id }
                    }).then((res) => {
                        const user_data= {...response.data[0], "playlist": res.data}
                        user_Context.setUser(user_data)
                        storage.save({
                            key: 'loginState',
                            data: {
                                user: user_data
                            },
                            expires: null
                        })
                        navigation.replace('main')
                    }).catch((error) => {
                        showToast('cannot connect to the server');
                    })
                }
            }
            else
                showToast('Wrong email or password');
        }
        catch (error) {
            showToast('cannot connect to the server');
            console.log(error);
        }
    }
    // Function to navigate to registration screen
    function alrRegis() {
        navigation.navigate('register')
    }

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }} >
            <SafeAreaView>
                <View style={{ height: 80 }} />
                {/* <Entypo
                    style={{ textAlign: "center" }}
                    name="spotify"
                    size={100}
                    color="white"
                /> */}
                <Text
                    style={{
                        color: "white",
                        fontSize: 40,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontFamily: "Lexend_700Bold"
                    }}>
                    Log in to Muzzix!
                </Text>

                <View style={{ height: 80 }} />
                <Text
                    style={{
                        color: "gray",
                        marginLeft: 30,
                        marginBottom: 10,
                        fontFamily: "Lexend_300Light"
                    }}>
                    Email or Username
                </Text>

                <TextInput
                    id='EmailInput'
                    value={email}
                    // style={styles.input}
                    onChangeText={(text) => { setEmail(text) }}
                    placeholder="Email or Username"
                    placeholderTextColor="white"
                    style={{
                        fontFamily: "Lexend_400Regular",
                        color: 'white',
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: width_80,
                        padding: 10,
                        borderWidth: 1,
                        marginBottom: 20,
                        borderColor: "gray"
                    }} />

                <Text
                    style={{
                        color: "gray",
                        marginLeft: 30,
                        marginBottom: 10,
                        fontFamily: "Lexend_300Light"
                    }}>
                    Password
                </Text>

                <TextInput
                    id='PassInput'
                    // style={styles.input}
                    value={password}
                    onChangeText={(text) => { setPassword(text) }}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}

                    style={{
                        fontFamily: "Lexend_400Regular",
                        color: 'white',
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: width_80,
                        padding: 10,
                        borderWidth: 1,
                        marginBottom: 20,
                        borderColor: "gray"
                    }} />

                <Pressable
                    onPress={authenticate}
                    style={{
                        backgroundColor: "#08E355",
                        padding: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: width_80,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10
                    }}
                >

                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: "Lexend_700Bold",
                        }}>Log In</Text>
                </Pressable>

                <View style={{ height: 80 }} />
                <Text
                    style={{
                        color: "gray",
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontSize: 15,
                        fontFamily: "Lexend_400Regular"
                    }}>Don't have an account?</Text>

                <Pressable
                    onPress={alrRegis}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 5
                    }}>

                    <Text
                        style={{
                            color: "white",
                            textDecorationLine: "underline",
                            fontSize: 20,
                            fontFamily: "Lexend_700Bold"
                        }}>Sign Up</Text>
                </Pressable>

            </SafeAreaView>
        </LinearGradient>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})