import { SongType } from ".";

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Library: undefined;
  Folders: undefined;
  Favorites: undefined;
  MostPlayed: undefined;
  Player: SongType;
  Playlist: { id: string };
  RecentPlay: undefined;
  RecentAdd: undefined;
  Search: undefined;
  Login: undefined;
  Register: undefined;
  SongsList: {
    albumName?: string;
    title: string;
    artistId?: string;
    genreId?: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
