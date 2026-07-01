// Types
import type { Listing } from '@/types/listing';

export function getListingInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed.charAt(0).toUpperCase() : '?';
}

export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function filterListingsByName(
  listings: Listing[],
  query: string,
): Listing[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return listings;
  return listings.filter((listing) =>
    listing.name.toLowerCase().includes(normalized),
  );
}
