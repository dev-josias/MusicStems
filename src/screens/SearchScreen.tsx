import { ActivityIndicator, View } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import AppSearchHeader from "@/components/AppSearchHeader";
import { globalStyles } from "@/theme/globalStyles";
import SongsList from "@/components/SongsList";
import useMusicLibrary from "@/hooks/useMusicLibrary";
import { colors } from "@/theme/colors";
import { CustomAsset } from "@/types";

const SearchScreen = () => {
  const { filteredAssets, search, isLoadingMore, loadMoreSearch } =
    useMusicLibrary();

  const handleLoadMore = () => {
    if (filteredAssets.length >= 20) {
      loadMoreSearch();
    }
  };

  return (
    <Screen>
      <AppSearchHeader searchIcon onSearch={search} />
      <View style={globalStyles.container}>
        <SongsList
          songs={filteredAssets as CustomAsset[]}
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

export default SearchScreen;
