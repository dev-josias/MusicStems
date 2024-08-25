import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "@/database/storage";
import { Playlist, StorageStateType } from "@/types";

const initialState: StorageStateType = {
  favorites: [],
  recentlyPlayed: [],
  mostPlayed: [],
  playlists: [],
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
      create("favorites", JSON.stringify(action.payload));
    },
    setRecentlyPlayed: (state, action) => {
      state.recentlyPlayed = action.payload;
      create("recentlyPlayed", JSON.stringify(action.payload));
    },
    setMostPlayed: (state, action) => {
      state.mostPlayed = action.payload;
      create("mostPlayed", JSON.stringify(action.payload));
    },
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
      create("playlists", JSON.stringify(action.payload));
    },
    updatePlaylists: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex(
        (playlist) => playlist.id === action.payload.id
      );
      if (index !== -1) {
        state.playlists[index] = action.payload;
        create("playlists", JSON.stringify(state.playlists));
      }
    },
  },
});

export const {
  setFavorites,
  setRecentlyPlayed,
  setMostPlayed,
  setPlaylists,
  updatePlaylists,
} = storageSlice.actions;

export default storageSlice.reducer;
