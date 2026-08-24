import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { Battery, Bluetooth, CircleHelp, Moon, Settings, Sun } from "lucide-react-native";
import { BottomNav } from "@/components/BottomNav";
import { GuardianDashboard } from "@/components/GuardianDashboard";
import { Onboarding } from "@/components/Onboarding";
import { RoleSelect } from "@/components/RoleSelect";
import { Screen } from "@/components/Screen";
import { SOSButton } from "@/components/SOSButton";
import { StatusPill } from "@/components/StatusPill";
import { copy } from "@/constants/copy";
import { fontSize, radius, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";

export default function HomeScreen() {
  const { colors, mode, toggleTheme } = useTheme();
  const styles = createStyles(colors);
  const {
    connected,
    toggleConnection,
    battery,
    log,
    triggerAlert,
    showOnboarding,
    openOnboarding,
    closeOnboarding,
    motionState,
    setSimulatedMotion,
    userRole,
    setUserRole,
    moduleAdded,
  } = useApp();
  const [homeTab, setHomeTab] = useState<"safety" | "guardian">("safety");

  if (userRole === null) {
    return <RoleSelect onSelect={setUserRole} />;
  }

  if (showOnboarding) {
    return <Onboarding onDone={closeOnboarding} />;
  }

  const showSenderContent = userRole === "sender" || (userRole === "both" && homeTab === "safety");
  const showGuardianContent = userRole === "guardian" || (userRole === "both" && homeTab === "guardian");

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good evening</Text>
          <Text style={styles.userName}>Alexander</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            onPress={toggleTheme}
            style={styles.settingsButton}
            accessibilityLabel={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mode === "dark" ? (
              <Sun size={16} color={colors.textMuted} />
            ) : (
              <Moon size={16} color={colors.textMuted} />
            )}
          </Pressable>
          <Pressable
            onPress={openOnboarding}
            style={styles.settingsButton}
            accessibilityLabel="How it works"
          >
            <CircleHelp size={16} color={colors.textMuted} />
          </Pressable>
          <Pressable
            onPress={() => router.push("/settings")}
            style={styles.settingsButton}
            accessibilityLabel="Settings"
          >
            <Settings size={16} color={colors.textMuted} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Prototype disclaimer */}
        <Text style={styles.disclaimer}>{copy.prototypeDisclaimer}</Text>

        {/* Both roles: switch between the sender view and the guardian dashboard */}
        {userRole === "both" && (
          <View style={styles.roleTabs}>
            <Pressable
              onPress={() => setHomeTab("safety")}
              style={[styles.roleTab, homeTab === "safety" && styles.roleTabActive]}
            >
              <Text style={[styles.roleTabText, homeTab === "safety" && styles.roleTabTextActive]}>
                My Safety
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setHomeTab("guardian")}
              style={[styles.roleTab, homeTab === "guardian" && styles.roleTabActive]}
            >
              <Text style={[styles.roleTabText, homeTab === "guardian" && styles.roleTabTextActive]}>
                Guardian
              </Text>
            </Pressable>
          </View>
        )}

        {showGuardianContent && <GuardianDashboard />}

        {showSenderContent && (
          <>
        {/* Module status card, or a prompt to pair one if none is added yet */}
        {moduleAdded ? (
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
        ) : (
          <Pressable
            onPress={() => router.push("/add-module")}
            style={({ pressed }) => [styles.moduleCard, styles.addModuleCard, pressed && styles.simButtonPressed]}
          >
            <Bluetooth size={15} color={colors.textMuted} />
            <View style={styles.addModuleText}>
              <Text style={styles.moduleTitle}>Add a module</Text>
              <Text style={styles.metaText}>Pair your SafeModule to enable SOS and detection.</Text>
            </View>
          </Pressable>
        )}

        {/* SOS section */}
        <Text style={styles.sectionLabel}>Emergency</Text>
        <View style={styles.sosSection}>
          <SOSButton onPress={() => triggerAlert("Manual SOS")} />
          <Text style={styles.sosHint}>{copy.sosHint}</Text>
        </View>

        {/* Sensor simulations (demo hardware events) */}
        <Text style={styles.sectionLabel}>Simulate sensor events</Text>
        <Text style={styles.sectionHint}>
          {motionState === "idle"
            ? "These stand in for what the module would detect on its own. Running and Set down toggle on — tap again to turn off."
            : `Currently simulating "${motionState === "running" ? "Running" : "Set down"}" — tap it again to stop.`}
        </Text>
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
            activeSubtitle="Active — tap to stop"
            active={motionState === "running"}
            onPress={() => setSimulatedMotion("running")}
          />
          <SimButton
            title="Set down"
            subtitle="Classified as normal"
            activeSubtitle="Active — tap to stop"
            active={motionState === "setDown"}
            onPress={() => setSimulatedMotion("setDown")}
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
          </>
        )}
      </ScrollView>

      <BottomNav
        active="home"
        showContacts={userRole !== "guardian"}
        onContacts={() => router.push("/contacts")}
        onSettings={() => router.push("/settings")}
      />
    </Screen>
  );
}

function SimButton({
  title,
  subtitle,
  activeSubtitle,
  active,
  onPress,
}: {
  title: string;
  subtitle: string;
  activeSubtitle?: string;
  active?: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.simButton,
        active && styles.simButtonActive,
        pressed && styles.simButtonPressed,
      ]}
    >
      <Text style={[styles.simTitle, active && styles.simTitleActive]}>{title}</Text>
      <Text style={styles.simSubtitle}>{active ? activeSubtitle ?? subtitle : subtitle}</Text>
    </Pressable>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
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
    headerActions: {
      flexDirection: "row",
      gap: spacing.sm,
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
    roleTabs: {
      flexDirection: "row",
      backgroundColor: colors.surfaceRaised,
      borderRadius: radius.md,
      padding: 3,
      gap: 3,
      marginBottom: spacing.lg,
    },
    roleTab: {
      flex: 1,
      paddingVertical: spacing.sm,
      borderRadius: radius.md - 3,
      alignItems: "center",
    },
    roleTabActive: {
      backgroundColor: colors.successGlow,
    },
    roleTabText: {
      fontSize: fontSize.sm,
      fontWeight: "500",
      color: colors.textDim,
    },
    roleTabTextActive: {
      color: colors.success,
    },
    moduleCard: {
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    addModuleCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    addModuleText: {
      flex: 1,
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
    sectionHint: {
      fontSize: fontSize.sm,
      color: colors.textDim,
      lineHeight: 16,
      marginTop: -spacing.xs,
      marginBottom: spacing.md,
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
    simButtonActive: {
      backgroundColor: colors.successGlow,
      borderColor: colors.success,
    },
    simButtonPressed: {
      opacity: 0.85,
    },
    simTitle: {
      fontSize: fontSize.md,
      fontWeight: "500",
      color: colors.text,
    },
    simTitleActive: {
      color: colors.success,
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
