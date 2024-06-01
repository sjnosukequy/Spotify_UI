// Importing required modules and components from react-native, react, and other libraries
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

// AiChat functional component
const AiChat = () => {
    // Get the playback state from track player
    const playback_state = usePlaybackState();
    const playback_state_none = playback_state.state === State.None; // Check if playback state is None
    const playback_state_stop = playback_state.state === State.Stopped; // Check if playback state is Stopped
    const playback_state_flag = playback_state_none || playback_state_stop; // Combine flags for None and Stopped states

    // Get window dimensions for responsive design
    const windowWidth = Dimensions.get('window').width;
    const width_80 = windowWidth * 85 / 100;
    const windowHeight = Dimensions.get('screen').height;
    
    // Navigation hook
    const navigation = useNavigation();

    // Get the user context
    const user_Context = useContext(Context);

    // State hooks for managing chat content and chat history
    const [content, setContent] = useState('');// State for the input content

    const [chat, setChat] = useState([]);// State for the chat history

    // Function to handle chat submission
    async function handleChat() {
        if (content.length != 0 && chat.length % 2 == 0) {
            showToast('Chat Bot is thinking', 'success')// Show toast message
            let chat_local = [...chat] // Copy current chat history
            chat_local.push(content) // Add user input to chat history
            await axios.post(`/askAI`, { // Make API request to AI service
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}', // API key (should be secured)
                'question': content // User's question
            }).then((res) => {
                const data = res.data
                // console.log(res.data)
                if (data == '') {
                    chat_local.push("Cannot chat to the AI right now")// Handle empty response
                }
                else
                    chat_local.push(data) // Add AI response to chat history
            }).catch((Error) => {
                chat_local.push("Cannot chat to the AI right now")
            });
            setChat(chat_local)// Update chat state
            setContent('')// Clear input content
        }
        else {
            showToast('Please wait for the chatbot to response', 'info')
        }
    }

    // Function to show toast messages
    function showToast(message, type) {
        Toast.show({
            type: type,
            text1: 'Hello',
            text2: message
        });
    }

    // JSX for rendering the AI Chat component
    return (
        <LinearGradient colors={["#030008", "#111111"]} style={{ flex: 1 }} >
            <SafeAreaView style={{ paddingHorizontal: 20, paddingBottom: 20, flex: 1 }}>
                <View style={{ flexDirection: 'row', paddingRight: 8, marginTop: 10 }}>
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
                    marginBottom: 30,
                    marginLeft: 10
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

                <View style={{flex: 1}}>
                    <ScrollView>
                        {   // Styles for the AiChat component
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
// Export the AiChat component as the default export
export default AiChat

const styles = StyleSheet.create({})