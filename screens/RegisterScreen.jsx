import { StyleSheet, Text, View, Pressable, TextInput, Dimensions } from 'react-native'
import { React, useCallback, useState, useContext, useEffect } from 'react'
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


const RegisterScreen = () => {

    const windowWidth = Dimensions.get('window').width;
    const width_80 = windowWidth * 85 / 100;
    const windowHeight = Dimensions.get('screen').height;
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [userName, setUserName] = useState("");

    const user_Context = useContext(Context);

    const [isArtist, setIsArtist] = useState(false);
    function artistCheck() {
        setIsArtist(!isArtist);
    }

    function showToast(message) {
        Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: message
        });
    }

    // useEffect(() => {
    //     storage
    //         .load({
    //             key: 'loginState',
    //         })
    //         .then(ret => {
    //             navigation.replace('main')
    //             console.log(ret.user);
    //         })
    //         .catch(err => {
    //             // any exception including data not found
    //             // goes to catch()
    //             // console.warn(err.message);
    //             switch (err.name) {
    //                 case 'NotFoundError':
    //                     // TODO;
    //                     break;
    //                 case 'ExpiredError':
    //                     // TODO
    //                     break;
    //             }
    //         })
    // }, [])

    async function authenticate() {
        try {
            const response = await axios.post(`/addUser`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'username': userName,
                'email': email,
                'nickname': nickName,
                'password': password
            });

            if (response.data) {
                if (response.data != 'Already exist user') {
                    //CREATE MY FAV PLAYLIST
                    await axios.post(`/addPlaylist`, {
                        'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                        'userid': response.data[0].id,
                        'title': 'My Favourite',
                        'image': null,
                        'info': null
                    }).then((res) => {
                        console.log('create playlist')
                    }).catch((error) => {
                        console.log(error)
                    })

                    //GET PLAYLIST
                    await axios.get('/getUserPlaylists', {
                        'params': { 'url': response.data[0].id }
                    }).then((res) => {
                        const user_data = { ...response.data[0], "playlist": res.data }
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
                else
                    showToast('Already exist an account');
            }
            else
                showToast('Wrong API KEY');
        }
        catch (error) {
            showToast('cannot connect to the server');
            console.log(error);
        }

    }

    function alrLogin() {
        navigation.navigate('login')
    }

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }} >
            <SafeAreaView>
                <View style={{ height: 30 }} />
                <Text
                    style={{
                        color: "white",
                        fontSize: 40,
                        marginLeft: 30,
                        marginRight: 'auto',
                        fontFamily: "Lexend_700Bold"
                    }}>
                    Sign up to start listening
                </Text>

                <View style={{ height: 40 }} />
                <Text
                    style={{
                        color: "gray",
                        marginLeft: 30,
                        marginBottom: 10,
                        fontFamily: "Lexend_300Light"
                    }}>
                    Email address
                </Text>

                <TextInput
                    id='EmailInput'
                    value={email}
                    onChangeText={(text) => { setEmail(text) }}
                    placeholder="Email@gmail.com"
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
                    }}
                />

                <Text
                    style={{
                        color: "gray",
                        marginLeft: 30,
                        marginBottom: 10,
                        fontFamily: "Lexend_300Light"
                    }}>
                    User name
                </Text>

                <TextInput
                    id='UserNameInput'
                    value={userName}
                    onChangeText={(text) => { setUserName(text) }}
                    placeholder="ErenYeager"
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
                    }}
                />

                <Text
                    style={{
                        color: "gray",
                        marginLeft: 30,
                        marginBottom: 10,
                        fontFamily: "Lexend_300Light"
                    }}>
                    Nick name
                </Text>

                <TextInput
                    id='NickNameInput'
                    value={nickName}
                    onChangeText={(text) => { setNickName(text) }}
                    placeholder="The Ursuper"
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
                    }}
                />

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

                {/* <View style={{ flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', marginBottom: 40 }}>
                    <Pressable style={{ marginRight: 10 }} onPress={artistCheck}>
                        {isArtist ? <MaterialIcons name="radio-button-checked" size={24} color="white" /> : <MaterialIcons name="radio-button-unchecked" size={24} color="white" />}
                    </Pressable>
                    <Text style={{
                        color: "white",
                        fontFamily: "Lexend_400Regular"
                    }}>Are you an Artist?</Text>
                </View> */}

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
                        }}>Sign In</Text>
                </Pressable>

                <Pressable
                    onPress={alrLogin}
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
                        }}>Already have an account?</Text>
                </Pressable>

            </SafeAreaView>
        </LinearGradient>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})