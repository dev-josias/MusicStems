import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "@/screens/SplashScreen";
import HomeScreen from "@/screens/HomeScreen";
import LibraryScreen from "@/screens/LibraryScreen";
import FavoritesScreen from "@/screens/FavoritesScreen";
import MostPlayedScreen from "@/screens/MostPlayedScreen";
import PlayerScreen from "@/screens/PlayerScreen";
import PlaylistScreen from "@/screens/PlaylistScreen";
import RecentPlayScreen from "@/screens/RecentPlayScreen";
import RecentAddScreen from "@/screens/RecentAddScreen";
import SearchScreen from "@/screens/SearchScreen";
import SongsListScreen from "@/screens/SongsListScreen";
import FoldersScreen from "@/screens/FoldersScreen";
import { RootStackParamList } from "@/types/navigation";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="Splash" component={SplashScreen} />
    <NativeStack.Screen name="Home" component={HomeScreen} />
    <NativeStack.Screen name="Library" component={LibraryScreen} />
    <NativeStack.Screen name="Folders" component={FoldersScreen} />
    <NativeStack.Screen name="Favorites" component={FavoritesScreen} />
    <NativeStack.Screen name="MostPlayed" component={MostPlayedScreen} />
    <NativeStack.Screen name="Player" component={PlayerScreen} />
    <NativeStack.Screen name="Playlist" component={PlaylistScreen} />
    <NativeStack.Screen name="RecentPlay" component={RecentPlayScreen} />
    <NativeStack.Screen name="RecentAdd" component={RecentAddScreen} />
    <NativeStack.Screen name="Search" component={SearchScreen} />
    <NativeStack.Screen name="SongsList" component={SongsListScreen} />
    <NativeStack.Screen name="Login" component={LoginScreen} />
    <NativeStack.Screen name="Register" component={RegisterScreen} />
  </NativeStack.Navigator>
);

export default RootNavigator;
