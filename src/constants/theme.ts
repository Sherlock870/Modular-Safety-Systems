/**
 * Design tokens matching the web mockup.
 * All screens should read colors via useTheme() — never hard-code hex values or
 * import a static palette, since colors change with light/dark mode.
 */
export interface Palette {
  background: string;
  text: string;
  textMuted: string;
  textDim: string;
  success: string;
  successDark: string;
  successGlow: string;
  warning: string;
  warningLight: string;
  sos: string;
  sosGlow: string;
  border: string;
  borderLight: string;
  surface: string;
  surfaceRaised: string;
  white: string;
  bluetoothOff: string;
}

export const darkPalette: Palette = {
  background: "#0B1220",
  text: "#E8ECF2",
  textMuted: "#9AA5B4",
  textDim: "#6B7280",
  success: "#3FCFA0",
  successDark: "#1D9E75",
  successGlow: "rgba(63, 207, 160, 0.12)",
  warning: "#E27D4A",
  warningLight: "#F0997B",
  sos: "#D85A30",
  sosGlow: "rgba(216, 90, 48, 0.12)",
  border: "rgba(255, 255, 255, 0.1)",
  borderLight: "rgba(255, 255, 255, 0.05)",
  surface: "rgba(255, 255, 255, 0.04)",
  surfaceRaised: "rgba(255, 255, 255, 0.06)",
  white: "#FFFFFF",
  bluetoothOff: "#6B7280",
};

export const lightPalette: Palette = {
  background: "#F4F6F9",
  text: "#10151F",
  textMuted: "#5B6472",
  textDim: "#8A93A2",
  success: "#1E9E76",
  successDark: "#167A5C",
  successGlow: "rgba(30, 158, 118, 0.10)",
  warning: "#C15A2C",
  warningLight: "#D97A4C",
  sos: "#C1472A",
  sosGlow: "rgba(193, 71, 42, 0.10)",
  border: "rgba(15, 23, 42, 0.09)",
  borderLight: "rgba(15, 23, 42, 0.05)",
  surface: "rgba(15, 23, 42, 0.035)",
  surfaceRaised: "rgba(15, 23, 42, 0.05)",
  white: "#FFFFFF",
  bluetoothOff: "#9AA5B4",
};

/**
 * The SOS/alert screen intentionally keeps one fixed, high-urgency look in both
 * themes — like a car's hazard lights, it shouldn't change with light/dark mode.
 */
export const alertColors = {
  pendingBg: "#241708",
  activeBg: "#3A1410",
  iconBg: "rgba(255, 255, 255, 0.1)",
  buttonSecondaryBg: "rgba(255, 255, 255, 0.1)",
  text: "#D9CFC9",
  textMuted: "#B8ACA4",
  textOnSurface: "#E8ECF2",
  white: "#FFFFFF",
  warning: "#E27D4A",
  warningLight: "#F0997B",
  sos: "#D85A30",
  success: "#3FCFA0",
  surface: "rgba(255, 255, 255, 0.04)",
  surfaceRaised: "rgba(255, 255, 255, 0.06)",
  border: "rgba(255, 255, 255, 0.1)",
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
