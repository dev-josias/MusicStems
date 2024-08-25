import { ActivityIndicator, View } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import SongsList from "@/components/SongsList";
import AppHeader from "@/components/AppHeader";
import { globalStyles } from "@/theme/globalStyles";
import useMusicLibrary from "@/hooks/useMusicLibrary";
import { SortBy } from "expo-music-library";
import { colors } from "@/theme/colors";

const RecentAddScreen = () => {
  const { assets, isLoadingMore, loadMore } = useMusicLibrary(
    SortBy.modificationTime
  );

  const handleLoadMore = () => {
    if (assets.length >= 20) {
      loadMore();
    }
  };

  return (
    <Screen>
      <AppHeader title={"Recently Added"} searchIcon />
      <View style={globalStyles.container}>
        <SongsList
          songs={assets}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={() =>
            isLoadingMore ? (
              <ActivityIndicator size={"large"} color={colors.white} />
            ) : null
          }
        />
      </View>
    </Screen>
  );
};

export default RecentAddScreen;
