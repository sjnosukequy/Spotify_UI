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

const TrackCard = ({ item }) => {
    const active_track = useActiveTrack()
    const user_Context = useContext(Context);
    const [data, setData] = useState();
    const [fetching, setFetch] = useState(true);
    const rnd_id = new Date().getTime();
    if (item.image == null)
        item.image = `https://picsum.photos/seed/${rnd_id}/300/300`;

    useEffect(() => {
        fetchData();
    }, []);

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

    const [isPlaying, setPlaying] = useState(false);
    const [likeColor, setLikeColor] = useState(false);

    function showToast(mressage) {
        Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: mressage
        });
    }

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

    async function handleLike() {
        setLikeColor(!likeColor);
        if (!likeColor) {
            await axios.post(`/addPlaylistTrack`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'playlistid': user_Context.user?.playlist[0]?.id,
                'name': item.name,
                'link': data,
                'image': item?.image || `https://picsum.photos/seed/${rnd_id}/300/300`,
                'artist': item.artist,
            }).then((res) => {
                if (Array.from(res.data).length == 0)
                    showToast("The song already exist in the favourite")
            }).catch((Error) => {
                showToast("The song already exist in the favourite")
            });
        } else {
            await axios.post(`/delPlaylistTrack`, {
                'key': '8/k0Y-EJj5S>#/OIA>XB?/q7}',
                'playlistid': user_Context.user?.playlist[0]?.id,
                'name': item.name,
            }).then((res) => {
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
                <Text style={{ marginTop: 4, color: "#989898", fontFamily: "Lexend_300Light", }} numberOfLines={1}>
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

export default memo(TrackCard);

const styles = StyleSheet.create({});