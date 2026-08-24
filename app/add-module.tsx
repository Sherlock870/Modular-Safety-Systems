import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Bluetooth } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { addModuleCopy } from "@/constants/copy";
import { fontSize, radius, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";

/** Reachable from Settings (persistent) or Home's "Add a module" prompt — Sender/Both only. */
export default function AddModuleScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { pairModule } = useApp();

  const handlePair = () => {
    pairModule();
    router.back();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.cancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Bluetooth size={30} color={colors.success} />
          </View>
          <Text style={styles.title}>{addModuleCopy.title}</Text>
          <Text style={styles.body}>{addModuleCopy.body}</Text>

          <Pressable
            onPress={handlePair}
            style={({ pressed }) => [styles.pairButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={addModuleCopy.pairButton}
          >
            <Text style={styles.pairButtonText}>{addModuleCopy.pairButton}</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.xxl,
    },
    cancel: {
      alignSelf: "flex-end",
      paddingTop: spacing.lg,
      paddingVertical: spacing.sm,
    },
    cancelText: {
      fontSize: fontSize.base,
      color: colors.textMuted,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    iconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.surfaceRaised,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: fontSize.xxl,
      fontWeight: "500",
      color: colors.text,
      textAlign: "center",
      marginBottom: spacing.md,
    },
    body: {
      fontSize: fontSize.base,
      color: colors.textMuted,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: spacing.xxl,
    },
    pairButton: {
      width: "100%",
      paddingVertical: spacing.md,
      borderRadius: radius.md,
      backgroundColor: colors.successDark,
      alignItems: "center",
    },
    pairButtonText: {
      color: colors.white,
      fontSize: fontSize.base,
      fontWeight: "500",
    },
    pressed: {
      opacity: 0.85,
    },
  });
