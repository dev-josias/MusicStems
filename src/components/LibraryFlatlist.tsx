import { FlatList, StyleSheet } from "react-native";
import React from "react";
import Album from "./Album";
import Artist from "./Artist";
import Genre from "./Genre";

const LibraryFlatlist = ({
  data,
  dataType,
}: {
  data: any[];
  dataType: "albums" | "artists" | "genres";
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        dataType === "albums" ? (
          <Album {...item} />
        ) : dataType === "artists" ? (
          <Artist {...item} />
        ) : (
          <Genre {...item} />
        )
      }
      keyExtractor={(_: any, index: number) => index.toString()}
      numColumns={2}
      style={styles.flatlist}
      contentContainerStyle={styles.flatlistContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LibraryFlatlist;

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    padding: 20,
  },
  flatlistContent: {
    paddingBottom: 50,
  },
  imageContainer: {
    width: "50%",
    height: 180,
    padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
