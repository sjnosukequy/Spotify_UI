import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Image } from 'expo-image';
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import TrackCard from "../components/TrackCard";
import axios from "../api/axios";
import { decode } from 'html-entities';
import TrackPlayer from "react-native-track-player";
import { addTrack } from "../controller/musicController";
import Toast from 'react-native-toast-message';
import { SafeAreaView } from "react-native-safe-area-context";
import ImageColors from 'react-native-image-colors'


const AlbumScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [fetching, setFetch] = useState(true);
  const [data, setData] = useState([]);
  const [customColor, setCustomColor] = useState({ avg: '#131624' });

  const [playList, setPlayList] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playListMode, setPlayListMode] = useState(false);

  function showToast() {
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: 'The song is still loading 👋'
    });
  }

  useEffect(() => {
    fetchData();
    fetchColor();
  }, []);

  async function playlistmode() {
    if (fetching == false) {
      if (playList.length > 3) {
        if (!playListMode) {
          console.log("Enter playlist mode")
          await addTrack(playList, true);
          setPlayListMode(true);
        }
        setPlaying(!playing)
        console.log((await TrackPlayer.getQueue()).length)
        if (playing)
          TrackPlayer.pause();
        else
          TrackPlayer.play();
      }
      else
        showToast();
    } else
      showToast();
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`/playlist?url=${route.params["link"]}`);
      setData(response.data);
      setFetch(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchColor = async () => {
    try {
      const response = await axios.post('/getcolor', { url: route.params["img"] });
      setCustomColor(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <LinearGradient colors={[`${customColor.avg}`, "#111111"]} end={{ x: 0.5, y: 0.4 }} style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", padding: 12 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                contentFit="cover"
                style={{ width: 200, height: 200 }}
                source={route.params["img"]}
              />
            </View>
          </View>
          <Text
            style={{
              color: "white",
              marginHorizontal: 20,
              marginTop: 10,
              fontSize: 25,
              fontFamily: "Lexend_700Bold"
            }}
          >
            {decode(route.params["title"])}
          </Text>

          <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 10 }}>
            <View style={{ flex: 1, paddingRight: 50 }}>
              <Text
                numberOfLines={3}
                style={{
                  color: "gray",
                  fontSize: 17,
                  fontFamily: "Lexend_300Light",
                  marginBottom: 10,
                }}
              >
                {decode(route.params["info"])}
              </Text>
            </View>
            <Pressable
              style={{
              }}
              onPress={playlistmode}>
              {
                playing ? <AntDesign name="pausecircle" size={60} color="#3FFF00" /> : <AntDesign name="play" size={60} color="#3FFF00" />
              }

            </Pressable>
          </View>

          {
            fetching ? <View style={{ marginTop: 150 }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View> : <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
              {
                data.map((item, index) => {

                  // setPlayList([
                  //   ...playList,
                  //   {
                  //     id: index,
                  //     url: data,
                  //     artwork: item.image,
                  //     title: item.name,
                  //     artist: item.artist,
                  //     isLiveStream: false,
                  //   }
                  // ])
                  item.playList = playList;
                  item.splayList = setPlayList;
                  item.playListMode = playListMode;
                  return (
                    <View key={index} style={{ marginBottom: 10 }}>
                      <TrackCard item={item}> </TrackCard>
                    </View>)
                })
              }
            </View>
          }

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AlbumScreen;

const styles = StyleSheet.create({});