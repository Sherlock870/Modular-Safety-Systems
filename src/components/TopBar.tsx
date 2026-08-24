import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";
import { fontSize, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";

interface TopBarProps {
  title: string;
  onBack?: () => void;
}

export function TopBar({ title, onBack }: TopBarProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.bar}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.backButton} hitSlop={8}>
          <ChevronLeft size={20} color={colors.textMuted} />
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    bar: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.borderLight,
    },
    backButton: {
      padding: spacing.xs,
      marginLeft: -spacing.xs,
    },
    spacer: {
      width: 20,
    },
    title: {
      fontSize: fontSize.lg,
      fontWeight: "500",
      color: colors.text,
      letterSpacing: 0.3,
    },
  });
