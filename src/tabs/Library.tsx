import { ActivityIndicator, View } from "react-native";
import React from "react";
import useMusicLibrary from "@/hooks/useMusicLibrary";
import SongsList from "@/components/SongsList";
import { colors } from "@/theme/colors";
import { CustomAsset } from "@/types";

const Library = () => {
  const { assets, isLoadingMore, loadMore } = useMusicLibrary();

  const handleLoadMore = () => {
    if (assets.length >= 20) {
      loadMore();
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
      <SongsList
        songs={assets as CustomAsset[]}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        ListFooterComponent={() =>
          isLoadingMore ? (
            <ActivityIndicator size={"large"} color={colors.white} />
          ) : null
        }
      />
    </View>
  );
};

export default Library;
