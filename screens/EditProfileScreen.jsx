import { StyleSheet, Text, View, Pressable, TextInput, Dimensions, ScrollView } from 'react-native'
import { React, useCallback, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "../api/axios";
import Context from '../Providers/Context';
import { Image } from 'expo-image';
import Toast from 'react-native-toast-message';
import storage from '../services/storage';



const EditProfileScreen = () => {

    const windowWidth = Dimensions.get('window').width;// Get window width
    const width_80 = windowWidth * 85 / 100;// Calculate 85% of window width
    const windowHeight = Dimensions.get('screen').height;// Get screen height
    const navigation = useNavigation();// Get navigation object
    const user_Context = useContext(Context);// Get user context

    // State variables
    const [email, setEmail] = useState(user_Context.user.email);
    const [password, setPassword] = useState(user_Context.user.password);
    const [nickName, setNickName] = useState(user_Context.user.nickname);
    const [userName, setUserName] = useState(user_Context.user.username);
    const [isArtist, setIsArtist] = useState(false);

    // Function to toggle artist status
    function artistCheck() {
        setIsArtist(!isArtist);
    }

    // Function to show toast notification
    function showToast(message, type) {
        Toast.show({
            type: type,
            text1: 'Hello',
            text2: message
        });
    }

     // Function to authenticate and update user profile
    async function authenticate() {
        try {
            const response = await axios.post(`/updateUser`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'id': user_Context.user.id,
                'username': userName,
                'email': email,
                'nickname': nickName,
                'password': password,
            });

            if (response.data) {
                const user = { ...response.data[0], 'playlist': user_Context.user.playlist }
                user_Context.setUser(user)
                showToast('Update successfully', 'success');
                // console.log(user_Context.user.id)
                // navigation.navigate('profile')
            }
        }
        catch (error) {
            showToast('cannot connect to the server', 'error');
            console.log(error);
        }
    }

    // Function to perform logout
    function alrLogin() {
        user_Context.setUser({
            'id': 0,
            'username': 'vcl',
            'nickname': 'nizzapom',
            'email': 'hohoho@',
            'password': '123',
            'playlist': []
        })
        storage.remove({
            key: 'loginState'
        })
        navigation.replace('login')
    }

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }} >
            <SafeAreaView>
                <ScrollView style={{ marginTop: 50 }}>
                    {/* Title */}   
                    <Text
                        style={{
                            color: "white",
                            fontSize: 40,
                            marginLeft: 30,
                            marginRight: 'auto',
                            fontFamily: "Lexend_700Bold"
                        }}>
                        Edit Profile
                    </Text>

                    <View style={{ height: 40 }} />
                     {/* Profile Image */}
                    <Image
                        source="https://picsum.photos/200"
                        contentFit='cover'
                        style={{
                            width: 200,
                            height: 200,
                            marginBottom: 40,
                            borderRadius: 100,
                            marginLeft: 'auto', marginRight: 'auto'
                        }} />
                    {/* Email */}
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
                     {/* User name */}
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
                    {/* Nick name */}
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
                    {/* Password */}
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

                    {/* Update Button */}
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
                            }}>Update</Text>
                    </Pressable>
                    
                    {/* Logout Button */}
                    <Pressable
                        onPress={alrLogin}
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
                            }}>Log out</Text>
                    </Pressable>

                     {/* Artist Option */}
                    <Text
                        style={{
                            fontSize: 20,
                            color: 'white',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontFamily: "Lexend_700Bold",
                            marginTop: 30
                        }}>Want to be an artist?</Text>
                    <Text
                        style={{
                            fontSize: 20,
                            color: 'white',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontFamily: "Lexend_400Regular",
                            marginTop: 5,
                            marginBottom: 30
                        }}>Visit http://muzzix.us.to/ </Text>

                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})