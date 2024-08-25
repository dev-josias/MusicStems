import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "@/components/AppButton";

type StemActionsProps = {
  stemUrls: string | null;
  onPlay: () => void;
  onNewExtraction: () => void;
  onExtractStems: () => void;
};

const StemActions: React.FC<StemActionsProps> = ({
  stemUrls,
  onPlay,
  onNewExtraction,
  onExtractStems,
}) => (
  <View style={styles.stemsContainer}>
    <AppButton
      title={stemUrls ? "Play Stemz" : "Extract Stems"}
      onPress={stemUrls ? onPlay : onExtractStems}
    />
    {stemUrls && (
      <AppButton
        title="New Extraction"
        onPress={onNewExtraction}
        buttonStyle={{ marginVertical: 20 }}
      />
    )}
  </View>
);

export default StemActions;

const styles = StyleSheet.create({
  stemsContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
});
