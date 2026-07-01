// Libs
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addListing } from '@/libs/listings';
import { queryKeys } from '@/constants/queryKeys';

// Types
import type { NewListing } from '@/types/listing';

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewListing) => addListing(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.listings });
    },
  });
}
