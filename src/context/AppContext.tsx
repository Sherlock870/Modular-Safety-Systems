import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { router } from "expo-router";
import type { AlertState, LogEntry, TrustedContact } from "@/types";

const CONTACTS_SEED: TrustedContact[] = [
  { id: 1, name: "Meera Sharma", relation: "Mother", phone: "+91 98230 11xxx" },
  { id: 2, name: "Arjun Rao", relation: "Roommate", phone: "+91 90040 22xxx" },
];

const CANCEL_WINDOW_SECONDS = 8;
const MAX_LOG_ENTRIES = 12;

interface AppContextValue {
  connected: boolean;
  toggleConnection: () => void;
  battery: number;
  contacts: TrustedContact[];
  log: LogEntry[];
  addLog: (text: string) => void;
  alertState: AlertState;
  alertReason: string;
  countdown: number;
  triggerAlert: (reason: string) => void;
  cancelAlert: () => void;
  confirmAlertNow: () => void;
  resolveAlert: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(true);
  const [battery] = useState(82);
  const [contacts] = useState(CONTACTS_SEED);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [alertState, setAlertState] = useState<AlertState>("idle");
  const [alertReason, setAlertReason] = useState("");
  const [countdown, setCountdown] = useState(CANCEL_WINDOW_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const addLog = useCallback((text: string) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setLog((prev) =>
      [{ id: `${Date.now()}-${Math.random()}`, text, time }, ...prev].slice(
        0,
        MAX_LOG_ENTRIES
      )
    );
  }, []);

  const triggerAlert = useCallback(
    (reason: string) => {
      setAlertReason(reason);
      addLog(`${reason} detected`);
      setAlertState("pending");
      setCountdown(CANCEL_WINDOW_SECONDS);
      router.push("/alert");
    },
    [addLog]
  );

  const cancelAlert = useCallback(() => {
    clearTimer();
    addLog("Alert cancelled by user");
    setAlertState("idle");
    router.replace("/");
  }, [addLog, clearTimer]);

  const confirmAlertNow = useCallback(() => {
    clearTimer();
    setAlertState("active");
    addLog("SOS activated");
  }, [addLog, clearTimer]);

  const resolveAlert = useCallback(() => {
    clearTimer();
    addLog("Alert resolved");
    setAlertState("idle");
    router.replace("/");
  }, [addLog, clearTimer]);

  const toggleConnection = useCallback(() => {
    setConnected((prev) => {
      const next = !prev;
      addLog(next ? "Device connected" : "Device disconnected");
      return next;
    });
  }, [addLog]);

  // Countdown timer while alert is pending
  useEffect(() => {
    if (alertState !== "pending") {
      clearTimer();
      return;
    }

    setCountdown(CANCEL_WINDOW_SECONDS);
    timerRef.current = setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          clearTimer();
          setAlertState("active");
          addLog("SOS activated");
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return clearTimer;
  }, [alertState, addLog, clearTimer]);

  const value: AppContextValue = {
    connected,
    toggleConnection,
    battery,
    contacts,
    log,
    addLog,
    alertState,
    alertReason,
    countdown,
    triggerAlert,
    cancelAlert,
    confirmAlertNow,
    resolveAlert,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}
