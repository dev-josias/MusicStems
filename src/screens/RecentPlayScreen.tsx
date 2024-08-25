import { View } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import AppHeader from "@/components/AppHeader";
import SongsList from "@/components/SongsList";
import { globalStyles } from "@/theme/globalStyles";
import { useAppSelector } from "@/app/hooks";

const RecentPlayScreen = () => {
  const recentlyPlayed = useAppSelector(
    (state) => state.storage.recentlyPlayed
  );
  return (
    <Screen>
      <AppHeader title={"Recently Played"} searchIcon />
      <View style={globalStyles.container}>
        <SongsList songs={recentlyPlayed} />
      </View>
    </Screen>
  );
};

export default RecentPlayScreen;
