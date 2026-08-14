/** Possible states for the SOS / alert flow */
export type AlertState = "idle" | "pending" | "active";

/** Where an alert was triggered from — kept open for voice/gesture/device later */
export type ActivationSource = "manual" | "sensor" | "device" | "voice" | "gesture";

export interface LogEntry {
  id: string;
  text: string;
  time: string;
}

export interface TrustedContact {
  id: number;
  name: string;
  relation: string;
  phone: string;
}
