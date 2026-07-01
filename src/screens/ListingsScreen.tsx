// React
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Components
import { EmptyState } from '@/components/EmptyState';
import { ListingCard } from '@/components/ListingCard';
import { SearchBar } from '@/components/SearchBar';

// Hooks
import { useListingSearch } from '@/hooks/useListingSearch';
import { useListings } from '@/hooks/useListings';

// Types
import type { RootStackParamList } from '@/navigation/types';

type ListingsNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Listings'
>;

export function ListingsScreen() {
  const navigation = useNavigation<ListingsNavigation>();
  const insets = useSafeAreaInsets();

  const { data: listings = [], isLoading } = useListings();
  const { query, setQuery, results } = useListingSearch(listings);

  const hasListings = listings.length > 0;

  return (
    <View className="flex-1 bg-white">
      {hasListings ? (
        <View className="px-4 pb-1 pt-3">
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
      ) : null}

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#4F46E5" />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListingCard listing={item} />}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 96,
            gap: 12,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            hasListings ? (
              <EmptyState
                icon="search-outline"
                title="No matches"
                message={`No businesses match “${query.trim()}”.`}
              />
            ) : (
              <EmptyState
                icon="storefront-outline"
                title="No businesses yet"
                message="Add your first business to get the directory started."
              />
            )
          }
        />
      )}

      <Pressable
        onPress={() => navigation.navigate('CreateListing')}
        style={{
          bottom: insets.bottom + 16,
          shadowColor: '#4F46E5',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 6,
        }}
        className="absolute right-5 h-14 flex-row items-center gap-1.5 rounded-full bg-brand px-5 active:bg-brand-dark"
      >
        <Ionicons name="add" size={22} color="#ffffff" />
        <Text className="text-base font-semibold text-white">Add business</Text>
      </Pressable>
    </View>
  );
}
