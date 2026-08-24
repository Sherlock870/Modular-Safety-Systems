import React from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoleSelect } from "@/components/RoleSelect";
import { roleChangeCopy } from "@/constants/copy";
import { fontSize, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import type { UserRole } from "@/types";

/**
 * Reuses RoleSelect as-is (same component shown during onboarding) but adds a
 * confirmation step before committing, since this is a mid-use role change rather
 * than a first-time choice. RoleSelect itself is untouched — this screen only wraps it.
 */
export default function ChangeRoleScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { userRole, setUserRole } = useApp();

  const handleSelect = (newRole: UserRole) => {
    if (newRole === userRole) {
      router.back();
      return;
    }

    const losesSender = (userRole === "sender" || userRole === "both") && newRole === "guardian";
    const losesGuardian = (userRole === "guardian" || userRole === "both") && newRole === "sender";

    let title: string = roleChangeCopy.confirmOnlyTitle;
    let body: string = roleChangeCopy.confirmOnlyBody;
    if (losesSender) {
      title = roleChangeCopy.awayFromSenderTitle;
      body = roleChangeCopy.awayFromSenderBody;
    } else if (losesGuardian) {
      title = roleChangeCopy.awayFromGuardianTitle;
      body = roleChangeCopy.awayFromGuardianBody;
    }

    const commit = () => {
      setUserRole(newRole);
      router.back();
    };

    // RN Web's Alert.alert is a no-op stub, so confirmations there fall back to window.confirm.
    if (Platform.OS === "web") {
      if (window.confirm(`${title}\n\n${body}`)) {
        commit();
      }
      return;
    }

    Alert.alert(title, body, [
      { text: roleChangeCopy.cancelButton, style: "cancel" },
      {
        text: roleChangeCopy.confirmButton,
        style: losesSender || losesGuardian ? "destructive" : "default",
        onPress: commit,
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <RoleSelect onSelect={handleSelect} />
      <SafeAreaView style={styles.cancelOverlay}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    cancelOverlay: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      alignItems: "flex-end",
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.lg,
      pointerEvents: "box-none",
    },
    cancelText: {
      fontSize: fontSize.base,
      color: colors.textMuted,
      paddingVertical: spacing.sm,
    },
  });
