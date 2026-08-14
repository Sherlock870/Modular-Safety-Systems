import React, { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

interface ScreenProps {
  children: ReactNode;
  /** Override background — used on the alert screen */
  backgroundColor?: string;
}

/** Full-screen wrapper with safe-area padding and dark background */
export function Screen({ children, backgroundColor = colors.background }: ScreenProps) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]}>
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
