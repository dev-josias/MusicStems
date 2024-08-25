import React from "react";
import { FlatList, FlatListProps, StyleSheet } from "react-native";
import Song from "./Song";
import { CustomAsset, SongType } from "@/types";

const SongsList = ({
  songs,
  ...otherProps
}: {
  songs: SongType[];
  onEndReachedThreshold?: FlatListProps<CustomAsset>["onEndReachedThreshold"];
  onEndReached?: FlatListProps<CustomAsset>["onEndReached"];
  ListFooterComponent?: FlatListProps<CustomAsset>["ListFooterComponent"];
}) => {
  return (
    <FlatList
      data={songs}
      extraData={songs}
      renderItem={({ item }) => <Song {...item} />}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    />
  );
};

export default SongsList;
