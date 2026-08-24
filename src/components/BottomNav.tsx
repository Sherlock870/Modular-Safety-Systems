import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ShieldCheck, Settings, Users } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";
import { fontSize, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";

type TabKey = "home" | "contacts" | "settings";

interface BottomNavProps {
  active: TabKey;
  onHome?: () => void;
  onContacts?: () => void;
  onSettings?: () => void;
  /** Hide the Contacts tab — for guardian-only accounts, who have no one to add */
  showContacts?: boolean;
}

/** Tab bar — settings wired up in a later increment */
export function BottomNav({ active, onHome, onContacts, onSettings, showContacts = true }: BottomNavProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.bar}>
      <NavItem
        icon={<ShieldCheck size={18} color={active === "home" ? colors.success : colors.textDim} />}
        label="Home"
        active={active === "home"}
        onPress={onHome}
        colors={colors}
      />
      {showContacts && (
        <NavItem
          icon={<Users size={18} color={active === "contacts" ? colors.success : colors.textDim} />}
          label="Contacts"
          active={active === "contacts"}
          onPress={onContacts}
          colors={colors}
        />
      )}
      <NavItem
        icon={<Settings size={18} color={active === "settings" ? colors.success : colors.textDim} />}
        label="Settings"
        active={active === "settings"}
        onPress={onSettings}
        colors={colors}
      />
    </View>
  );
}

function NavItem({
  icon,
  label,
  active,
  onPress,
  colors,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onPress?: () => void;
  colors: Palette;
}) {
  const styles = createStyles(colors);
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress && !active}
      style={styles.item}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      {icon}
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    bar: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: spacing.md,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    item: {
      alignItems: "center",
      gap: 2,
      minWidth: 64,
    },
    label: {
      fontSize: fontSize.sm,
      color: colors.textDim,
    },
    labelActive: {
      color: colors.success,
    },
  });
