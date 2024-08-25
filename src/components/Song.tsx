import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import ArtworkImage from "./ArtworkImage";
import { convertTime } from "@/helpers/convertTime";
import { truncate } from "@/helpers/truncate";
import { SongType } from "@/types";

const Song = ({ id, title, uri, artist, duration, artwork }: SongType) => {
  const navigation = useNavigation();

  const goToPlayerScreen = () => {
    navigation.navigate("Player", {
      id,
      title,
      uri,
      artist,
      duration,
      artwork,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={goToPlayerScreen}>
      <View style={styles.songMainDetails}>
        <ArtworkImage artwork={artwork} styles={styles.image} />
        <View style={styles.songInfo}>
          <AppText text={truncate(title)} customStyles={styles.text} />
          <AppText text={artist} customStyles={styles.text} />
        </View>
      </View>
      <View>
        <AppText text={convertTime(duration)} customStyles={styles.text} />
      </View>
    </TouchableOpacity>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  songMainDetails: {
    flexDirection: "row",
  },
  songInfo: {
    marginLeft: 10,
  },
  text: {
    color: colors.white,
  },
});
