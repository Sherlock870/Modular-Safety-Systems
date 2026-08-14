/**
 * Safety-conscious copy for the research prototype.
 * Avoid language that implies confirmed danger or real emergency dispatch.
 */
export const copy = {
  prototypeDisclaimer:
    "Research prototype — does not contact emergency services.",
  sosHint:
    "Activates a simulated alert flow. Location sharing is demo-only.",
  alertPendingTitle: "Confirm this is a false alarm",
  alertActiveTitle: "SOS activated — simulated notifications sent",
  alertPendingPrefix: "No manual SOS was pressed. Simulated location sharing in ",
  alertPendingSuffix: " unless you cancel.",
  sharedLocationLabel: "Shared location (demo)",
  sharedLocationPlaceholder: "GPS coordinates will appear here when enabled",
  wouldNotify: "Would notify (demo)",
  cancelAlert: "I'm okay, cancel this",
  sendNow: "Send now",
  markResolved: "Mark as resolved",
} as const;
