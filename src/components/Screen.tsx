import React, { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

interface ScreenProps {
  children: ReactNode;
  /** Override background — used on the alert screen, which keeps a fixed palette */
  backgroundColor?: string;
}

/** Full-screen wrapper with safe-area padding and theme-aware background */
export function Screen({ children, backgroundColor }: ScreenProps) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: backgroundColor ?? colors.background }]}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
