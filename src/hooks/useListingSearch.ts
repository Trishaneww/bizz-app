// React
import { useMemo, useState } from 'react';

// Libs
import { filterListingsByName } from '@/libs/utils';

// Types
import type { Listing } from '@/types/listing';

export function useListingSearch(listings: Listing[]) {
  const [query, setQuery] = useState('');

  const results = useMemo(
    () => filterListingsByName(listings, query),
    [listings, query],
  );

  return { query, setQuery, results };
}
