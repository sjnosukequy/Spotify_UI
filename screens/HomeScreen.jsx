import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AlbumCard from '../components/AlbumCard';
import { React, useState, useEffect, useContext, memo } from 'react'
import axios from "../api/axios";
import { decode } from 'html-entities';
import Context from '../Providers/Context';


const HomeScreen = () => {
  // const userContext = useContext(Context);
  // console.log(userContext.user)
  const [fetching, setFetch] = useState(true); // State to track data fetching status
  const [data, setData] = useState([]); // State to store fetched data

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get("/main");// Fetch data from the "/main" endpoint
      setData(response.data); // Set fetched data
      setFetch(false);// Update fetching status
    } catch (error) {
      console.error('Error fetching data:', error);// Log error if data fetching fails
    }
  };

  const navigation = useNavigation();// Access navigation object for navigation actions

   // Function to display greeting message based on current time
  const greetingMessage = () => {
    const currentTime = new Date().getHours();// Get current hour
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();// Get greeting message based on current time

  return (
    <LinearGradient colors={["#040306", "#111111"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ padding: 15 }}>
        <ScrollView>
          <Text style={{
            color: 'white', fontFamily
              : "Lexend_700Bold", fontSize: 25, marginBottom: 35
          }}>{message}</Text>
          {fetching ? <View style={{ marginTop: 300 }}>
            <ActivityIndicator size="large" color="#00ff00" />// Display activity indicator while fetching data
          </View> : data.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ color: 'white', fontFamily: "Lexend_700Bold", fontSize: 20 }}>{decode(item.name)}</Text>
              <FlatList
                data={item.child}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item2, index }) => (
                  <AlbumCard item={item.child[index]}></AlbumCard>// Render AlbumCard component for each item in FlatList
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

const styles = StyleSheet.create({})// Create empty style object