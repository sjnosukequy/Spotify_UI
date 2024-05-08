import { StyleSheet, Text, View, Pressable, TextInput, Dimensions } from 'react-native'
import { React, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



const LoginScreen = () => {
    const windowWidth = Dimensions.get('window').width;
    const width_80 = windowWidth * 85/100;
    const windowHeight = Dimensions.get('screen').height;
    const navigation = useNavigation();
    function authenticate() {
        navigation.navigate('main')
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
                    // style={styles.input}
                    // onChangeText={onChangeNumber}
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
                    // onChangeText={onChangeNumber}
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
                    // onPress={authenticate}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 5
                    }}
                >

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