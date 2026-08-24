import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ShieldCheck, ShieldPlus, Users } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { roleSelectCopy } from "@/constants/copy";
import { fontSize, radius, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import type { UserRole } from "@/types";

const ROLE_ICONS: Record<UserRole, typeof ShieldCheck> = {
  sender: ShieldCheck,
  guardian: Users,
  both: ShieldPlus,
};

interface RoleSelectProps {
  onSelect: (role: UserRole) => void;
}

/** Shown once on first app open, before "Meet your SafeModule" — each person picks their own role. */
export function RoleSelect({ onSelect }: RoleSelectProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <ShieldCheck size={30} color={colors.success} />
        </View>
        <Text style={styles.title}>{roleSelectCopy.title}</Text>
        <Text style={styles.body}>{roleSelectCopy.body}</Text>

        <View style={styles.options}>
          {roleSelectCopy.options.map((option) => {
            const Icon = ROLE_ICONS[option.role];
            return (
              <Pressable
                key={option.role}
                onPress={() => onSelect(option.role)}
                style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
                accessibilityRole="button"
                accessibilityLabel={option.label}
              >
                <View style={styles.optionIcon}>
                  <Icon size={18} color={colors.success} />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: spacing.xxl,
    },
    iconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.surfaceRaised,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
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
    },
    options: {
      width: "100%",
      gap: spacing.sm,
      marginTop: spacing.xxl,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.md,
    },
    optionPressed: {
      opacity: 0.85,
    },
    optionIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surfaceRaised,
      alignItems: "center",
      justifyContent: "center",
    },
    optionText: {
      flex: 1,
    },
    optionLabel: {
      fontSize: fontSize.base,
      fontWeight: "500",
      color: colors.text,
    },
    optionDescription: {
      fontSize: fontSize.sm,
      color: colors.textDim,
      marginTop: 2,
      lineHeight: 14,
    },
  });
