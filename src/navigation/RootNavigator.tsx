// React
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import { CreateListingScreen } from '@/screens/CreateListingScreen';
import { ListingsScreen } from '@/screens/ListingsScreen';

// Types
import type { RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerShadowVisible: false,
          headerTintColor: '#111827',
          headerTitleStyle: { fontWeight: '700', color: '#111827' },
          contentStyle: { backgroundColor: '#ffffff' },
        }}
      >
        <Stack.Screen
          name="Listings"
          component={ListingsScreen}
          options={{ title: 'Local Businesses' }}
        />
        <Stack.Screen
          name="CreateListing"
          component={CreateListingScreen}
          options={({ navigation }) => ({
            title: 'Add New Business',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                hitSlop={12}
                className="h-9 w-9 items-center justify-center"
              >
                <Ionicons name="chevron-back" size={24} color="#111827" />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
