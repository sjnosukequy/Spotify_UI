import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from 'expo-image';
import React, {memo} from "react";
import AlbumScreen from "../screens/AlbumScreen";
import { decode } from 'html-entities';

const AlbumCardLocal = ({ item }) => {
  const navigate = useNavigation()

  function Clicked() {
    navigate.navigate("albumlocal", { ...item })
  }

  const rnd_id = new Date().getTime()
  if (item.img == null)
    item.img = `https://picsum.photos/seed/${rnd_id}/300/300`;
  return (
    <Pressable style={{ margin: 10 }} onPress={Clicked}>
      <Image
        transition={1000}
        style={{ width: 130, height: 130, borderRadius: 5 }}
        contentFit="cover"
        source={item.img}
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

export default memo(AlbumCardLocal);

const styles = StyleSheet.create({});