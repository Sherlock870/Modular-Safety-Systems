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
  wouldNotify: "Texted live location (demo)",
  wouldNotifyGuardian: "Notified in-app + location (demo)",
  cancelAlert: "I'm okay, cancel this",
  sendNow: "Send now",
  markResolved: "Mark as resolved",
} as const;

/** First-run walkthrough, replayable from the Home header. */
export const onboardingSteps = [
  {
    title: "Someone's got your back",
    body: "SafeModule is a personal safety wearable for women walking alone and kids getting to school or practice on their own. A small clip-on module pairs with this app, so you're never truly by yourself.",
  },
  {
    title: "Clip it on, stay connected",
    body: "Clip or wear it on a bag, belt, ring, or necklace — wherever works best for you. It pairs with this app over Bluetooth, and the card on Home shows it's live at a glance.",
  },
  {
    title: "It's watching, so you can relax",
    body: "A hard fall, sudden stillness, or the module being pulled off starts an alert automatically — no need to reach for your phone. Everyday movement like walking or running stays quiet.",
  },
  {
    title: "Your circle, notified instantly",
    body: "One press sends trusted contacts your live location by text — no app required on their end. Add someone as a parent or guardian and they can install the app for full-time visibility.",
  },
] as const;

export const onboardingFootnote =
  "This build is a research prototype — no real alerts or emergency calls are sent.";

/** Shown once, before onboarding, so each person picks their own role on their own account. */
export const roleSelectCopy = {
  title: "Who's this for?",
  body: "This decides what you see first — the SOS flow for someone wearing a module, an alerts inbox for someone watching over them, or both.",
  options: [
    {
      role: "sender",
      label: "I want to send alerts",
      description: "You wear the module yourself. This is the Protected role.",
    },
    {
      role: "guardian",
      label: "I want to receive alerts",
      description: "You watch over someone else. This is the Guardian role.",
    },
    {
      role: "both",
      label: "Both",
      description: "You wear a module yourself and watch over someone else too.",
    },
  ],
} as const;

/** Copy for the trusted-contacts screen, introducing the alert-only / guardian split. */
export const contactsCopy = {
  intro:
    "Everyone on this list gets an instant text with your live location the moment SOS fires — no app needed on their end. Mark someone as a parent or guardian to give them more.",
  alertOnlyLabel: "Alert-only",
  guardianLabel: "Guardian view",
  guardianNote:
    "Guardian view adds ongoing location, alert history, and geofencing once they install the app — coming in a later build.",
  guardianRoleNote:
    "Guardian view only takes effect once they've installed the app and chosen Guardian or Both for their own account — until then, they'll get the same text alert as anyone else.",
  addContact: "Add trusted contact",
} as const;

/** Confirmation copy shown when changing userRole from Settings. */
export const roleChangeCopy = {
  awayFromSenderTitle: "Switch away from Sender?",
  awayFromSenderBody:
    "You'll lose the SOS button and module screen. If you have a module paired, it will stop sending alerts through this account.",
  awayFromGuardianTitle: "Switch away from Guardian?",
  awayFromGuardianBody:
    "You'll stop seeing the incoming-alerts dashboard, including alerts from anyone who has marked you as their guardian.",
  confirmOnlyTitle: "Add the other role?",
  confirmOnlyBody: "You'll keep everything you have now, plus the new role's screens.",
  confirmButton: "Switch role",
  cancelButton: "Cancel",
} as const;

/** Copy for the standalone module-pairing screen, reachable from Settings or Home. */
export const addModuleCopy = {
  title: "Add a module",
  body: "Turn on your SafeModule and hold it near your phone. This demo pairs it instantly — there's no real Bluetooth handshake in this build.",
  pairButton: "Pair module (demo)",
} as const;
