import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import SongsList from "@/components/SongsList";
import AppHeader from "@/components/AppHeader";
import { globalStyles } from "@/theme/globalStyles";
import * as MusicLibrary from "expo-music-library";
import { truncate } from "@/helpers/truncate";

const SongsListScreen = ({ route }) => {
  const { albumName, artistId, genreId, folderId, title } = route.params;
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    if (albumName) {
      fetchAlbumsAssets();
    } else if (artistId) {
      fetchArtistsAssets();
    } else if (genreId) {
      fetchGenresAssets();
    } else if (folderId) {
      fetchFoldersAssets();
    }
  }, []);

  const fetchAlbumsAssets = async () => {
    const songs = await MusicLibrary.getAlbumAssetsAsync(albumName);
    setAssets(songs);
  };

  const fetchArtistsAssets = async () => {
    const songs = await MusicLibrary.getArtistAssetsAsync(artistId);
    setAssets(songs);
  };
  const fetchGenresAssets = async () => {
    const songs = await MusicLibrary.getGenreAssetsAsync(genreId);
    setAssets(songs);
  };

  const fetchFoldersAssets = async () => {
    const songs = await MusicLibrary.getFolderAssetsAsync(folderId);
    setAssets(songs);
  };

  return (
    <Screen>
      <AppHeader title={truncate(title, 20)} searchIcon />
      <View style={globalStyles.container}>
        <SongsList songs={assets} />
      </View>
    </Screen>
  );
};

export default SongsListScreen;
