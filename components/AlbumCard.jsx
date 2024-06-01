import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from 'expo-image';
import React, {memo} from "react";
import AlbumScreen from "../screens/AlbumScreen";
import { decode } from 'html-entities';

// Component for rendering each album card
const AlbumCard = ({ item }) => {
  const navigate = useNavigation();

  // Function to handle press event when an album card is clicked
  function Clicked() {
    navigate.navigate("album", { ...item });
  }

  // Generate a random id for the image URL to prevent caching
  const rnd_id = new Date().getTime();

  // If item.img is null, generate a placeholder image URL using lorem picsum
  if (item.img == null)
    item.img = `https://picsum.photos/seed/${rnd_id}/300/300`;

  return (
    <Pressable style={{ margin: 10 }} onPress={Clicked}>
      {/* Display the album cover image */}
      <Image
        transition={1000}
        style={{ width: 130, height: 130, borderRadius: 5 }}
        contentFit="cover"
        source={item.img}
      />
      {/* Display the album title */}
      <Text
        numberOfLines={1}
        style={{
          fontSize: 16,
          width: 130,
          fontFamily: "Lexend_700Bold",
          color: "white",
          marginTop: 5,
        }}
      >
        {decode(item.title)} {/* Decode HTML entities in the title */}
      </Text>

      {/* Display additional album information */}
      <Text
        numberOfLines={1}
        style={{
          fontSize: 15,
          width: 130,
          fontFamily: "Lexend_300Light",
          color: "gray",
          marginTop: 1,
        }}
      >
        {decode(item.info)} {/* Decode HTML entities in the additional info */}
      </Text>
    </Pressable>
  );
};

export default memo(AlbumCard); // Memoize the component for performance optimization

const styles = StyleSheet.create({}); // Define styles for the component
