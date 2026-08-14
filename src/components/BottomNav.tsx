import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ShieldCheck, Settings, Users } from "lucide-react-native";
import { colors, fontSize, spacing } from "@/constants/theme";

type TabKey = "home" | "contacts" | "settings";

interface BottomNavProps {
  active: TabKey;
  onContacts?: () => void;
  onSettings?: () => void;
}

/** Tab bar — contacts/settings wired up in a later increment */
export function BottomNav({ active, onContacts, onSettings }: BottomNavProps) {
  return (
    <View style={styles.bar}>
      <NavItem
        icon={<ShieldCheck size={18} color={active === "home" ? colors.success : colors.textDim} />}
        label="Home"
        active={active === "home"}
      />
      <NavItem
        icon={<Users size={18} color={active === "contacts" ? colors.success : colors.textDim} />}
        label="Contacts"
        active={active === "contacts"}
        onPress={onContacts}
      />
      <NavItem
        icon={<Settings size={18} color={active === "settings" ? colors.success : colors.textDim} />}
        label="Settings"
        active={active === "settings"}
        onPress={onSettings}
      />
    </View>
  );
}

function NavItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onPress?: () => void;
}) {
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

const styles = StyleSheet.create({
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
