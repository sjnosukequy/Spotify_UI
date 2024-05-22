import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState, memo } from "react";
import { Image } from 'expo-image';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PlayListCard = ({ item }) => {
    const navigate = useNavigation()

    function Clicked() {
        navigate.navigate("playlist", { ...item })
    }

    return (
        <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 10 }} onPress={Clicked}>
            <Image
                contentFit="cover"
                source={
                    item?.image ||
                    "https://picsum.photos/200"}
                style={{ width: 50, height: 50, borderRadius: 4 }}
            />
            <View>
                <Text style={{ color: "white", fontFamily: "Lexend_400Regular" }}>{item?.name}</Text>
                <Text style={{ color: "gray", marginTop: 7, fontFamily: "Lexend_300Light" }}>{item?.info}</Text>
            </View>
        </Pressable>
    );
};

export default memo(PlayListCard);

const styles = StyleSheet.create({});