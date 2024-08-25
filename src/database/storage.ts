import AsyncStorage from "@react-native-async-storage/async-storage";

export const create = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const get = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const remove = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const clear = async () => {
  await AsyncStorage.clear();
};
