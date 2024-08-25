import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LibraryFlatlist from "@/components/LibraryFlatlist";
import * as MusicLibrary from "expo-music-library";

const Genres = () => {
  const [genres, setGenres] = useState<MusicLibrary.Genre[]>([]);

  useEffect(() => {
    MusicLibrary.getGenresAsync().then((genres) => {
      setGenres(genres);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <LibraryFlatlist data={genres} dataType={"genres"} />
    </View>
  );
};

export default Genres;

const styles = StyleSheet.create({});
