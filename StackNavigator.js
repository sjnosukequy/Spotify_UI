import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import AlbumScreen from "./screens/AlbumScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Track from "./components/SmallTrackPlayer";
import TrackPlayerScreen from "./screens/TrackPlayerScreen";
import SearchScreen from "./screens/SearchScreen";



const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "rgba(18, 18, 18, 1)",
                borderTopWidth: 0
            }
        }}
            tabBar={(props) => (
                <>
                    <Track></Track>
                    <BottomTabBar {...props} />
                </>
            )}
        >
            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarLabel: "Home",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) => focused ? (<Ionicons name="home-sharp" size={24} color="white" />) : (<Ionicons name="home-outline" size={24} color="white" />)
            }} />
            <Tab.Screen name="search" component={SearchScreen} options={{
                tabBarLabel: "Home",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) => focused ? (<Ionicons name="home-sharp" size={24} color="white" />) : (<Ionicons name="home-outline" size={24} color="white" />)
            }} />
            <Tab.Screen name="profile" component={ProfileScreen} options={{
                tabBarLabel: "Home",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) => focused ? (<FontAwesome name="search" size={24} color="white" />) : (<AntDesign name="search1" size={24} color="white" />)
            }} />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={LoginScreen} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="main" component={BottomTabs} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="album" component={AlbumScreen} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="playerFull" component={TrackPlayerScreen} options={{
                    headerShown: false,
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation