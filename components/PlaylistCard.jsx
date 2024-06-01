import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState, memo } from "react";
import { Image } from 'expo-image';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

// Component for rendering each playlist card
const PlayListCard = ({ item }) => {
    const navigate = useNavigation();

    // Function to handle press event when a playlist card is clicked
    function Clicked() {
        navigate.navigate("playlist", { ...item });
    }

    return (
        <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 10 }} onPress={Clicked}>
            {/* Display the playlist cover image */}
            <Image
                contentFit="cover"
                source={
                    item?.image ||
                    "https://picsum.photos/200"}
                style={{ width: 50, height: 50, borderRadius: 4 }}
            />
            <View>
                {/* Display the playlist name */}
                <Text style={{ color: "white", fontFamily: "Lexend_400Regular" }}>{item?.name}</Text>
                {/* Display additional playlist information */}
                <Text style={{ color: "gray", marginTop: 7, fontFamily: "Lexend_300Light" }}>{item?.info}</Text>
            </View>
        </Pressable>
    );
};

export default memo(PlayListCard); // Memoize the component for performance optimization

const styles = StyleSheet.create({}); // Define styles for the component
