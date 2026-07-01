// React
import { Text, View } from 'react-native';

// Components
import { CategoryChip } from '@/components/CategoryChip';

// Libs
import { getListingInitial } from '@/libs/utils';

// Types
import type { Listing } from '@/types/listing';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <View
      className="flex-row gap-3 rounded-2xl border border-gray-200 bg-white p-4"
      style={{
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
        <Text className="text-lg font-bold text-brand-dark">
          {getListingInitial(listing.name)}
        </Text>
      </View>

      <View className="flex-1 gap-1.5">
        <View className="flex-row items-center gap-2">
          <Text
            className="flex-1 text-base font-semibold text-gray-900"
            numberOfLines={1}
          >
            {listing.name}
          </Text>
          <CategoryChip category={listing.category} />
        </View>
        {listing.description ? (
          <Text className="text-sm leading-5 text-gray-600" numberOfLines={3}>
            {listing.description}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
