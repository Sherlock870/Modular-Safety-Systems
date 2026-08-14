import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MapPin, TriangleAlert } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { copy } from "@/constants/copy";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { useApp } from "@/context/AppContext";

export default function AlertScreen() {
  const {
    alertState,
    alertReason,
    countdown,
    contacts,
    cancelAlert,
    confirmAlertNow,
    resolveAlert,
  } = useApp();

  const isActive = alertState === "active";
  const backgroundColor = isActive ? colors.alertActiveBg : colors.alertPendingBg;

  return (
    <Screen backgroundColor={backgroundColor}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <TriangleAlert
            size={32}
            color={isActive ? colors.warning : colors.warningLight}
          />
        </View>

        <Text style={styles.reason}>{alertReason}</Text>
        <Text style={styles.title}>
          {isActive ? copy.alertActiveTitle : copy.alertPendingTitle}
        </Text>

        {!isActive && (
          <>
            <Text style={styles.body}>
              {copy.alertPendingPrefix}
              <Text style={styles.countdown}>{countdown}s</Text>
              {copy.alertPendingSuffix}
            </Text>

            <Pressable
              onPress={cancelAlert}
              style={({ pressed }) => [styles.buttonSecondary, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Cancel alert"
            >
              <Text style={styles.buttonSecondaryText}>{copy.cancelAlert}</Text>
            </Pressable>

            <Pressable
              onPress={confirmAlertNow}
              style={({ pressed }) => [styles.buttonPrimary, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Send alert now"
            >
              <Text style={styles.buttonPrimaryText}>{copy.sendNow}</Text>
            </Pressable>
          </>
        )}

        {isActive && (
          <>
            <View style={styles.locationCard}>
              <View style={styles.locationHeader}>
                <MapPin size={13} color={colors.textMuted} />
                <Text style={styles.locationLabel}>{copy.sharedLocationLabel}</Text>
              </View>
              <Text style={styles.locationValue}>{copy.sharedLocationPlaceholder}</Text>
            </View>

            <View style={styles.contactList}>
              {contacts.map((contact) => (
                <View key={contact.id} style={styles.contactRow}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactStatus}>{copy.wouldNotify}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={resolveAlert}
              style={({ pressed }) => [styles.buttonSecondary, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Mark alert as resolved"
            >
              <Text style={styles.buttonSecondaryText}>{copy.markResolved}</Text>
            </Pressable>
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  reason: {
    fontSize: fontSize.base,
    color: colors.alertText,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "500",
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  body: {
    fontSize: 12.5,
    color: colors.alertTextMuted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: spacing.xxl,
  },
  countdown: {
    fontWeight: "600",
    color: colors.white,
  },
  buttonSecondary: {
    width: "100%",
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: spacing.sm,
  },
  buttonPrimary: {
    width: "100%",
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.sos,
  },
  buttonSecondaryText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonPrimaryText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: "500",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  locationCard: {
    width: "100%",
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.xs,
  },
  locationLabel: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  locationValue: {
    fontSize: fontSize.base,
    color: colors.text,
  },
  contactList: {
    width: "100%",
    gap: 6,
    marginBottom: spacing.xxl,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  contactName: {
    fontSize: 12.5,
    color: colors.text,
  },
  contactStatus: {
    fontSize: fontSize.sm,
    color: colors.success,
  },
});
