import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState, useEffect, memo } from "react";
import { Image } from 'expo-image';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { decode } from 'html-entities';
import TrackPlayer from "react-native-track-player";
import { addTrack } from "../controller/musicController";
import axios from "../api/axios";
import Toast from 'react-native-toast-message';
import { useActiveTrack, useIsPlaying, useProgress } from "react-native-track-player";
import Context from '../Providers/Context';

// Component for rendering each track card
const TrackCard = ({ item }) => {
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
            // Simulated fetch operation
            // const response = await axios.get(`/download?url=https://www.youtube.com/${item.link}`);
            // setData(response.data);
            setFetch(false);
            if (item?.playList) {
                // Add the track to the playlist
                await item.splayList(playlist => [...playlist, {
                    id: playlist.length,
                    url: item.link,
                    artwork: item.image,
                    title: item.name,
                    artist: item.artist,
                    isLiveStream: false,
                }])
                // Add the track to the track player if playListMode is enabled
                if (item.playListMode)
                    await addTrack({
                        id: item.playList.length,
                        url: item.link,
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
    const [remove, setRemove] = useState(false); // State for remove button

    // Function to display a toast message
    function showToast(message, type = 'error') {
        Toast.show({
            type: type,
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
                    url: item.link,
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
            }
            else
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
                'link': item.link,
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

    // Function to handle remove button press
    async function handleDel() {
        setRemove(!remove); // Toggle remove button
        if (remove) {
            // Add the track to the user's favorite playlist
            await axios.post(`/addPlaylistTrack`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'playlistid': user_Context.user?.playlist[0]?.id,
                'name': item.name,
                'link': item.link,
                'image': item?.image || `https://picsum.photos/seed/${rnd_id}/300/300`,
                'artist': item.artist,
            }).then((res) => {
                if (Array.from(res.data).length == 0)
                    showToast("The song already exist in the favourite")
                else
                    showToast("Added The song from favourite", 'success')
            }).catch((Error) => {
                showToast("The song already exist in the favourite")
            });
        } else {
            await axios.post(`/delPlaylistTrack`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'playlistid': user_Context.user?.playlist[0]?.id,
                'name': item.name,
            }).then((res) => {
                showToast("Removed The song from favourite")
                // console.log(res.data)
            }).catch((Error) => {
                showToast("The song does not exist in the favourite")
            });
        }
    }

    return (
        <Pressable
            onPress={handlePress}
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
            <Image style={{ width: 50, height: 50, marginRight: 10 }}
                contentFit="cover"
                source={item.image}
                transition={1000}
            />

            <View style={{ flex: 1, marginRight: 30 }}>
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
                    {/* {item?.track?.name} */}
                    {decode(item.name)}
                </Text>
                <Text style={{ marginTop: 4, color: "#989898", fontFamily: "Lexend_300Light", }}>
                    {/* {item?.track?.artists[0].name} */}
                    {decode(item.artist)}
                </Text>
            </View>
            {
                item?.disableLike ? <Pressable
                    onPress={handleDel}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 7,
                        marginHorizontal: 10,
                    }}>
                    {
                        remove ? <Octicons name="issue-closed" size={24} color="white" /> : <Octicons name="circle-slash" size={24} color="white" />
                    }
                </Pressable> : <Pressable
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
            }
        </Pressable>
    );
};

export default memo(TrackCard);

const styles = StyleSheet.create({});