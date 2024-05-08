import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { Image } from 'expo-image';
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import TrackCard from "../components/TrackCard";
import axios from "../api/axios";
import { decode } from 'html-entities';
import Slider from '@react-native-community/slider';


const TrackPlayerScreen = () => {
    const windowWidth = Dimensions.get('window').width;
    const width_80 = windowWidth * 80 / 100;
    const windowHeight = Dimensions.get('screen').height;

    const route = useRoute();
    const navigation = useNavigation();

    const [likeColor, setLikeColor] = useState(false);

    function handleLike() {
        setLikeColor(!likeColor);
    }

    const [play, setPlay] = useState(true)

    function handlePlay() {
        setPlay(!play);
    }

    //   const [fetching, setFetch] = useState(true);
    //   const [data, setData] = useState([]);
    //   const [customColor, setCustomColor] = useState({avg: '#131624'});

    //   useEffect(() => {
    //     fetchData();
    //     fetchColor();
    //   }, []);

    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get(`/playlist?url=${route.params["link"]}`);
    //       setData(response.data);
    //       setFetch(false);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };

    //   const fetchColor = async () => {
    //     try {
    //       const response = await axios.post('/getcolor',{url: route.params["img"]} );
    //       setCustomColor(response.data);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };

    return (
        <LinearGradient colors={["#131624", "#131624"]} end={{ x: 0.5, y: 0.4 }} style={{ flex: 1 }}>
            <View style={{ marginTop: 30, padding: 20 }}>
                <AntDesign style={{ marginLeft: 20 }} onPress={() => navigation.goBack()} name="down" size={24} color="white" />

                <View style={{ alignItems: "center", marginTop: 40 }}>
                    <Image
                        contentFit="cover"
                        style={{ width: width_80, height: width_80 }}
                        source="https://pic.re/image" />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30, paddingHorizontal: 20 }}>
                    <View style={{ flex: 1, paddingRight: 50 }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                color: "white",
                                fontSize: 25,
                                fontFamily: "Lexend_700Bold"
                            }}
                        >
                            Tile
                            {/* {decode(route.params["title"])} */}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                color: "gray",
                                fontSize: 17,
                                fontFamily: "Lexend_300Light",
                            }}
                        >
                            Rdsf
                        </Text>
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
                    // value={progress.position}
                    // minimumValue={0}
                    // maximumValue={progress.duration}
                    thumbTintColor="white"
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="#fff"
                // onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
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
                        0:0
                    </Text>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 14,
                            fontFamily: "Lexend_400Regular",
                        }}>
                        12:2
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 30, paddingHorizontal: 20, justifyContent: 'space-evenly', alignItems: 'center' }}>

                    <Pressable>
                        <Entypo name="controller-jump-to-start" size={50} color="white" />
                    </Pressable>

                    <Pressable onPress={handlePlay}>
                        {
                            play ? <AntDesign name="play" size={60} color="white" /> :
                                <AntDesign name="pausecircle" size={60} color="white" />
                        }
                    </Pressable>

                    <Pressable>
                        <Entypo name="controller-next" size={50} color="white" />
                    </Pressable>
                </View>

            </View>
        </LinearGradient>
    );
};

export default TrackPlayerScreen;

const styles = StyleSheet.create({});