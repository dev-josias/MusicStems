import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import AppHeader from "@/components/AppHeader";
import Card from "@/components/Card";
import { globalStyles } from "@/theme/globalStyles";
import * as MusicLibrary from "expo-music-library";

const FoldersScreen = ({ navigation }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    MusicLibrary.getFoldersAsync().then((folders) => {
      setFolders(folders);
    });
  }, []);

  return (
    <Screen>
      <AppHeader title={"Folders"} searchIcon />
      <View style={globalStyles.container}>
        <FlatList
          data={folders}
          renderItem={({ item }) => (
            <Card
              {...item}
              type={"folder"}
              onPress={() =>
                navigation.navigate("SongsList", {
                  folderId: item.id,
                  title: `Folders - ${item.title}`,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
};

export default FoldersScreen;
