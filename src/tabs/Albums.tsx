import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import LibraryFlatlist from "@/components/LibraryFlatlist";
import * as MusicLibrary from "expo-music-library";

const Albums = () => {
  const [albums, setAlbums] = useState<MusicLibrary.Album[]>([]);

  useEffect(() => {
    MusicLibrary.getAlbumsAsync().then((albums) => {
      setAlbums(albums);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <LibraryFlatlist data={albums} dataType="albums" />
    </View>
  );
};

export default Albums;

const styles = StyleSheet.create({});
