import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Bell, Bluetooth, ShieldCheck, TriangleAlert } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { onboardingFootnote, onboardingSteps } from "@/constants/copy";
import { fontSize, radius, spacing } from "@/constants/theme";
import type { Palette } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

const STEP_ICONS = [ShieldCheck, Bluetooth, TriangleAlert, Bell];

interface OnboardingProps {
  onDone: () => void;
}

/** First-run walkthrough explaining the module and app before Home is shown. */
export function Onboarding({ onDone }: OnboardingProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [step, setStep] = useState(0);
  const isLast = step === onboardingSteps.length - 1;
  const Icon = STEP_ICONS[step];
  const { title, body } = onboardingSteps[step];

  return (
    <Screen>
      <View style={styles.container}>
        <Pressable onPress={onDone} hitSlop={8} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Icon size={30} color={colors.success} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {onboardingSteps.map((_, i) => (
              <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
            ))}
          </View>

          {isLast && <Text style={styles.footnote}>{onboardingFootnote}</Text>}

          <View style={styles.buttonRow}>
            {step > 0 ? (
              <Pressable
                onPress={() => setStep((s) => s - 1)}
                style={({ pressed }) => [styles.buttonSecondary, pressed && styles.pressed]}
              >
                <Text style={styles.buttonSecondaryText}>Back</Text>
              </Pressable>
            ) : (
              <View style={styles.buttonSpacer} />
            )}
            <Pressable
              onPress={() => (isLast ? onDone() : setStep((s) => s + 1))}
              style={({ pressed }) => [styles.buttonPrimary, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={isLast ? "Get started" : "Next"}
            >
              <Text style={styles.buttonPrimaryText}>{isLast ? "Get started" : "Next"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
  },
  skip: {
    alignSelf: "flex-end",
    paddingTop: spacing.lg,
    paddingVertical: spacing.sm,
  },
  skipText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
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
  footer: {
    paddingBottom: spacing.xl,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.success,
    width: 18,
  },
  footnote: {
    fontSize: fontSize.sm,
    color: colors.textDim,
    textAlign: "center",
    lineHeight: 16,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  buttonSpacer: {
    flex: 1,
  },
  buttonSecondary: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: colors.text,
    fontSize: fontSize.base,
    fontWeight: "500",
  },
  buttonPrimary: {
    flex: 2,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.successDark,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.85,
  },
  });
