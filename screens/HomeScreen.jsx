import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AlbumCard from '../components/AlbumCard';
import { React, useState, useEffect } from 'react'
import axios from "../api/axios";
import { decode } from 'html-entities';



const HomeScreen = () => {
  const [fetching, setFetch] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/main");
      setData(response.data);
      setFetch(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigation = useNavigation();
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();

  return (
    <LinearGradient colors={["#040306", "#111111"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ padding: 15 }}>
        <ScrollView>
          <Text style={{
            color: 'white', fontFamily
              : "Lexend_700Bold", fontSize: 25, marginBottom: 35
          }}>{message}</Text>
          {fetching ? <View>
            <ActivityIndicator size="large" color="#00ff00" />
          </View> : data.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ color: 'white', fontFamily: "Lexend_700Bold", fontSize: 20 }}>{decode(item.name)}</Text>
              <FlatList
                data={item.child}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item2, index }) => (
                  <AlbumCard item={item.child[index]}></AlbumCard>
                )}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})