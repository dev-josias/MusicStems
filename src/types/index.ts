import { MaterialCommunityIcons } from "@/components/Icons";
import { Sound } from "expo-av/build/Audio";
import { Asset } from "expo-music-library";

export type CustomAsset = Asset & { artwork: string };

export type Playlist = {
  id: string;
  title: string;
  assets: CustomAsset[];
};

export type StorageStateType = {
  favorites: SongType[];
  recentlyPlayed: SongType[];
  mostPlayed: (SongType & { count: number })[];
  playlists: Playlist[];
};

export type QueueStateType = {
  queue: CustomAsset[];
  shuffleMode: boolean;
  sound?: Sound;
  currentPlayingAudio?: CustomAsset;
  audioState: {
    state: "playing" | "paused";
    isLooping: boolean;
    position: number;
  };
  assets: CustomAsset[];
};

export type SongType = {
  id: string;
  title: string;
  uri: string;
  artist: string;
  duration: number;
  artwork: string;
};

export type Category = {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  screenName: string;
};
