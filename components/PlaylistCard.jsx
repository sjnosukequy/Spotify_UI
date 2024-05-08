import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from 'expo-image';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const playListCard = ({ item }) => {

    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 10 }}>
            <Image
                contentFit="cover"
                source={
                    item?.image ||
                    "https://picsum.photos/200"}
                style={{ width: 50, height: 50, borderRadius: 4 }}
            />
            <View>
                <Text style={{ color: "white", fontFamily: "Lexend_400Regular" }}>{item?.name}</Text>
                <Text style={{ color: "gray", marginTop: 7, fontFamily: "Lexend_300Light" }}>0 likes</Text>
            </View>
        </View>
    );
};

export default playListCard;

const styles = StyleSheet.create({});