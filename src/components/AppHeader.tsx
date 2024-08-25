import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";

type AppHeaderProps = {
  primaryScreen?: boolean;
  title: string;
  searchIcon?: boolean;
  playlistIcon?: boolean;
  plusIcon?: boolean;
  onPlusIconPress?: TouchableOpacityProps["onPress"];
  clearIcon?: boolean;
  onClearIconPress?: TouchableOpacityProps["onPress"];
};

const AppHeader = ({
  primaryScreen,
  title,
  searchIcon,
  playlistIcon,
  plusIcon,
  onPlusIconPress,
  clearIcon,
  onClearIconPress,
}: AppHeaderProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (primaryScreen) {
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.mainContent}>
        {!primaryScreen && (
          <TouchableOpacity onPress={handlePress}>
            <MaterialCommunityIcons
              name={"arrow-left"}
              color={colors.white}
              size={35}
            />
          </TouchableOpacity>
        )}

        <AppText text={title} customStyles={styles.title} />
      </View>
      <View style={styles.icons}>
        {searchIcon && (
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => navigation.navigate("Search")}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
        {playlistIcon && (
          <TouchableOpacity onPress={() => navigation.navigate("Playlist")}>
            <MaterialCommunityIcons
              name="playlist-music"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
        {plusIcon && (
          <TouchableOpacity onPress={onPlusIconPress}>
            <MaterialCommunityIcons
              name="plus-circle"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
        {clearIcon && (
          <TouchableOpacity onPress={onClearIconPress}>
            <MaterialCommunityIcons
              name="delete-empty"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 55,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    backgroundColor: colors.primary,
    elevation: 10,
    paddingHorizontal: 20,
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    color: colors.white,
  },
  searchIcon: {
    justifyContent: "flex-end",
  },
});
