// Importing TrackPlayer and Event from react-native-track-player
import TrackPlayer from 'react-native-track-player'; // Track player for handling audio playback
import { Event } from 'react-native-track-player'; // Event types for track player

// Exporting an asynchronous function as a module
module.exports = async function () {

  // Adding an event listener for the RemotePlay event to play the track
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  // Adding an event listener for the RemoteStop event to stop the track
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());

  // Adding an event listener for the RemotePause event to pause the track
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  // Adding an event listener for the RemoteNext event to skip to the next track
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());

  // Adding an event listener for the RemotePrevious event to skip to the previous track
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());

  // Adding an event listener for the RemoteSeek event to seek to a specific position in the track
  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => TrackPlayer.seekTo(position)); // Seek to the provided position
}; 
