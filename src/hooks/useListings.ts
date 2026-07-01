// Libs
import { useQuery } from '@tanstack/react-query';
import { getListings } from '@/libs/listings';
import { queryKeys } from '@/constants/queryKeys';

export function useListings() {
  return useQuery({
    queryKey: queryKeys.listings,
    queryFn: getListings,
  });
}
