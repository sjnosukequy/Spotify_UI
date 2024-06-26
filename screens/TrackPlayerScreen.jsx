import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { Image } from 'expo-image';
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import TrackCard from "../components/TrackCard";
import axios from "../api/axios";
import { decode } from 'html-entities';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useActiveTrack, useIsPlaying, useProgress } from "react-native-track-player";
import Context from '../Providers/Context';
import Toast from 'react-native-toast-message';
import TextTicker from 'react-native-text-ticker'

// Define a screen component for playing tracks
const TrackPlayerScreen = () => {
    // Retrieve the user context
    const user_Context = useContext(Context);
    // Retrieve information about the currently playing track
    const active_track = useActiveTrack();
    // Check if a track is currently playing
    const isPlaying = useIsPlaying().playing;
    // Get the progress of the currently playing track
    const { position, duration } = useProgress(200);

     // Function to format time in minutes and seconds
    function format(seconds) {
        let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    // Get the dimensions of the screen
    const windowWidth = Dimensions.get('window').width;
    const width_80 = windowWidth * 80 / 100;
    const windowHeight = Dimensions.get('screen').height;

    // Retrieve the current route and navigation object
    const route = useRoute();
    const navigation = useNavigation();

    // State to manage the like button color
    const [likeColor, setLikeColor] = useState(false);

    // Function to handle liking a track
    async function handleLike() {
        // Toggle the like button color
        setLikeColor(!likeColor);
        // console.log(likeColor)
        if (!likeColor) {
            await axios.post(`/addPlaylistTrack`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'playlistid': user_Context.user?.playlist[0]?.id,
                'name': active_track?.title,
                'link': active_track?.url,
                'image': active_track?.artwork || "https://picsum.photos/200",
                'artist': active_track?.artist,
            }).then((res) => {
                if (Array.from(res.data).length == 0)
                    showToast("The song already exist in the favourite")
            }).catch((Error) => {
                showToast("The song already exist in the favourite")
            });
        } else {
            // If the track is already liked, remove it from the user's playlist
            await axios.post(`/delPlaylistTrack`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'playlistid': user_Context.user?.playlist[0]?.id,
                'name': active_track?.title,
            }).then((res) => {
                // console.log(res.data)
            }).catch((Error) => {
                showToast("The song does not exist in the favourite")
            });
        }
    }

    // Function to handle playing or pausing the track
    function handlePlay() {
        if (!isPlaying)
            TrackPlayer.play();
        else
            TrackPlayer.pause();
    }

     // Function to display toast messages
    function showToast(message) {
        Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: message
        });
    }


    // Render the TrackPlayer screen
    return (
        <LinearGradient colors={["#131624", "#131624"]} end={{ x: 0.5, y: 0.4 }} style={{ flex: 1 }}>
            <View style={{ marginTop: 30, padding: 20 }}>
                <AntDesign style={{ marginLeft: 20 }} onPress={() => navigation.goBack()} name="down" size={24} color="white" />

                <View style={{ alignItems: "center", marginTop: 40 }}>
                    <Image
                        contentFit="cover"
                        style={{ width: width_80, height: width_80 }}
                        source={active_track?.artwork || "https://pic.re/image"} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30, paddingHorizontal: 20 }}>
                    <View style={{ flex: 1, paddingRight: 50 }}>
                        <TextTicker
                            scrollSpeed={50}
                            numberOfLines={1}
                            style={{
                                color: "white",
                                fontSize: 25,
                                fontFamily: "Lexend_700Bold"
                            }}
                        >
                            {active_track?.title || "Tile"}
                            {/* {decode(route.params["title"])} */}
                        </TextTicker>
                        <TextTicker
                            numberOfLines={1}
                            scrollSpeed={100}
                            style={{
                                color: "gray",
                                fontSize: 17,
                                fontFamily: "Lexend_300Light",
                            }}
                        >
                            {active_track?.artist || "Artist"}
                        </TextTicker>
                    </View>
                    <Pressable
                        onPress={handleLike}
                        style={{
                            marginTop: 7
                        }}>
                        {
                            likeColor ? <AntDesign name="heart" size={25} color="#3FFF00" /> : <AntDesign name="hearto" size={25} color="gray" />
                        }
                    </Pressable>
                </View>

                <Slider
                    style={{ marginTop: 15, marginHorizontal: 5 }}
                    value={position}
                    minimumValue={0}
                    maximumValue={duration}
                    thumbTintColor="white"
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="#fff"
                    onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
                />

                <View style={{ flexDirection: 'row', marginTop: 1, paddingHorizontal: 20 }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            color: "white",
                            fontSize: 14,
                            fontFamily: "Lexend_400Regular",
                        }} >
                        {format(position)}
                    </Text>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 14,
                            fontFamily: "Lexend_400Regular",
                        }}>
                        {format(duration)}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30, paddingHorizontal: 20, justifyContent: 'space-evenly', alignItems: 'center' }}>

                    <Pressable onPress={() => TrackPlayer.skipToPrevious()}>
                        <Entypo name="controller-jump-to-start" size={50} color="white" />
                    </Pressable>

                    <Pressable onPress={handlePlay}>
                        {
                            isPlaying ? <AntDesign name="pausecircle" size={60} color="white" /> :
                                <AntDesign name="play" size={60} color="white" />
                        }
                    </Pressable>

                    <Pressable onPress={() => TrackPlayer.skipToNext()}>
                        <Entypo name="controller-next" size={50} color="white" />
                    </Pressable>
                </View>

            </View>
        </LinearGradient>
    );
};

export default TrackPlayerScreen;

const styles = StyleSheet.create({});