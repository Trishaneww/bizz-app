# Mini Business Listing & Discovery

A small slice of a "Business Listing & Discovery" feature for Canadian small
business owners. You can **create a business listing**, **browse all listings**,
and **search them by name**.

Built with **React Native (Expo)** + **TypeScript**, styled with **NativeWind**
(Tailwind for RN), with listings persisted locally via **AsyncStorage** and
state managed with **TanStack Query**.

---

## How to run the app

> Requires Node 18+ and the **Expo Go** app on your phone (App Store / Play Store).

```bash
npm install     
npm start        
```

Then **scan the QR code** with Expo Go (Android) or the Camera app (iOS). The app
opens on your device.

Prefer a simulator? Press `i` (iOS Simulator) or `a` (Android Emulator) in the
terminal after `npm start`.

Type safety can be checked with `npm run typecheck`.

---

## Decisions I made

- **Expo + TypeScript** was the quickest way to get something running on a real
  phone via Expo Go, while still having proper type safety.
- **AsyncStorage over in-memory** because persistence across app restarts is a
  noticeably better experience and only took about 20 extra minutes. All the
  storage logic lives in `src/libs/listings.ts`, so swapping in a real API later
  is a one-file change.
- **TanStack Query even without a real backend** because AsyncStorage is async
  and it felt natural to treat it like a data source. The main win is cache
  invalidation: after you create a listing, it shows up on the list screen
  immediately without any manual state wrangling between screens.
- **Preset categories instead of free text** to keep the data clean and make
  each listing easier to scan at a glance.
- **Logic out of the screens** so the screens just describe the UI. Form state
  lives in `useListingForm`, search in `useListingSearch`, and pure helpers like
  filtering and formatting are in `libs/`.
- **Minimal validation** as per the spec, just name and category are required,
  description is optional.

## Trade-offs I made due to time

- No edit or delete, just create, browse and search to keep it within MVP scope.
- No automated tests. The pure helpers were written to be easy to test, but I
  prioritised getting a working, polished feature over writing the tests.
- Search is name-only and client-side, which matches the spec and is fine at
  this scale.

## What I'd do next

- Move storage to a proper database like Postgres. Right now everything lives in
  AsyncStorage on the device, which works for a demo but wouldn't scale or allow
  data to be shared across users.
- Add edit and delete with optimistic updates via TanStack Query.
- Richer search and filtering, searching across description and category, not
  just name, plus filtering by category chip.
- Images and location data would make a lot of sense for a Canadian local
  business directory.
