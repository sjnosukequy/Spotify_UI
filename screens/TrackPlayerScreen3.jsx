import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import TrackPlayer, {
  useProgress,
  usePlaybackState, 
  useTrackPlayerEvents,
  Event, 
  State} from 'react-native-track-player';
import { setupPlayer, addTrack } from '../controller/musicController';
import Icon from 'react-native-vector-icons/FontAwesome';


// Define the Playlist component
function Playlist() {
  // State to manage the playlist queue and current track
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  // Function to load the playlist
  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }
 // Load the playlist on component mount
  useEffect(() => {
    loadPlaylist();
  }, []);

  // Update the current track when playback changes
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    if(event.state == State.nextTrack) {
      TrackPlayer.getActiveTrackIndex().then((index) => setCurrentTrack(index));
    }
  });

  // PlaylistItem component to render individual playlist items
  function PlaylistItem({index, title, isCurrent}) {
  // Handle item press to skip to the selected track
    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <Text
          style={{...styles.playlistItem,
            ...{backgroundColor: isCurrent ? '#666' : 'transparent'}}}>
        {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Function to shuffle the playlist
  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);
  }

  return(
    <View>
      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => 
          <PlaylistItem
            index={index}
            title={item.title}
            isCurrent={currentTrack == index }/>
          }
        />
      </View>
      <Controls onShuffle={handleShuffle}/>
    </View>
  );
}
// Controls component to render playback controls
function Controls({ onShuffle }) {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if(await TrackPlayer.getState() == State.Playing) {
      TrackPlayer.pause();
    }
    else {
      TrackPlayer.play();
    }
  }

  return(
    <View style={{flexDirection: 'row',
      flexWrap: 'wrap', alignItems: 'center'}}>
        <Icon.Button
          name="arrow-left"
          size={28}
          color='#000'
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToPrevious()}/>
        <Icon.Button
          name={playerState == State.Playing ? 'pause' : 'play'}
          size={28}
          color='#000'
          backgroundColor="transparent"
          onPress={handlePlayPress}/>
        <Icon.Button
          name="arrow-right"
          color='#000'
          size={28}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToNext()}/>
        <Icon.Button
          name="random"
          size={28}
          color='#000'
          backgroundColor="transparent"
          onPress={onShuffle}/>
    </View>
  );
}

// TrackProgress component to render track progress
function TrackProgress() {
  const { position, duration } = useProgress(200);

  function format(seconds) {
    let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return(
    <View>
      <Text style={styles.trackProgress}>
        { format(position) } / { format(duration) }
      </Text>
    </View>
  );
}

// Header component to render track information
function Header() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

   // Update track information when playback changes
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    if(event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    // const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getActiveTrack();
    setInfo(info);
  }

  return(
    <View>
        <Text style={styles.songTitle}>{info.title}</Text>
        <Text style={styles.artistName}>{info.artist}</Text>
    </View>
  );
}

// TrackPlayerScreen component to render the track player screen
function TrackPlayerScreen() {

  const [play, setPlay] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      await addTrack();
      setPlay(isSetup);
    }
    setup();
  }, []);

  // Render loading indicator while player is being set up
  if(!play) {
    return (
        <ActivityIndicator/>
    );
  }

  // Render the track player screen
  return (
    <View style={styles.container}>
      <Header/>
      <TrackProgress/>
      <Playlist/>
    </View>
  );
}
// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFEE'
  },
  playlist: {
    marginTop: 40,
    marginBottom: 40
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4
  },
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#000'
  },
  songTitle: {
    fontSize: 32,
    marginTop: 50,
    color: '#CA92EE'
  },
  artistName: {
    fontSize: 24,
    color: '#000'
  },
});

export default TrackPlayerScreen;
