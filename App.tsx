import { useEffect } from "react";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { Provider } from "react-redux";
import Main from "./src/Main";
import * as MusicLibrary from "expo-music-library";
import { store } from "./src/app/store";

async function configureAudioSession() {
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    playThroughEarpieceAndroid: true,
  });
}

configureAudioSession();

export default function App() {
  useEffect(() => {
    requestPermission();
    audioSetup();
  }, []);

  const requestPermission = async () => {
    let permissions = await MusicLibrary.requestPermissionsAsync();
    while (!permissions.granted) {
      permissions = await MusicLibrary.requestPermissionsAsync();
    }
  };

  const audioSetup = async () => {
    Audio.setAudioModeAsync({
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true,
    });
  };

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
