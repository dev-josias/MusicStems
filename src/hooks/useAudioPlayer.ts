import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { SongType } from "@/types";
import {
  setAudioState,
  setCurrentPlayingAudio,
  setQueue,
  setSound,
} from "@/features/queue/queueSlice";
import { shuffle } from "@/helpers/shuffle";

export const useAudioPlayer = (song: SongType) => {
  const dispatch = useAppDispatch();
  const audioState = useAppSelector((state) => state.queue.audioState);
  const sound = useAppSelector((state) => state.queue.sound);

  const assets = useAppSelector((state) => state.queue.assets);
  const queue = useAppSelector((state) => state.queue.queue);
  const shuffleMode = useAppSelector((state) => state.queue.shuffleMode);
  const currentPlayingAudio = useAppSelector(
    (state) => state.queue.currentPlayingAudio
  );

  const [currentSong, setCurrentSong] = useState<SongType>(song);

  useEffect(() => {
    if (
      currentPlayingAudio === undefined ||
      currentPlayingAudio.id !== currentSong.id
    ) {
      initAudio();
    }
    dispatch(setCurrentPlayingAudio(currentSong));
  }, [currentSong]);

  useEffect(() => {
    dispatch(setQueue(shuffleMode ? shuffle(queue) : assets));
  }, [shuffleMode]);

  const initAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      dispatch(
        setAudioState({
          state: "paused",
          isLooping: false,
          position: 0,
        })
      );
    }
    const soundObject = await Audio.Sound.createAsync(
      { uri: currentSong.uri },
      { shouldPlay: true },
      (playbackStatus) => {
        if (playbackStatus.isLoaded) {
          dispatch(
            setAudioState({
              ...audioState,
              state: playbackStatus.isPlaying ? "playing" : "paused",
              isLooping: playbackStatus.isLooping,
              position: Math.floor(playbackStatus.positionMillis / 1000),
            })
          );
          if (playbackStatus.didJustFinish) {
            if (!playbackStatus.isLooping) {
              skipNext();
            }
          }
        }
      }
    );

    dispatch(setSound(soundObject.sound));
    dispatch(
      setAudioState({
        ...audioState,
        state: "playing",
      })
    );
  };

  const skipNext = async (callback?: Function) => {
    if (callback) {
      callback();
    }
    const index = queue.findIndex((track) => track.id === currentSong.id);
    if (index !== -1) {
      const nextSong = index === queue.length - 1 ? queue[0] : queue[index + 1];
      setCurrentSong(nextSong);
    }
  };

  const togglePlay = async () => {
    if (audioState.state === "playing") {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  return { togglePlay, skipNext, currentSong, setCurrentSong };
};
