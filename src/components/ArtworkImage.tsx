import { Image, ImageStyle, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

const ArtworkImage = ({
  artwork,
  styles,
}: {
  artwork: string;
  styles: ImageStyle;
}) => {
  const [artworkExists, setArtworkExists] = useState(false);
  useEffect(() => {
    FileSystem.getInfoAsync(artwork).then(({ exists }) => {
      setArtworkExists(exists);
    });
  }, [artwork]);
  return (
    <Image
      source={
        artworkExists ? { uri: artwork } : require("../../assets/icon.png")
      }
      style={styles}
      resizeMode="contain"
    />
  );
};

export default ArtworkImage;

const styles = StyleSheet.create({});
