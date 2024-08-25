import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LibraryFlatlist from "@/components/LibraryFlatlist";
import * as MusicLibrary from "expo-music-library";

const Artists = () => {
  const [artists, setArtists] = useState<MusicLibrary.Artist[]>([]);

  useEffect(() => {
    MusicLibrary.getArtistsAsync().then((artists) => {
      setArtists(artists);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <LibraryFlatlist data={artists} dataType={"artists"} />
    </View>
  );
};

export default Artists;

const styles = StyleSheet.create({});
