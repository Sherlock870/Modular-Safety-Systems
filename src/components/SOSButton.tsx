import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Bell } from "lucide-react-native";
import { colors, fontSize, radius } from "@/constants/theme";

interface SOSButtonProps {
  onPress: () => void;
}

/** Large accessible SOS trigger — tap starts the cancel-window flow */
export function SOSButton({ onPress }: SOSButtonProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.glowRing} />
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityRole="button"
        accessibilityLabel="SOS"
        accessibilityHint="Starts the emergency alert flow with a cancellation period"
      >
        <Bell size={26} color={colors.white} />
        <Text style={styles.label}>Tap for SOS</Text>
      </Pressable>
    </View>
  );
}

const BUTTON_SIZE = 128;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: BUTTON_SIZE + 16,
    height: BUTTON_SIZE + 16,
  },
  glowRing: {
    position: "absolute",
    width: BUTTON_SIZE + 16,
    height: BUTTON_SIZE + 16,
    borderRadius: radius.full,
    backgroundColor: colors.sosGlow,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.sos,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  label: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: "500",
    marginTop: 2,
  },
});
