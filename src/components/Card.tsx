import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { colors } from "@/theme/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "./Icons";

type CardProps = {
  id?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  title?: string;
  type?: string;
  onPress: TouchableOpacityProps["onPress"];
  deletePlaylist?: (id: string) => void;
};

const Card = ({
  id,
  iconName,
  title,
  type,
  onPress,
  deletePlaylist,
}: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.innerContent}>
        <MaterialCommunityIcons
          name={
            title && type == "playlist"
              ? "playlist-music"
              : title && type == "folder"
              ? "folder"
              : iconName
          }
          size={50}
          color={colors.black}
        />
        {title && <AppText text={title} customStyles={styles.title} />}
        {title && type == "playlist" && (
          <TouchableOpacity
            style={styles.trash}
            onPress={() => deletePlaylist(id)}
          >
            <MaterialCommunityIcons
              name="close-box"
              size={20}
              color={colors.black}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: "30%", // Ensure cards take 30% of the parent width to maintain grid layout
    aspectRatio: 1, // Maintain a square aspect ratio
    padding: 5,
    margin: 5,
  },
  innerContent: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  trash: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
