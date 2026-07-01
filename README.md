# Local Businesses — Mini Business Listing & Discovery

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
npm install      # if dependencies aren't installed yet
npm start        # starts the Metro dev server and prints a QR code
```

Then **scan the QR code** with Expo Go (Android) or the Camera app (iOS). The app
opens on your device.

Prefer a simulator? Press `i` (iOS Simulator) or `a` (Android Emulator) in the
terminal after `npm start`.

Type safety can be checked with `npm run typecheck`.

---

## What the app does

| Screen | What it does |
| --- | --- |
| **Local Businesses** (list) | Scrollable list of all listings (name, category, description), a search bar that filters by business name, and a friendly empty state. A floating **Add business** button opens the create screen. |
| **Add Business** (form) | Inputs for business name, category (preset dropdown), and a multi-line description. Saving persists the listing and returns to the list, where it appears immediately. |

---

## Project structure

The guiding rule: **components stay declarative** — all logic lives in `hooks/`
(state) or `libs/` (pure helpers + persistence).

```
App.tsx                 # Providers: QueryClient + SafeArea, mounts the navigator
src/
  navigation/           # Two-screen native-stack + typed route params
  screens/              # ListingsScreen, CreateListingScreen (composition only)
  components/            # ListingCard, SearchBar, CategoryPicker, FormField, …
  hooks/                # useListings, useCreateListing, useListingForm, useListingSearch
  libs/                 # listings (AsyncStorage data layer), filter, format, categories, id
  types/                # Listing domain model
```

---

## Decisions I made

- **Expo + TypeScript.** Fastest path to a real iOS/Android app that runs on a
  physical phone via Expo Go, with type safety throughout.
- **AsyncStorage over in-memory.** The spec allowed either; persistence across
  app restarts is a meaningfully better experience for ~20 minutes of extra
  work. All storage access is isolated in `src/libs/listings.ts`, so swapping in
  a real API later would touch only that one file.
- **TanStack Query, even without a backend.** AsyncStorage access is async, so
  treating it as a data source gives loading/error states and — most usefully —
  automatic cache invalidation: after a listing is created, the mutation
  invalidates the list query so the new business shows up immediately, with no
  manual cross-screen state passing.
- **Preset category dropdown.** Keeps the data clean and lets each listing show a
  consistent, colour-coded category chip — a small touch that makes the list
  easier to scan.
- **Logic out of components.** Form state lives in `useListingForm`, search in
  `useListingSearch`, and pure helpers (filtering, formatting) in `libs/`, so
  the screens read as a description of the UI.
- **Light validation only.** Per the spec, just the essentials: name and
  category are required; description is optional.

## Trade-offs I accepted due to time

- **No edit/delete.** Create + read + search only, to stay within the MVP scope.
- **No automated tests.** The pure helpers (`filterListingsByName`,
  `useListingForm` validation) were written to be easily testable, but I
  prioritised a working, polished feature over writing the tests.
- **Search is name-only and client-side.** Matches the spec; fine at this scale.
- **No accessibility/i18n pass** beyond sensible defaults.

## What I'd do in v2

- **Edit & delete listings**, with optimistic updates via TanStack Query.
- **Richer discovery**: filter by category chip and search across
  description/category, not just name (plus images and location for a Canadian
  local-business directory).
