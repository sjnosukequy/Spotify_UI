import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import AlbumScreen from "./screens/AlbumScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Track from "./components/SmallTrackPlayer";
import TrackPlayerScreen from "./screens/TrackPlayerScreen";
import SearchScreen from "./screens/SearchScreen";
import { usePlaybackState, State } from "react-native-track-player";
import { Pressable } from "react-native";
import EditProfileScreen from "./screens/EditProfileScreen";
import AlbumScreenLocal from "./screens/AlbumScreenLocal";
import PlayListScreen from "./screens/PlayListScreen";
import AiChat from "./screens/AiChat";
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

function BottomTabs() {
    const playback_state = usePlaybackState();
    const playback_state_none = playback_state.state === State.None
    const playback_state_stop = playback_state.state === State.Stopped
    const playback_state_flag = playback_state_none || playback_state_stop

    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "rgba(18, 18, 18, 1)",
                borderTopWidth: 0,
            }
        }}
            tabBar={(props) => (
                <>
                    {
                        playback_state_flag ? null : <Track></Track>
                    }
                    <BottomTabBar {...props} />
                </>
            )}
        >
            <Tab.Screen name="homeTab" component={Main_menu} options={{
                tabBarLabel: "Home",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) => focused ? (<Ionicons name="home-sharp" size={24} color="white" />) : (<Ionicons name="home-outline" size={24} color="white" />)
            }} />
            <Tab.Screen name="search" component={SearchScreen} options={{
                tabBarLabel: "Search",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) => focused ? (<FontAwesome name="search" size={24} color="white" />) : (<AntDesign name="search1" size={24} color="white" />)
            }} />
            <Tab.Screen name="profile" component={ProfileScreen} options={{
                tabBarLabel: "Profile",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) => focused ? (<Ionicons name="person" size={24} color="white" />) : (<Ionicons name="person-outline" size={24} color="white" />)
            }} />
            <Tab.Screen name="ai" component={AiChat} options={{
                tabBarLabel: "AI",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) => focused ? (<MaterialCommunityIcons name="robot-excited" size={24} color="white" />) : (<MaterialCommunityIcons name="robot-excited-outline" size={24} color="white" />)
            }} />
        </Tab.Navigator>
    );
}

function Main_menu() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="album" component={AlbumScreen} options={{
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerTintColor: 'white',
                animation: 'fade'
            }} />
            <Stack.Screen name="albumlocal" component={AlbumScreenLocal} options={{
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerTintColor: 'white',
                animation: 'fade'
            }} />
            <Stack.Screen name="playlist" component={PlayListScreen} options={{
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerTintColor: 'white',
                animation: 'fade'
            }} />
        </Stack.Navigator>
    )
}

const Stack = createNativeStackNavigator();
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="ai" component={AiChat} options={{
                    headerShown: false,
                    animation: "ios",
                }} /> */}
                <Stack.Screen name="login" component={LoginScreen} options={{
                    headerShown: false,
                    animation: "ios",
                }} />
                <Stack.Screen name="register" component={RegisterScreen} options={{
                    headerShown: false,
                    animation: "ios",
                }} />
                <Stack.Screen name="main" component={BottomTabs} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="editProfile" component={EditProfileScreen} options={{
                    headerShown: true,
                    title: '',
                    headerTransparent: true,
                    headerTintColor: 'white',
                    animation: "ios",
                }} />
                <Stack.Screen name="playerFull" component={TrackPlayerScreen} options={{
                    headerShown: false,
                    statusBarAnimation: "slide",
                    animation: "slide_from_bottom"
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation