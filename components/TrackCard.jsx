import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState, useEffect, memo } from "react";
import { Image } from 'expo-image';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { decode } from 'html-entities';
import TrackPlayer from "react-native-track-player";
import { addTrack } from "../controller/musicController";
import axios from "../api/axios";
import Toast from 'react-native-toast-message';
import { useActiveTrack, useIsPlaying, useProgress } from "react-native-track-player";
import Context from '../Providers/Context';

// Component for rendering each track card
const TrackCard = ({ item }) => {
    const active_track = useActiveTrack(); // Get the currently active track
    const user_Context = useContext(Context); // Access user context
    const [data, setData] = useState(); // State for storing fetched data
    const [fetching, setFetch] = useState(true); // State for fetching status
    const rnd_id = new Date().getTime(); // Generate a random ID for image URL

    // If the item image is null, set a placeholder image URL
    if (item.image == null)
        item.image = `https://picsum.photos/seed/${rnd_id}/300/300`;

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from the server
    const fetchData = async () => {
        try {
            const response = await axios.get(`/download?url=https://www.youtube.com/${item.link}`);
            setData(response.data);
            setFetch(false);
            if (item?.playList) {
                await item.splayList(playlist => [...playlist, {
                    id: playlist.length,
                    url: response.data,
                    artwork: item.image,
                    title: item.name,
                    artist: item.artist,
                    isLiveStream: false,
                }])
                if (item.playListMode)
                    await addTrack({
                        id: item.playList.length,
                        url: response.data,
                        artwork: item.image,
                        title: item.name,
                        artist: item.artist,
                        isLiveStream: false,
                    }, false)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [isPlaying, setPlaying] = useState(false); // State for playing status
    const [likeColor, setLikeColor] = useState(false); // State for like button color

    // Function to display a toast message
    function showToast(message) {
        Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: message
        });
    }

    // Function to handle press event on the track card
    async function handlePress() {
        if (!fetching) {
            if (!isPlaying) {
                setPlaying(true);
                let track = {
                    id: '1',
                    url: data,
                    artwork: item.image,
                    title: item.name,
                    artist: item.artist,
                    isLiveStream: false,
                }
                await addTrack(track, true);
                await TrackPlayer.play();
                setTimeout(() => {
                    setPlaying(false)
                }, 3000);
            } else
                showToast('The song is playing 👋')
        }
        else
            showToast('The song is still loading 👋')
    }

    // Function to handle like button press
    async function handleLike() {
        setLikeColor(!likeColor); // Toggle like button color
        if (!likeColor) {
            // Add the track to the user's favorite playlist
            await axios.post(`/addPlaylistTrack`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'playlistid': user_Context.user?.playlist[0]?.id,
                'name': item.name,
                'link': data,
                'image': item?.image || `https://picsum.photos/seed/${rnd_id}/300/300`,
                'artist': item.artist,
            }).then((res) => {
                if (Array.from(res.data).length == 0)
                    showToast("The song already exists in favorites")
            }).catch((Error) => {
                showToast("The song already exists in favorites")
            });
        } else {
            // Remove the track from the user's favorite playlist
            await axios.post(`/delPlaylistTrack`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'playlistid': user_Context.user?.playlist[0]?.id,
                'name': item.name,
            }).then((res) => {
                // console.log(res.data)
            }).catch((Error) => {
                showToast("The song does not exist in favorites")
            });
        }
    }

    return (
        <Pressable
            onPress={handlePress}
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
            {/* Display the track image */}
            <Image style={{ width: 50, height: 50, marginRight: 10 }}
                contentFit="cover"
                source={item.image}
                transition={1000}
            />

            <View style={{ flex: 1, marginRight: 30 }}>
                {/* Display the track name */}
                <Text
                    numberOfLines={1}
                    style={
                        isPlaying
                            ? {
                                fontSize: 14,
                                fontFamily: "Lexend_700Bold",
                                color: "#3FFF00",
                            }
                            : { fontFamily: "Lexend_700Bold", fontSize: 14, color: "white" }
                    }
                >
                    {decode(item.name)}
                </Text>
                {/* Display the track artist */}
                <Text style={{ marginTop: 4, color: "#989898", fontFamily: "Lexend_300Light", }} numberOfLines={1}>
                    {decode(item.artist)}
                </Text>
            </View>

            {/* Like button */}
            <Pressable
                onPress={handleLike}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    marginHorizontal: 10,
                }}>
                {
                    likeColor ? <AntDesign name="heart" size={24} color="#3FFF00" /> : <AntDesign name="hearto" size={24} color="gray" />
                }
            </Pressable>
        </Pressable>
    );
};

export default memo(TrackCard); // Memoize the component for performance optimization

const styles = StyleSheet.create({}); // Define styles for the component
