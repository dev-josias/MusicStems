import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { SceneMap, TabView, TabBar } from "react-native-tab-view";

import AppHeader from "@/components/AppHeader";
import Screen from "@/components/Screen";
import { colors } from "@/theme/colors";
import Library from "@/tabs/Library";
import Artists from "@/tabs/Artists";
import Albums from "@/tabs/Albums";
import Genres from "@/tabs/Genres";

const renderScene = SceneMap({
  library: Library,
  artists: Artists,
  albums: Albums,
  genres: Genres,
});

const LibraryScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "library", title: "Library" },
    { key: "artists", title: "Artists" },
    { key: "albums", title: "Albums" },
    { key: "genres", title: "Genres" },
  ]);

  return (
    <Screen>
      <AppHeader title={"Library"} searchIcon />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.tabBarIndicatorStyle}
          />
        )}
      />
    </Screen>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.white,
  },
});
