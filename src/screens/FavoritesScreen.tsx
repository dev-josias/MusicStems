import { View } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import AppHeader from "@/components/AppHeader";
import SongsList from "@/components/SongsList";
import { globalStyles } from "@/theme/globalStyles";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const FavoritesScreen = () => {
  const favorites = useSelector((state: RootState) => state.storage.favorites);

  return (
    <Screen>
      <AppHeader title={"Favorites"} searchIcon />
      <View style={globalStyles.container}>
        <SongsList songs={favorites} />
      </View>
    </Screen>
  );
};

export default FavoritesScreen;
