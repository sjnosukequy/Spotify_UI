import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from 'expo-image';
import React from "react";
import AlbumScreen from "../screens/AlbumScreen";
import { decode } from 'html-entities';

const AlbumCard = ({ item }) => {
  const navigate = useNavigation()

  function Clicked() {
    navigate.navigate("album", { ...item })
  }

  const rnd_id = new Date().getTime()
  if (item.img == null)
    item.img = `https://pic.re/images?of=${rnd_id}`;
  return (
    <Pressable style={{ margin: 10 }} onPress={Clicked}>
      <Image
        transition={1000}
        style={{ width: 130, height: 130, borderRadius: 5 }}
        contentFit="cover"
        source={item?.img}
      />
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
        {decode(item.title)}
      </Text>

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
        {/* {item?.name} */}
        {decode(item.info)}
      </Text>

    </Pressable>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({});