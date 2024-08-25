import { createSlice } from "@reduxjs/toolkit";
import { QueueStateType } from "@/types";

const initialState: QueueStateType = {
  queue: [],
  shuffleMode: false,
  sound: undefined,
  currentPlayingAudio: undefined,
  audioState: {
    state: "playing",
    isLooping: false,
    position: 0,
  },
  assets: [],
};

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    setShuffleMode: (state, action) => {
      state.shuffleMode = action.payload;
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
    setCurrentPlayingAudio: (state, action) => {
      state.currentPlayingAudio = action.payload;
    },
    setAudioState: (state, action) => {
      state.audioState = action.payload;
    },
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
    setIsLooping: (state, action) => {
      state.audioState.isLooping = action.payload;
    },
  },
});

export const {
  setQueue,
  setShuffleMode,
  setSound,
  setCurrentPlayingAudio,
  setAudioState,
  setAssets,
  setIsLooping,
} = queueSlice.actions;

export default queueSlice.reducer;
