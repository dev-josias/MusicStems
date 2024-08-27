import {
  FlatList,
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Screen from "@/components/Screen";
import AppText from "@/components/AppText";
import Card from "@/components/Card";
import { categories } from "@/data/categories";
import AppHeader from "@/components/AppHeader";
import { colors } from "@/theme/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Input from "@/components/Input";
import { useDispatch } from "react-redux";
import { setPlaylists } from "@/features/storage/storageSlice";
import { useAppSelector } from "@/app/hooks";
import { MaterialCommunityIcons } from "@/components/Icons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";

const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const playlists = useAppSelector((state) => state.storage.playlists);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (auth().currentUser) {
        messaging()
          .getToken()
          .then((fcmToken: string) => {
            updateUserToken(fcmToken);
          });
        messaging().onTokenRefresh((fcmToken) => {
          updateUserToken(fcmToken);
        });
      }
    }, [auth().currentUser])
  );

  const updateUserToken = async (fcmToken: string) => {
    try {
      await firestore().collection("users").doc(auth().currentUser.uid).update({
        fcmToken,
        emailVerified: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoriesPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handlePlaylistPress = (item) => {
    if (item.title) {
      navigation.navigate("Playlist", { id: item.id });
    } else {
      setShowModal(true);
    }
  };

  const handleTextChange = (text) => {
    setPlaylistName(text);
  };

  const addPlaylist = () => {
    const newPlaylists = [...playlists];
    newPlaylists.push({
      id: `${playlists.length + 1}`,
      title: playlistName,
      assets: [],
    });

    dispatch(setPlaylists(newPlaylists));
    setShowModal(false);
  };

  const deletePlaylist = (id) => {
    const index = playlists.findIndex((playlist) => playlist.id === id);
    if (index !== -1) {
      const newPlaylists = [...playlists];
      newPlaylists.splice(index, 1);
      dispatch(setPlaylists(newPlaylists));
    }
  };

  return (
    <Screen>
      <AppHeader primaryScreen title={"Stems Player"} searchIcon />
      <View style={styles.container}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Card
              {...item}
              onPress={() => handleCategoriesPress(item.screenName)}
            />
          )}
          keyExtractor={(item) => item.title}
          numColumns={3}
          style={styles.flatlist}
        />
        <View style={styles.playlistSection}>
          <AppText
            text={"Playlists"}
            customStyles={styles.playlistSectionTitle}
          />
          <FlatList
            data={[
              ...playlists,
              { iconName: "plus" } as {
                iconName: keyof typeof MaterialCommunityIcons.glyphMap;
              },
            ]}
            renderItem={({ item }) => (
              <Card
                {...item}
                type={"playlist"}
                onPress={() => handlePlaylistPress(item)}
                deletePlaylist={deletePlaylist}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            style={styles.flatlist}
          />
        </View>
      </View>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
      >
        <View style={styles.modalOverlay} />
        <View style={styles.modalContent}>
          <View style={styles.form}>
            <Input
              placeholder={"Playlist Name"}
              onChangeText={handleTextChange}
              autoFocus
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowModal(false)}
              >
                <AppText text={"Cancel"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={addPlaylist}
              >
                <AppText text={"Add"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    flex: 1,
    width: "100%",
  },
  form: {
    width: "80%",
    height: 200,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonsContainer: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalOverlay: {
    backgroundColor: colors.blackTransparent,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playlistSection: {
    flex: 1.5,
    width: "100%",
  },
  playlistSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.white,
  },
});
