import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigation";
import { useDispatch } from "react-redux";
import { get } from "./database/storage";
import {
  setFavorites,
  setMostPlayed,
  setPlaylists,
  setRecentlyPlayed,
} from "./features/storage/storageSlice";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const favoritesString = await get("favorites");
    dispatch(setFavorites(favoritesString ? JSON.parse(favoritesString) : []));

    const recentlyPlayedString = await get("recentlyPlayed");
    dispatch(
      setRecentlyPlayed(
        recentlyPlayedString ? JSON.parse(recentlyPlayedString) : []
      )
    );

    const mostPlayedString = await get("mostPlayed");
    dispatch(
      setMostPlayed(mostPlayedString ? JSON.parse(mostPlayedString) : [])
    );

    const playlistsString = await get("playlists");
    dispatch(setPlaylists(playlistsString ? JSON.parse(playlistsString) : []));
  };

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
