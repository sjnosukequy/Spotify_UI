import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, Pressable, TextInput, Dimensions } from 'react-native'
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
    const windowHeight = Dimensions.get('screen').height;
    const [text, setText] = useState("");
    const [querry, setQuerry] = useState("");
    const [fetching, setFetch] = useState(false);
    const [searching, setSearching] = useState(false)
    const [data, setData] = useState({
        "songs": [],
        "albums": [],
        "album2": [],
        "song2": []
    });

    const debounced = useDebouncedCallback((value) => {
        if (value.length == 0)
            return;
        if (fetching)
            return;
        setData({})
        setSearching(true)
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

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        fetchData();
    }, [querry]);

    const fetchData = async () => {
        try {
            // console.log('in')
            if (searching) {
                setFetch(true)
                await axios.get(`/search?url=${querry}`)
                    .then((res) => {
                        setData(res.data);
                        setFetch(false);
                    })
                    .catch((error) => {
                        setFetch(false);
                        showToast('Please Try Again Later')
                    });
                setSearching(false)
            }
        } catch (error) {
            setFetch(false);
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
                                if (!fetching) {
                                    debounced(text)
                                    setText(text)
                                }
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
                        <View style={{ marginTop: windowHeight * 40 / 100 }}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                        :
                        <View style={{marginBottom: 80}}>

                            {
                                data.songs?.length ? <View style={{ marginBottom: 10 }}>
                                    <Text style={{ color: 'white', fontFamily: "Lexend_700Bold", fontSize: 20 }}> Songs </Text>
                                    {
                                        data['songs'].map((item, index) => (
                                            <TrackCard item={item} key={index}></TrackCard>
                                        ))
                                    }
                                </View> : null
                            }

                            {
                                data.albums?.length ? <View style={{ marginBottom: 10 }}>
                                    <Text style={{ color: 'white', fontFamily: "Lexend_700Bold", fontSize: 20 }}> Albums </Text>
                                    <FlatList
                                        data={data.albums}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <AlbumCard item={item} key={index}></AlbumCard>
                                        )}
                                    />
                                </View> : null
                            }

                            {
                                data.album2?.length ? <View style={{ marginBottom: 10 }}>
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
                                data.song2?.length ? <View style={{  }}>
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