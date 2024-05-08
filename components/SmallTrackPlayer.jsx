import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import TrackPlayer from "react-native-track-player";


const smallTrackPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const navigation = useNavigation();
    function HandlePlay() {
        setIsPlaying(!isPlaying)
        if (isPlaying)
            TrackPlayer.play();
        else
            TrackPlayer.pause();
    }

    function handlePress() {
        navigation.navigate('playerFull');
    }

    return (
        <Pressable
            onPress={handlePress}
            style={{ flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "rgba(0,0,0, 0.9)" }}>
            <Image style={{ width: 50, height: 50, marginRight: 10 }}
                contentFit="cover"
                source="https://pic.re/image"
            // transition={1000} 
            />

            <View style={{ flex: 1 }}>
                <Text
                    numberOfLines={1}
                    style={{ fontFamily: "Lexend_700Bold", fontSize: 14, color: "white" }}>
                    Đá tan
                </Text>

                <Text style={{ marginTop: 4, color: "#989898", fontFamily: "Lexend_300Light", }}>
                    Ngọt
                </Text>
            </View>

            <Pressable onPress={HandlePlay} style={{ marginRight: 10 }}>
                {isPlaying ? <FontAwesome name="play" size={24} color="white" /> : <FontAwesome name="pause" size={24} color="white" />}
            </Pressable>

        </Pressable>
    );
};

export default smallTrackPlayer;

const styles = StyleSheet.create({});