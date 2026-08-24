import React, { useEffect } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ShieldCheck, UserPlus } from "lucide-react-native";
import { BottomNav } from "@/components/BottomNav";
import { Screen } from "@/components/Screen";
import { contactsCopy } from "@/constants/copy";
import { fontSize, radius, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import type { TrustedContact } from "@/types";

export default function ContactsScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { contacts, toggleGuardianAccess, userRole } = useApp();

  // No role chosen yet (e.g. a direct link on first open) sends them through "/" to pick one first.
  // A guardian-only account isn't protecting anyone, so it has no contacts to add either.
  useEffect(() => {
    if (userRole === null || userRole === "guardian") {
      router.replace("/");
    }
  }, [userRole]);

  const showComingSoon = (feature: string) => {
    Alert.alert("Coming soon", `${feature} will be added in the next increment.`);
  };

  if (userRole === null || userRole === "guardian") {
    return null;
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.greeting}>Trusted contacts</Text>
        <Text style={styles.userName}>Who's in your circle</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>{contactsCopy.intro}</Text>

        <Text style={styles.sectionLabel}>Your contacts</Text>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            colors={colors}
            onToggleGuardian={() => toggleGuardianAccess(contact.id)}
          />
        ))}

        <Pressable
          onPress={() => showComingSoon("Adding contacts")}
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        >
          <UserPlus size={16} color={colors.textMuted} />
          <Text style={styles.addButtonText}>{contactsCopy.addContact}</Text>
        </Pressable>

        <Text style={styles.guardianNote}>{contactsCopy.guardianNote}</Text>
        <Text style={styles.guardianNote}>{contactsCopy.guardianRoleNote}</Text>
      </ScrollView>

      <BottomNav
        active="contacts"
        onHome={() => router.replace("/")}
        onSettings={() => router.push("/settings")}
      />
    </Screen>
  );
}

function ContactCard({
  contact,
  colors,
  onToggleGuardian,
}: {
  contact: TrustedContact;
  colors: Palette;
  onToggleGuardian: () => void;
}) {
  const styles = createStyles(colors);
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{contact.name}</Text>
          {contact.guardianAccess && (
            <ShieldCheck size={13} color={colors.success} />
          )}
        </View>
        <Text style={styles.relation}>{contact.relation}</Text>
      </View>
      <Text style={styles.phone}>{contact.phone}</Text>

      <View style={styles.segmented}>
        <Pressable
          onPress={() => contact.guardianAccess && onToggleGuardian()}
          style={[styles.segment, !contact.guardianAccess && styles.segmentActive]}
        >
          <Text style={[styles.segmentText, !contact.guardianAccess && styles.segmentTextActive]}>
            {contactsCopy.alertOnlyLabel}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => !contact.guardianAccess && onToggleGuardian()}
          style={[styles.segment, contact.guardianAccess && styles.segmentActive]}
        >
          <Text style={[styles.segmentText, contact.guardianAccess && styles.segmentTextActive]}>
            {contactsCopy.guardianLabel}
          </Text>
        </Pressable>
      </View>
    </View>
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
    intro: {
      fontSize: fontSize.sm,
      color: colors.textDim,
      lineHeight: 16,
      marginBottom: spacing.lg,
    },
    sectionLabel: {
      fontSize: fontSize.sm,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: colors.textDim,
      marginBottom: spacing.sm,
    },
    card: {
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.md,
    },
    cardTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    name: {
      fontSize: fontSize.base,
      fontWeight: "500",
      color: colors.text,
    },
    relation: {
      fontSize: fontSize.sm,
      color: colors.textMuted,
    },
    phone: {
      fontSize: fontSize.sm,
      color: colors.textDim,
      marginTop: 2,
      marginBottom: spacing.md,
    },
    segmented: {
      flexDirection: "row",
      backgroundColor: colors.surfaceRaised,
      borderRadius: radius.sm,
      padding: 3,
      gap: 3,
    },
    segment: {
      flex: 1,
      paddingVertical: 7,
      borderRadius: radius.sm - 3,
      alignItems: "center",
    },
    segmentActive: {
      backgroundColor: colors.successGlow,
    },
    segmentText: {
      fontSize: fontSize.sm,
      color: colors.textDim,
      fontWeight: "500",
    },
    segmentTextActive: {
      color: colors.success,
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
      borderRadius: radius.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderStyle: "dashed",
      paddingVertical: spacing.md,
      marginTop: spacing.xs,
      marginBottom: spacing.lg,
    },
    addButtonText: {
      fontSize: fontSize.base,
      color: colors.textMuted,
      fontWeight: "500",
    },
    pressed: {
      opacity: 0.85,
    },
    guardianNote: {
      fontSize: fontSize.sm,
      color: colors.textDim,
      lineHeight: 16,
      marginBottom: spacing.lg,
    },
  });
