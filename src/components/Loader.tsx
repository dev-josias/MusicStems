import { colors } from "@/theme/colors";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} color={colors.white} />
    </View>
  );
};

export default Loader;
