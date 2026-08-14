import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fontSize, radius, spacing } from "@/constants/theme";

interface StatusPillProps {
  ok: boolean;
  label: string;
}

export function StatusPill({ ok, label }: StatusPillProps) {
  return (
    <View style={styles.pill}>
      <View style={[styles.dot, { backgroundColor: ok ? colors.success : colors.warning }]} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
});
