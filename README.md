# Modular Safety Systems

A modular, accessible personal-safety wearable — hardware sensor module, companion app, and future ML-based anomaly detection, built to provide reliable emergency communication while minimizing false alarms.

## The idea

Most safety wearables assume a single form factor (a ring, a necklace). This project instead uses a small, removable safety module that can attach to clothing, a necklace, a backpack, or another wearable — so it adapts to different users and how they choose to wear it.

## System

- **Hardware module** — accelerometer/gyroscope, SOS button, Bluetooth, vibration feedback
- **Companion app (SafeModule)** — GPS location, trusted contacts, alert flow
- **Intelligent detection (future work)** — ML-based pattern recognition for unusual movement or tampering, with manual SOS always as the primary trigger

## Research question

How can a modular wearable safety system provide reliable emergency communication for different users and wearing configurations while minimizing false alarms?

---

## SafeModule mobile app

React Native + Expo (TypeScript) companion app for the safety module.

**Research prototype only** — does not contact emergency services or send real alerts.

### What's implemented (increment 1)

- Expo scaffold with Expo Router
- **Home screen** — module status (demo), SOS button, sensor simulations, activity log
- **Alert screen** — 8-second cancel window, active state with mock contact notifications
- Shared theme (`src/constants/theme.ts`) matching the UI mockup
- App-wide state via `AppContext` (services layer comes in later increments)

### Project structure

```
app/
  _layout.tsx       Root layout + providers
  index.tsx         Home screen
  alert.tsx         SOS / alert flow
src/
  components/       Reusable UI
  constants/        theme.ts, copy.ts
  context/          AppContext (temporary — will move to services)
  types/            Shared TypeScript types
assets/             App icons and splash
```

### Run locally

```bash
git clone https://github.com/Sherlock870/Modular-Safety-Systems.git
cd Modular-Safety-Systems
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone, or press `i` / `a` for iOS Simulator / Android emulator.

### Next increments

1. Contacts + Settings screens
2. Persist contacts and event log (AsyncStorage / SQLite)
3. Location service (one-shot GPS on SOS active)
4. Mock notification service
5. Demo hardware module (`IHardwareModule` interface + BLE stub)
