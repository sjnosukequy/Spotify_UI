import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Image } from 'expo-image';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { decode } from 'html-entities';
import TrackPlayer from "react-native-track-player";
import { addTrack } from "../controller/musicController";
import axios from "../api/axios";
import Toast from 'react-native-toast-message';

const TrackCard = ({ item }) => {
    const [data, setData] = useState([]);
    const [fetching, setFetch] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/download?url=https://www.youtube.com/${item.link}`);
            setData(response.data);
            setFetch(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [isPlaying, setPlaying] = useState(false);
    const [likeColor, setLikeColor] = useState(false);


    const rnd_id = new Date().getTime();
    if (item.image == null)
        item.image = `https://pic.re/images?of=${rnd_id}`;

    function showToast() {
        Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: 'The song is still loading 👋'
        });
    }

    async function handlePress() {
        if (!fetching) {
            setPlaying(!isPlaying);
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
        }
        else
            showToast()
    }

    function handleLike() {
        setLikeColor(!likeColor);
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

            <View style={{ flex: 1 }}>
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

export default TrackCard;

const styles = StyleSheet.create({});