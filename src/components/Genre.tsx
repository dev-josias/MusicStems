import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";

const Genre = ({ id, title }: { id: string; title: string }) => {
  const navigation = useNavigation();

  const goToGenresSongs = () => {
    navigation.navigate("SongsList", {
      genreId: id,
      title: `Genres - ${title}`,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={goToGenresSongs}>
      <View style={styles.innerContent}>
        <MaterialCommunityIcons
          name="music-box"
          size={50}
          color={colors.white}
        />
        <AppText text={title} customStyles={{ textAlign: "center" }} />
      </View>
    </TouchableOpacity>
  );
};

export default Genre;

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
    backgroundColor: "rgba(0,0,0, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
});
