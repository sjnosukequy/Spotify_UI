import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState, memo } from "react";
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import TrackPlayer, { useActiveTrack, State, useIsPlaying } from "react-native-track-player";
import TextTicker from 'react-native-text-ticker';

// Component for rendering a small track player
const smallTrackPlayer = () => {
    const active_track = useActiveTrack(); // Get the currently active track
    const isPlaying = useIsPlaying().playing; // Check if a track is currently playing
    const navigation = useNavigation(); // Access navigation methods
    const rnd_id = new Date().getTime(); // Generate a random ID for image URL

    // Function to handle play/pause button press
    function HandlePlay() {
        if (!isPlaying)
            TrackPlayer.play(); // If not playing, start playing
        else
            TrackPlayer.pause(); // If playing, pause
    }

    // Function to handle press event on the track player
    function handlePress() {
        navigation.navigate('playerFull'); // Navigate to full player screen
    }

    return (
        <Pressable
            onPress={handlePress}
            style={{ flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "rgba(0,0,0, 0.9)" }}>
            {/* Display the track artwork */}
            <Image style={{ width: 50, height: 50, marginRight: 10 }}
                contentFit="cover"
                source={active_track?.artwork || `https://picsum.photos/seed/${rnd_id}/300/300`}
            />

            <View style={{ flex: 1, marginRight: 30 }}>
                {/* Display the track title with scrolling effect */}
                <TextTicker
                    scrollSpeed={50}
                    numberOfLines={1}
                    style={{ fontFamily: "Lexend_700Bold", fontSize: 14, color: "white" }}>
                    {active_track?.title || "Test Title"}
                </TextTicker>

                {/* Display the track artist with scrolling effect */}
                <TextTicker style={{ marginTop: 4, color: "#989898", fontFamily: "Lexend_300Light", }} numberOfLines={1} scrollSpeed={100}>
                    {active_track?.artist || "Test Artist"}
                </TextTicker>
            </View>

            {/* Play/Pause button */}
            <Pressable onPress={HandlePlay} style={{ marginRight: 10 }}>
                {isPlaying ? <FontAwesome name="pause" size={24} color="white" /> : <FontAwesome name="play" size={24} color="white" />}
            </Pressable>

        </Pressable>
    );
};

export default memo(smallTrackPlayer); // Memoize the component for performance optimization

const styles = StyleSheet.create({}); // Define styles for the component
