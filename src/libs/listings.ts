// React
import AsyncStorage from '@react-native-async-storage/async-storage';

// Libs
import { createId } from '@/libs/utils';

// Types
import type { Listing, NewListing } from '@/types/listing';

export async function getListings(): Promise<Listing[]> {
  const listings = await loadListings();
  return listings.sort((a, b) => b.createdAt - a.createdAt);
}

export async function addListing(input: NewListing): Promise<Listing> {
  const listing: Listing = {
    id: createId(),
    name: input.name.trim(),
    category: input.category,
    description: input.description.trim(),
    createdAt: Date.now(),
  };

  const existing = await loadListings();
  await persistListings([listing, ...existing]);
  return listing;
}

const STORAGE_KEY = 'listings:v1';

async function loadListings(): Promise<Listing[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Listing[]) : [];
  } catch {
    return [];
  }
}

async function persistListings(listings: Listing[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}
