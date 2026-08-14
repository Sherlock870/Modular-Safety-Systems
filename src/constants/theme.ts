/**
 * Design tokens matching the web mockup.
 * All screens should import from here — never hard-code hex values in components.
 */
export const colors = {
  background: "#0B1220",
  text: "#E8ECF2",
  textMuted: "#9AA5B4",
  textDim: "#6B7280",
  success: "#3FCFA0",
  successDark: "#1D9E75",
  warning: "#E27D4A",
  warningLight: "#F0997B",
  sos: "#D85A30",
  sosGlow: "rgba(216, 90, 48, 0.12)",
  border: "rgba(255, 255, 255, 0.1)",
  borderLight: "rgba(255, 255, 255, 0.05)",
  surface: "rgba(255, 255, 255, 0.04)",
  surfaceRaised: "rgba(255, 255, 255, 0.06)",
  alertPendingBg: "#241708",
  alertActiveBg: "#3A1410",
  alertText: "#D9CFC9",
  alertTextMuted: "#B8ACA4",
  white: "#FFFFFF",
  bluetoothOff: "#6B7280",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const fontSize = {
  xs: 10.5,
  sm: 11,
  md: 12,
  base: 13,
  lg: 15,
  xl: 18,
  xxl: 20,
} as const;
