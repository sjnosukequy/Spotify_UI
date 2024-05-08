import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Image } from 'expo-image';
import {React, useState} from 'react'
import PlayListCard from '../components/PlaylistCard';

const ProfileScreen = () => {
    
    const [playlists, setPlaylists] = useState([{
        image: "",
        name: "Under The Tree"
    }]);
    return (
        <LinearGradient colors={["#727272", "#111111"]} end={{x: 0.5, y: 0.4}} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50 }}>

                <View style={{marginBottom: 15}}>
                    <Image
                        source="https://pic.re/image"
                        style={{
                            width: 200,
                            height: 200,
                            marginBottom: 40,
                            borderRadius: 100,
                            resizeMode: "cover",
                            marginLeft: 'auto', marginRight: 'auto'
                        }} />

                    <View style={{ marginLeft: 'auto', marginRight: 'auto', alignItems: 'center' }}>
                        <Text style={{ color: "white", fontSize: 25, fontFamily: "Lexend_700Bold", }} >
                            VNG QUY
                            {/* {userProfile?.display_name} */}
                        </Text>
                        <Text style={{ color: "gray", fontSize: 16, fontFamily: "Lexend_400Regular",}}>
                            Mail
                            {/* {userProfile?.email} */}
                        </Text>
                    </View>
                </View>
                
                <Pressable style={{marginLeft: "auto", marginRight: "auto", backgroundColor: "#3A3A3A", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 25}}>
                    <Text style={{color: "white", fontFamily: "Lexend_400Regular"}}>
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
                        <PlayListCard item={item}> </PlayListCard>
                    ))}
                    </View>
                </View>


            </ScrollView>
        </LinearGradient>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})