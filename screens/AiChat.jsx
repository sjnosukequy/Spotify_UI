import { StyleSheet, Text, View, Pressable, TextInput, Dimensions, ScrollView } from 'react-native'
import { React, useCallback, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "../api/axios";
import Context from '../Providers/Context';
import { Image } from 'expo-image';
import Toast from 'react-native-toast-message';
import storage from '../services/storage';
import { usePlaybackState, State } from "react-native-track-player";


const AiChat = () => {
    const playback_state = usePlaybackState();
    const playback_state_none = playback_state.state === State.None
    const playback_state_stop = playback_state.state === State.Stopped
    const playback_state_flag = playback_state_none || playback_state_stop

    const windowWidth = Dimensions.get('window').width;
    const width_80 = windowWidth * 85 / 100;
    const windowHeight = Dimensions.get('screen').height;
    const navigation = useNavigation();
    const user_Context = useContext(Context);
    const [content, setContent] = useState('');

    const [chat, setChat] = useState([]);

    async function handleChat() {
        if (content.length != 0 && chat.length % 2 == 0) {
            showToast('Chat Bot is thinking', 'success')
            let chat_local = [...chat]
            chat_local.push(content)
            await axios.post(`/askAI`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'question': content
            }).then((res) => {
                const data = res.data
                // console.log(res.data)
                if (data == '') {
                    chat_local.push("Cannot chat to the AI right now")
                }
                else
                    chat_local.push(data)
            }).catch((Error) => {
                chat_local.push("Cannot chat to the AI right now")
                // showToast("Cannot chat to the AI right now")
            });
            setChat(chat_local)
            setContent('')
        }
        else {
            showToast('Please wait for the chatbot to response', 'info')
        }
    }


    function showToast(message, type) {
        Toast.show({
            type: type,
            text1: 'Hello',
            text2: message
        });
    }


    return (
        <LinearGradient colors={["#030008", "#111111"]} style={{ flex: 1 }} >
            <SafeAreaView style={{ paddingHorizontal: 20, paddingBottom: 20 }}>

                <View style={{ flexDirection: 'row', paddingRight: 7 }}>
                    <View style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}>
                        <Text style={{ color: "white", fontSize: 20, fontFamily: "Lexend_400Regular", }}>AI CHAT MUSIC</Text>
                    </View>
                    <Pressable onPress={() => {
                        setChat([])
                    }}>
                        <AntDesign name="reload1" size={24} color="white" />
                    </Pressable>
                </View>

                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 30
                }}>
                    <TextInput style={{
                        fontFamily: "Lexend_400Regular",
                        color: 'white',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderWidth: 1,
                        flex: 1,
                        borderColor: "gray"
                    }}
                        value={content}
                        onChangeText={(text) => { setContent(text) }}
                    ></TextInput>
                    <Pressable onPress={handleChat}>
                        <MaterialCommunityIcons name="send-circle" size={40} color="white" />
                    </Pressable>
                </View>
                <View>
                    <ScrollView >
                        {
                            chat.map((item, index) => {
                                // <Text style={{color: 'white'}}>{item}</Text>
                                if (index % 2 == 0)
                                    return (
                                        <View key={index} style={{
                                            alignSelf: 'flex-end',
                                        }}>
                                            <Text style={{
                                                backgroundColor: '#0084ff',
                                                padding: 5,
                                                borderRadius: 5,
                                                color: 'white',
                                                marginBottom: 30,
                                                fontFamily: "Lexend_400Regular",
                                                maxWidth: windowWidth * 50 / 100
                                            }}> {item} </Text>
                                        </View>
                                    )
                                else
                                    return (
                                        <View key={index}>
                                            <Text style={{
                                                color: 'white',
                                                padding: 5,
                                                borderRadius: 5,
                                                backgroundColor: '#242526',
                                                marginBottom: 30,
                                                alignSelf: 'flex-start',
                                                fontFamily: "Lexend_400Regular",
                                                maxWidth: windowWidth * 50 / 100
                                            }}>{item}</Text>
                                        </View>
                                    )
                            })
                        }
                    </ScrollView>
                </View>

            </SafeAreaView>
        </LinearGradient>
    )
}

export default AiChat

const styles = StyleSheet.create({})