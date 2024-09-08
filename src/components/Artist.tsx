import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";

const Artist = ({ id, title }: { id: string; title: string }) => {
  const navigation = useNavigation();

  const goToArtistSongs = () => {
    navigation.navigate("SongsList", {
      artistId: id,
      title: `Artists - ${title}`,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToArtistSongs}>
      <View style={styles.innerContent}>
        <MaterialCommunityIcons
          name="music-box"
          size={50}
          color={colors.black}
        />
        <AppText text={title} customStyles={{ textAlign: "center" }} />
      </View>
    </TouchableOpacity>
  );
};

export default Artist;

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
    paddingHorizontal: 5,
  },
});
