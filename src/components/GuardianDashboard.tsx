import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Users } from "lucide-react-native";
import { fontSize, radius, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

/** Incoming-alerts view for guardian / both accounts. Empty until multi-account sync exists. */
export function GuardianDashboard() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View>
      <Text style={styles.sectionLabel}>People you watch over</Text>
      <View style={styles.emptyCard}>
        <View style={styles.emptyIcon}>
          <Users size={22} color={colors.textDim} />
        </View>
        <Text style={styles.emptyTitle}>No one yet</Text>
        <Text style={styles.emptyBody}>
          When someone adds you as their guardian and sends an alert, it'll show up here with their live location.
        </Text>
      </View>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    sectionLabel: {
      fontSize: fontSize.sm,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: colors.textDim,
      marginBottom: spacing.sm,
      marginTop: spacing.xs,
    },
    emptyCard: {
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.xxl,
      alignItems: "center",
    },
    emptyIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.surfaceRaised,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.md,
    },
    emptyTitle: {
      fontSize: fontSize.base,
      fontWeight: "500",
      color: colors.text,
      marginBottom: spacing.xs,
    },
    emptyBody: {
      fontSize: fontSize.sm,
      color: colors.textDim,
      textAlign: "center",
      lineHeight: 16,
    },
  });
