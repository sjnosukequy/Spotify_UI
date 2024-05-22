import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Image } from 'expo-image';
import { React, useState, useContext } from 'react'
import PlayListCard from '../components/PlaylistCard';
import Context from '../Providers/Context';
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const userContext = useContext(Context);
    const rnd_id = new Date().getTime()
    const [playlists, setPlaylists] = useState([{
        image: "https://picsum.photos/200",
        name: "My favourite",
        info: "My favourite song",
        id: userContext.user?.playlist[0]?.id || null
    }]);

    function editProfile() {
        navigation.navigate('editProfile')
    }

    return (
        <LinearGradient colors={["#727272", "#111111"]} end={{ x: 0.5, y: 0.4 }} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50 }}>

                <View style={{ marginBottom: 15 }}>
                    <Image
                        source={`https://picsum.photos/seed/${rnd_id}/300/300`}
                        contentFit='cover'
                        style={{
                            width: 200,
                            height: 200,
                            marginBottom: 40,
                            borderRadius: 100,
                            marginLeft: 'auto', marginRight: 'auto'
                        }} />

                    <View style={{ marginLeft: 'auto', marginRight: 'auto', alignItems: 'center' }}>
                        <Text style={{ color: "white", fontSize: 25, fontFamily: "Lexend_700Bold", }} >
                            {userContext.user?.nickname || "nickname"}
                        </Text>
                        <Text style={{ color: "gray", fontSize: 16, fontFamily: "Lexend_400Regular", }}>
                            {userContext.user?.email || "email"}
                        </Text>
                    </View>
                </View>

                <Pressable style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: "#3A3A3A", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 25 }} onPress={editProfile}>
                    <Text style={{ color: "white", fontFamily: "Lexend_400Regular" }}>
                        Edit Profile
                    </Text>
                </Pressable>

                <View style={{ padding: 15 }}>
                    <Text style={{
                        fontFamily: "Lexend_700Bold",
                        color: "white",
                        fontSize: 20,
                        marginBottom: 10
                    }}>
                        Playlists
                    </Text>

                    <View >
                        {playlists.map((item, index) => (
                            <PlayListCard key={index} item={item}> </PlayListCard>
                        ))}
                    </View>
                </View>


            </ScrollView>
        </LinearGradient>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})