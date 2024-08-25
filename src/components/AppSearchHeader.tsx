import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import Input from "./Input";

type AppSearchHeaderProps = {
  primaryScreen?: boolean;
  playlistIcon?: boolean;
  searchIcon?: boolean;
  onSearch: (text: string) => void;
};

const AppSearchHeader = ({
  primaryScreen,
  searchIcon,
  playlistIcon,
  onSearch,
}: AppSearchHeaderProps) => {
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

        <Input
          placeholder="Search"
          onChangeText={(text) => onSearch(text)}
          customStyles={styles.searchInput}
          autoFocus
          blurOnSubmit
        />
      </View>
      <View style={styles.icons}>
        {searchIcon && (
          <TouchableOpacity style={styles.searchIcon}>
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
        {playlistIcon && (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="playlist-music"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppSearchHeader;

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
  },
  searchIcon: {
    justifyContent: "flex-end",
  },
  searchInput: {
    marginLeft: 10,
  },
});
