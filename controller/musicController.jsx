import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
} from 'react-native-track-player';
  
export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SeekTo,
        Capability.Skip,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      notificationCapabilities:[
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      progressUpdateEventInterval: 2,
      forwardJumpInterval: 2,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

export async function addTrack(track, reset) {
  if(reset)
    await TrackPlayer.reset();
  await TrackPlayer.add(track);
}

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