import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import SongsList from "@/components/SongsList";
import AppHeader from "@/components/AppHeader";
import useMusicLibrary from "@/hooks/useMusicLibrary";
import { globalStyles } from "@/theme/globalStyles";
import { updatePlaylists } from "@/features/storage/storageSlice";
import { colors } from "@/theme/colors";
import SelectSong from "@/components/SelectSong";
import AppText from "@/components/AppText";
import { RootState } from "@/app/store";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Playlist } from "@/types";

const PlaylistScreen = ({ route }) => {
  const { id } = route.params;
  const [showModal, setShowModal] = useState(false);
  const { assets, loadMore, isLoadingMore } = useMusicLibrary();
  const playlists = useAppSelector(
    (state: RootState) => state.storage.playlists
  );
  const [playlist, setPlaylist] = useState<Playlist>();
  const [tempItems, setTempItems] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPlaylist(playlists.find((playlist) => playlist.id === id));
  }, [playlists]);

  const handleLoadMore = () => {
    if (assets.length >= 20) {
      loadMore();
    }
  };

  const clearPlaylist = () => {
    dispatch(
      updatePlaylists({
        ...playlist,
        assets: [],
      })
    );
  };

  const addSongToTempItems = (song) => {
    const index = tempItems.findIndex((tempItem) => tempItem.id === song.id);
    if (index === -1) {
      setTempItems([...tempItems, song]);
    } else {
      const newTempItems = [...tempItems];
      newTempItems.splice(index, 1);
      setTempItems(newTempItems);
    }
  };

  const validateChoices = () => {
    dispatch(
      updatePlaylists({
        ...playlist,
        assets: [...playlist.assets, ...tempItems],
      })
    );
    setShowModal(false);
    setTempItems([]);
  };

  return (
    <Screen>
      <AppHeader
        title={playlist?.title}
        plusIcon
        onPlusIconPress={() => setShowModal(true)}
        clearIcon
        onClearIconPress={clearPlaylist}
      />
      <View style={globalStyles.container}>
        <SongsList songs={playlist?.assets} />
      </View>
      <Modal
        transparent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.flatlistContainer}>
            <FlatList
              data={assets}
              renderItem={({ item }) => (
                <SelectSong {...item} onSelect={addSongToTempItems} />
              )}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              extraData={assets}
              ListFooterComponent={() =>
                isLoadingMore ? (
                  <ActivityIndicator size={"large"} color={colors.white} />
                ) : null
              }
            />
          </View>
          {tempItems.length > 0 && (
            <TouchableOpacity onPress={validateChoices} style={styles.done}>
              <AppText text={"Done"} />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </Screen>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 20,
  },
  flatlistContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  done: {
    backgroundColor: colors.danger,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});
