import * as MusicLibrary from "expo-music-library";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAssets, setQueue } from "@/features/queue/queueSlice";
import { useAppSelector } from "@/app/hooks";

const useMusicLibrary = (sortBy?: MusicLibrary.SortByValue) => {
  const [lastMusicAsset, setLastMusicAsset] = useState<MusicLibrary.AssetRef>();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const assets = useAppSelector((state) => state.queue.assets);
  const [filteredAssets, setFilteredAssets] = useState<MusicLibrary.Asset[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getAudios();
  }, []);

  useEffect(() => {
    dispatch(setQueue(assets));
    setFilteredAssets(assets);
  }, [assets]);

  const getAudios = async () => {
    const results = await MusicLibrary.getAssetsAsync({
      first: 20,
      mediaType: MusicLibrary.MediaType.audio,
      sortBy: sortBy || MusicLibrary.SortBy.default,
    });

    dispatch(setAssets(results.assets));
    setLastMusicAsset(results.endCursor);
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    const results = await MusicLibrary.getAssetsAsync({
      first: 20,
      mediaType: MusicLibrary.MediaType.audio,
      sortBy: sortBy || MusicLibrary.SortBy.default,
      after: lastMusicAsset,
    });

    const newAssets = [...assets, ...results.assets];
    dispatch(setAssets(newAssets));
    setLastMusicAsset(results.endCursor);
    setIsLoadingMore(false);
  };

  const search = async (query) => {
    setSearchQuery(query);
    if (query !== "") {
      const results = await MusicLibrary.getAssetsAsync({
        mediaType: MusicLibrary.MediaType.audio,
        sortBy: sortBy || MusicLibrary.SortBy.default,
      });
      setFilteredAssets(
        results.assets.filter(
          (asset) =>
            asset.title.toLowerCase().includes(query.toLowerCase()) ||
            asset.artist.toLowerCase().includes(query.toLowerCase())
        )
      );
      setLastMusicAsset(results.endCursor);
    } else {
      setFilteredAssets(assets);
    }
  };
  const loadMoreSearch = async () => {
    setIsLoadingMore(true);
    const results = await MusicLibrary.getAssetsAsync({
      after: lastMusicAsset,
      mediaType: MusicLibrary.MediaType.audio,
      sortBy: sortBy || MusicLibrary.SortBy.default,
    });

    const newAssets =
      searchQuery !== ""
        ? [
            ...filteredAssets,
            ...results.assets.filter(
              (asset) =>
                asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.artist.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          ]
        : [...filteredAssets, ...results.assets];
    setFilteredAssets(newAssets);
    setLastMusicAsset(results.endCursor);
    setIsLoadingMore(false);
  };

  return {
    assets,
    isLoadingMore,
    loadMore,
    filteredAssets,
    search,
    loadMoreSearch,
  };
};

export default useMusicLibrary;
