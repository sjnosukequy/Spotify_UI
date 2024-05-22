import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState, memo } from "react";
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import TrackPlayer, { useActiveTrack, State, useIsPlaying } from "react-native-track-player";
import TextTicker from 'react-native-text-ticker'


const smallTrackPlayer = () => {
    const active_track = useActiveTrack()
    const isPlaying = useIsPlaying().playing;
    const navigation = useNavigation();
    const rnd_id = new Date().getTime()
    function HandlePlay() {
        if (!isPlaying)
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
                source={active_track?.artwork || `https://picsum.photos/seed/${rnd_id}/300/300`}
            // transition={1000} 
            />

            <View style={{ flex: 1, marginRight: 30 }}>
                <TextTicker
                    scrollSpeed={50}
                    numberOfLines={1}
                    style={{ fontFamily: "Lexend_700Bold", fontSize: 14, color: "white" }}>
                    {active_track?.title || "Test Title"}
                </TextTicker>

                <Text style={{ marginTop: 4, color: "#989898", fontFamily: "Lexend_300Light", }}>
                    {active_track?.artist || "Test Artist"}
                </Text>
            </View>

            <Pressable onPress={HandlePlay} style={{ marginRight: 10 }}>
                {isPlaying ? <FontAwesome name="pause" size={24} color="white" /> : <FontAwesome name="play" size={24} color="white" />}
            </Pressable>

        </Pressable>
    );
};

export default memo(smallTrackPlayer);

const styles = StyleSheet.create({});