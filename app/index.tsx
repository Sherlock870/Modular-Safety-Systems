import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Battery, Bluetooth, Settings } from "lucide-react-native";
import { BottomNav } from "@/components/BottomNav";
import { Screen } from "@/components/Screen";
import { SOSButton } from "@/components/SOSButton";
import { StatusPill } from "@/components/StatusPill";
import { copy } from "@/constants/copy";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { useApp } from "@/context/AppContext";

export default function HomeScreen() {
  const {
    connected,
    toggleConnection,
    battery,
    log,
    addLog,
    triggerAlert,
  } = useApp();

  const showComingSoon = (screen: string) => {
    Alert.alert("Coming soon", `${screen} will be added in the next increment.`);
  };

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good evening</Text>
          <Text style={styles.userName}>Alexander</Text>
        </View>
        <Pressable
          onPress={() => showComingSoon("Settings")}
          style={styles.settingsButton}
          accessibilityLabel="Settings"
        >
          <Settings size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Prototype disclaimer */}
        <Text style={styles.disclaimer}>{copy.prototypeDisclaimer}</Text>

        {/* Module status card */}
        <View style={styles.moduleCard}>
          <View style={styles.moduleHeader}>
            <View style={styles.moduleTitleRow}>
              <Bluetooth
                size={15}
                color={connected ? colors.success : colors.bluetoothOff}
              />
              <Text style={styles.moduleTitle}>
                {connected ? "Module connected" : "Module offline"}
              </Text>
            </View>
            <Pressable onPress={toggleConnection} hitSlop={8}>
              <Text style={styles.simulateLink}>
                {connected ? "simulate disconnect" : "reconnect"}
              </Text>
            </Pressable>
          </View>
          <View style={styles.moduleMeta}>
            <View style={styles.metaItem}>
              <Battery size={13} color={colors.textMuted} />
              <Text style={styles.metaText}>{battery}%</Text>
            </View>
            <Text style={styles.metaText}>Backpack mount</Text>
            <StatusPill ok={connected} label={connected ? "Live" : "No signal"} />
          </View>
        </View>

        {/* SOS section */}
        <Text style={styles.sectionLabel}>Emergency</Text>
        <View style={styles.sosSection}>
          <SOSButton onPress={() => triggerAlert("Manual SOS")} />
          <Text style={styles.sosHint}>{copy.sosHint}</Text>
        </View>

        {/* Sensor simulations (demo hardware events) */}
        <Text style={styles.sectionLabel}>Simulate sensor events</Text>
        <View style={styles.simGrid}>
          <SimButton
            title="Fall pattern"
            subtitle="Sudden drop + stillness"
            onPress={() => triggerAlert("Possible fall")}
          />
          <SimButton
            title="Tamper attempt"
            subtitle="Module forcibly removed"
            onPress={() => triggerAlert("Possible tampering")}
          />
          <SimButton
            title="Running"
            subtitle="Classified as normal"
            onPress={() => addLog("Running motion, no alert")}
          />
          <SimButton
            title="Set down"
            subtitle="Classified as normal"
            onPress={() => addLog("Backpack set down, no alert")}
          />
        </View>

        {/* Activity log */}
        <Text style={styles.sectionLabel}>Activity</Text>
        {log.length === 0 ? (
          <Text style={styles.emptyLog}>No events yet. Try a simulation above.</Text>
        ) : (
          log.map((entry) => (
            <View key={entry.id} style={styles.logRow}>
              <Text style={styles.logText}>{entry.text}</Text>
              <Text style={styles.logTime}>{entry.time}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <BottomNav
        active="home"
        onContacts={() => showComingSoon("Contacts")}
        onSettings={() => showComingSoon("Settings")}
      />
    </Screen>
  );
}

function SimButton({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.simButton, pressed && styles.simButtonPressed]}
    >
      <Text style={styles.simTitle}>{title}</Text>
      <Text style={styles.simSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  settingsButton: {
    padding: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  disclaimer: {
    fontSize: fontSize.sm,
    color: colors.textDim,
    marginBottom: spacing.md,
    lineHeight: 16,
  },
  moduleCard: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  moduleTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  moduleTitle: {
    fontSize: fontSize.base,
    fontWeight: "500",
    color: colors.text,
  },
  simulateLink: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textDecorationLine: "underline",
  },
  moduleMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  sectionLabel: {
    fontSize: fontSize.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.textDim,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  sosSection: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  sosHint: {
    fontSize: fontSize.sm,
    color: colors.textDim,
    marginTop: spacing.md,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
    lineHeight: 16,
  },
  simGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  simButton: {
    flexGrow: 1,
    flexBasis: "47%",
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
  },
  simButtonPressed: {
    opacity: 0.85,
  },
  simTitle: {
    fontSize: fontSize.md,
    fontWeight: "500",
    color: colors.text,
  },
  simSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textDim,
    marginTop: 2,
  },
  emptyLog: {
    fontSize: fontSize.sm,
    color: colors.textDim,
  },
  logRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
    paddingVertical: 6,
  },
  logText: {
    fontSize: 11.5,
    color: colors.textMuted,
    flex: 1,
    marginRight: spacing.sm,
  },
  logTime: {
    fontSize: fontSize.sm,
    color: colors.textDim,
  },
});
