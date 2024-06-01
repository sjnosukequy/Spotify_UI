// Importing necessary modules and constants from react-native-track-player
import TrackPlayer, {
  AppKilledPlaybackBehavior, // Enum for defining behavior when the app is killed
  Capability, // Enum for defining player capabilities
  RepeatMode, // Enum for defining repeat modes (not used in this code)
} from 'react-native-track-player';

// Function to set up the track player
export async function setupPlayer() {
let isSetup = false; // Variable to track if the player is set up
try {
  // Attempt to get the active track index to check if the player is already set up
  await TrackPlayer.getActiveTrackIndex();
  isSetup = true; // If successful, set isSetup to true
} catch {
  // If an error occurs, set up the player
  await TrackPlayer.setupPlayer();
  // Update the player options
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification, // Define behavior when the app is killed
    },
    capabilities: [
      Capability.Play, // Enable play capability
      Capability.Pause, // Enable pause capability
      Capability.Stop, // Enable stop capability
      Capability.SeekTo, // Enable seek to capability
      Capability.Skip, // Enable skip capability
      Capability.SkipToNext, // Enable skip to next capability
      Capability.SkipToPrevious, // Enable skip to previous capability
      Capability.JumpForward, // Enable jump forward capability
      Capability.JumpBackward, // Enable jump backward capability
    ],
    compactCapabilities: [
      Capability.Play, // Enable play capability in compact view
      Capability.Pause, // Enable pause capability in compact view
      Capability.SkipToNext, // Enable skip to next capability in compact view
      Capability.SkipToPrevious, // Enable skip to previous capability in compact view
      Capability.Stop, // Enable stop capability in compact view
    ],
    notificationCapabilities:[
      Capability.Play, // Enable play capability in notifications
      Capability.Pause, // Enable pause capability in notifications
      Capability.SkipToNext, // Enable skip to next capability in notifications
      Capability.SkipToPrevious, // Enable skip to previous capability in notifications
      Capability.Stop, // Enable stop capability in notifications
    ],
    progressUpdateEventInterval: 2, // Interval in seconds for progress update events
    forwardJumpInterval: 2, // Interval in seconds for forward jump
  });

  isSetup = true; // Set isSetup to true after setting up the player and updating options
} finally {
  return isSetup; // Return the setup status
}
}

// Function to add a track to the player
export async function addTrack(track, reset) {
if (reset)
  await TrackPlayer.reset(); // Reset the player if reset flag is true
await TrackPlayer.add(track); // Add the track to the player
}

// Example track data for testing purposes
// track = [
//   {
//     id: '1',
//     url: 'https://rr6---sn-8pxuuxa-nbo6k.googlevideo.com/videoplayback?expire=1714662155&ei=q1YzZsbeNPa61d8P1_yC2AQ&ip=27.64.210.232&id=o-AIN476M-NUxeIgBHAJ6pfoKmYOPdMsM7AHP5EiN4AtVk&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=7V&mm=31%2C26&mn=sn-8pxuuxa-nbo6k%2Csn-30a7rne6&ms=au%2Conr&mv=m&mvi=6&pcm2cms=yes&pl=23&gcr=vn&initcwndbps=1018750&bui=AWRWj2SjaBZEg4HzXZHPUKLjTgwY5xHhJbVw_Q8bBdUdDq5iIGZLnnAL1vFRM1LuFUFBT_RAHZlpnF5Z&spc=UWF9f41WG7QYlFXorIlIfVNlGJP8nLjs9h1Z9pmyMqwHXe8l7RUj0XCRf6xp&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=dQ9G3wuPZftft_3OjuBIeEsQ&gir=yes&clen=3353777&dur=202.181&lmt=1669297788071480&mt=1714640218&fvip=3&keepalive=yes&c=WEB&sefc=1&txp=2318224&n=TyghJiYBnavEHg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AHWaYeowRgIhAKzbP4DeqP45tZZrSeRADkBfWizLPyxTNtbwWjxg_aGoAiEAvjRv6KVM21bF1ZxEwi3sTTIcFctiMDN62oaR7h3sJyY%3D&sig=AJfQdSswRQIhAMjCJSu5M0f6-LlUUzD3Wd7PrcJOuksUHykzxdv8FYDqAiA22cBIHGfcOMYmdZplthKd1-yUHd1Q74ZN95FIRZoQvA%3D%3D',
//     artwork: 'https://pic.re/image',
//     title: 'Make a cup of coffe',
//     artist: 'Powfu',
//     isLiveStream: false,
//   },
//   {
//       id: '2',
//       url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
//       artwork: 'https://pic.re/image',
//       title: 'Bad Liar',
//       artist: 'Rain alphred',
//       duration: 40, 
//     }
// ]
