import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { React, useState, useEffect, useCallback } from 'react'
import Navigation from './StackNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Lexend_400Regular, Lexend_700Bold, Lexend_300Light } from '@expo-google-fonts/lexend';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer } from './controller/musicController';
import Toast from 'react-native-toast-message';
import Provider from './Providers/Provider';
import { StatusBar } from 'expo-status-bar';



SplashScreen.preventAutoHideAsync();

export default function App() {

  let [fontsLoaded, fontError] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    Lexend_300Light
  });

  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setIsSplashVisible(false);
      }

      if (!play) {
        let isSetup = await setupPlayer();
        setPlay(isSetup);
      }
    };

    hideSplash();
  }, [fontsLoaded]);

  if (isSplashVisible || fontError || !play) {
    return null; // Render nothing until fonts are loaded and splash screen is hidden
  }

  return (
    <Provider>
      <StatusBar backgroundColor="#000000" style="light"></StatusBar>
      <Navigation />
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
