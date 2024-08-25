import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ArtworkImage from "./ArtworkImage";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";

const Album = ({ artwork, title }) => {
  const navigation = useNavigation();

  const gotToAlbumsSongs = () => {
    navigation.navigate("SongsList", {
      albumName: title,
      title: `Albums - ${title}`,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={gotToAlbumsSongs}>
      <View style={styles.innerContent}>
        <ArtworkImage artwork={artwork} styles={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

export default Album;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 150,
    padding: 5,
  },
  innerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
