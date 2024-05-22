import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AlbumCard from '../components/AlbumCard';
import { React, useState, useEffect, useLayoutEffect } from 'react'
import axios from "../api/axios";
import { decode } from 'html-entities';
import { SearchBar } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import TrackCard from '../components/TrackCard';
import { useDebouncedCallback } from 'use-debounce';
import Toast from 'react-native-toast-message';
import AlbumCardLocal from '../components/AlbumCardLocal';
import TrackCardLocal from '../components/TrackCardLocal';


const SearchScreen = () => {
    const [text, setText] = useState("");
    const [querry, setQuerry] = useState("AOT");
    const [fetching, setFetch] = useState(true);
    const [data, setData] = useState([]);

    const debounced = useDebouncedCallback((value) => {
        if (value.length == 0)
            value = 'AOT'
        setFetch(true)
        setData({
            "songs": [],
            "albums": [],
            "album2": []
        })
        setQuerry(value)
    },
        // delay in ms
        1000
    );
    // const navigation = useNavigation();
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerShown: false,
    //     })
    // }, [navigation])

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [querry]);

    const fetchData = async () => {
        try {
            // console.log('in')
            await axios.get(`/search?url=${querry}`)
                .then((res) => {
                    setData(res.data);
                    setFetch(false);
                })
                .catch((error) => {
                    showToast('Please Try Again Later')
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function showToast(message) {
        Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: message
        });
    }

    return (
        <LinearGradient colors={["#040306", "#111111"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ paddingHorizontal: 5 }}>
                <View
                    style={{
                        marginHorizontal: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 9,
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            backgroundColor: "#222222",
                            padding: 9,
                            flex: 1,
                            borderRadius: 3,
                            height: 38,
                            marginRight: 20
                        }}>
                        <AntDesign name="search1" size={20} color="white" />
                        <TextInput
                            value={text}
                            onChangeText={(text) => {
                                debounced(text)
                                setText(text)
                            }}
                            placeholder="Search  "
                            placeholderTextColor={"white"}
                            style={{ color: "white", flex: 1, fontFamily: "Lexend_400Regular" }}
                        />
                    </View>

                    <Pressable
                        onPress={() => {
                            setText('')
                        }}
                        style={{

                        }}>
                        <Text style={{ color: "white", fontFamily: "Lexend_400Regular" }}>Cancel</Text>
                    </Pressable>
                </View>
                <ScrollView style={{ marginTop: 20, marginHorizontal: 20, }}>

                    {fetching ?
                        <View style={{ marginTop: 350 }}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                        :
                        <View>

                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: 'white', fontFamily: "Lexend_700Bold", fontSize: 20 }}> Songs </Text>
                                {
                                    data['songs'].map((item, index) => (
                                        <TrackCard item={item} key={index}></TrackCard>
                                    ))
                                }
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: 'white', fontFamily: "Lexend_700Bold", fontSize: 20 }}> Albums </Text>
                                <FlatList
                                    data={data.albums}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <AlbumCard item={item} key={index}></AlbumCard>
                                    )}
                                />
                            </View>

                            {
                                data.album2.length ? <View style={{ marginBottom: 10 }}>
                                    <Text style={{ color: 'white', fontFamily: "Lexend_700Bold", fontSize: 20 }}> Local Albums </Text>
                                    <FlatList
                                        data={data.album2}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <AlbumCardLocal item={item} key={index}></AlbumCardLocal>
                                        )}
                                    />
                                    {/* <View style={{height: 30}}></View> */}
                                </View> : null

                            }

                            {
                                data.song2.length ? <View style={{ marginBottom: 80 }}>
                                    <Text style={{ color: 'white', fontFamily: "Lexend_700Bold", fontSize: 20 }}> Songs Local </Text>
                                    {
                                        data['song2'].map((item, index) => (
                                            <TrackCardLocal item={item} key={index}></TrackCardLocal>
                                        ))
                                    }
                                </View> : null

                            }

                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})