import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Bluetooth, ChevronRight, ShieldCheck } from "lucide-react-native";
import { BottomNav } from "@/components/BottomNav";
import { Screen } from "@/components/Screen";
import { roleSelectCopy } from "@/constants/copy";
import { fontSize, radius, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { userRole, moduleAdded } = useApp();

  // userRole is only null momentarily before RoleSelect/onboarding resolves it (see app/index.tsx).
  const currentRoleOption = roleSelectCopy.options.find((option) => option.role === userRole);
  const showsSenderContent = userRole === "sender" || userRole === "both";

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.greeting}>Settings</Text>
        <Text style={styles.userName}>Your account</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Your role</Text>
        <Pressable
          onPress={() => router.push("/change-role")}
          style={({ pressed }) => [styles.card, styles.row, pressed && styles.pressed]}
        >
          <View style={styles.rowIcon}>
            <ShieldCheck size={18} color={colors.success} />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>{currentRoleOption?.label ?? "Choose a role"}</Text>
            {currentRoleOption && (
              <Text style={styles.rowSubtitle}>{currentRoleOption.description}</Text>
            )}
          </View>
          <ChevronRight size={16} color={colors.textDim} />
        </Pressable>

        {showsSenderContent && (
          <>
            <Text style={styles.sectionLabel}>Module</Text>
            {moduleAdded ? (
              <View style={[styles.card, styles.row]}>
                <View style={styles.rowIcon}>
                  <Bluetooth size={18} color={colors.success} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>Module paired</Text>
                  <Text style={styles.rowSubtitle}>Manage it from Home.</Text>
                </View>
              </View>
            ) : (
              <Pressable
                onPress={() => router.push("/add-module")}
                style={({ pressed }) => [styles.card, styles.row, pressed && styles.pressed]}
              >
                <View style={styles.rowIcon}>
                  <Bluetooth size={18} color={colors.textMuted} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>Add a module</Text>
                  <Text style={styles.rowSubtitle}>Pair your SafeModule to enable SOS and detection.</Text>
                </View>
                <ChevronRight size={16} color={colors.textDim} />
              </Pressable>
            )}
          </>
        )}
      </ScrollView>

      <BottomNav
        active="settings"
        showContacts={userRole !== "guardian"}
        onHome={() => router.replace("/")}
        onContacts={() => router.push("/contacts")}
      />
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl,
      paddingBottom: spacing.lg,
    },
    greeting: {
      fontSize: fontSize.md,
      color: colors.textMuted,
    },
    userName: {
      fontSize: fontSize.xl,
      fontWeight: "500",
      color: colors.text,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.lg,
    },
    sectionLabel: {
      fontSize: fontSize.sm,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: colors.textDim,
      marginBottom: spacing.sm,
      marginTop: spacing.xs,
    },
    card: {
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    pressed: {
      opacity: 0.85,
    },
    rowIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surfaceRaised,
      alignItems: "center",
      justifyContent: "center",
    },
    rowText: {
      flex: 1,
    },
    rowTitle: {
      fontSize: fontSize.base,
      fontWeight: "500",
      color: colors.text,
    },
    rowSubtitle: {
      fontSize: fontSize.sm,
      color: colors.textDim,
      marginTop: 2,
      lineHeight: 14,
    },
  });
