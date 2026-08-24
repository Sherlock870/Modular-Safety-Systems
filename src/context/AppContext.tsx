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
import type { AlertState, LogEntry, MotionState, TrustedContact, UserRole } from "@/types";

const CONTACTS_SEED: TrustedContact[] = [
  { id: 1, name: "Meera Sharma", relation: "Mother", phone: "+91 98230 11xxx", guardianAccess: true },
  { id: 2, name: "Arjun Rao", relation: "Roommate", phone: "+91 90040 22xxx", guardianAccess: false },
];

const CANCEL_WINDOW_SECONDS = 8;
const MAX_LOG_ENTRIES = 12;

interface AppContextValue {
  connected: boolean;
  toggleConnection: () => void;
  battery: number;
  contacts: TrustedContact[];
  toggleGuardianAccess: (id: number) => void;
  log: LogEntry[];
  addLog: (text: string) => void;
  alertState: AlertState;
  alertReason: string;
  countdown: number;
  triggerAlert: (reason: string) => void;
  cancelAlert: () => void;
  confirmAlertNow: () => void;
  resolveAlert: () => void;
  showOnboarding: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  motionState: MotionState;
  setSimulatedMotion: (state: "running" | "setDown") => void;
  userRole: UserRole | null;
  setUserRole: (role: UserRole) => void;
  moduleAdded: boolean;
  pairModule: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(true);
  const [battery] = useState(82);
  const [contacts, setContacts] = useState(CONTACTS_SEED);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [alertState, setAlertState] = useState<AlertState>("idle");
  const [alertReason, setAlertReason] = useState("");
  const [countdown, setCountdown] = useState(CANCEL_WINDOW_SECONDS);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [motionState, setMotionState] = useState<MotionState>("idle");
  const [userRole, setUserRoleState] = useState<UserRole | null>(null);
  const [moduleAdded, setModuleAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // First-ever role choice (from onboarding's RoleSelect, when userRole is still null) auto-pairs
  // a demo module for sender/both, matching this app's existing "already connected" default. Any
  // later change (e.g. from Settings) does NOT auto-pair — that's what surfaces the "Add a module"
  // prompt when a former guardian switches to Sender/Both.
  const setUserRole = useCallback(
    (role: UserRole) => {
      if (userRole === null && (role === "sender" || role === "both")) {
        setModuleAdded(true);
      }
      setUserRoleState(role);
    },
    [userRole]
  );

  const openOnboarding = useCallback(() => setShowOnboarding(true), []);
  const closeOnboarding = useCallback(() => setShowOnboarding(false), []);

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

  const toggleGuardianAccess = useCallback((id: number) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, guardianAccess: !contact.guardianAccess } : contact
      )
    );
  }, []);

  const pairModule = useCallback(() => {
    setModuleAdded(true);
    setConnected(true);
    addLog("Module paired");
  }, [addLog]);

  const toggleConnection = useCallback(() => {
    setConnected((prev) => {
      const next = !prev;
      addLog(next ? "Device connected" : "Device disconnected");
      return next;
    });
  }, [addLog]);

  const setSimulatedMotion = useCallback(
    (state: "running" | "setDown") => {
      setMotionState((prev) => {
        if (prev === state) {
          addLog(
            state === "running"
              ? "Running motion stopped"
              : "Module picked back up"
          );
          return "idle";
        }
        addLog(
          state === "running"
            ? "Running motion, no alert"
            : "Backpack set down, no alert"
        );
        return state;
      });
    },
    [addLog]
  );

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
    toggleGuardianAccess,
    log,
    addLog,
    alertState,
    alertReason,
    countdown,
    triggerAlert,
    cancelAlert,
    confirmAlertNow,
    resolveAlert,
    showOnboarding,
    openOnboarding,
    closeOnboarding,
    motionState,
    setSimulatedMotion,
    userRole,
    setUserRole,
    moduleAdded,
    pairModule,
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
