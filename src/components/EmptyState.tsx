// React
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
}

export const EmptyState = ({
  icon = 'storefront-outline',
  title,
  message,
}: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center px-10 py-16">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-brand-light">
        <Ionicons name={icon} size={30} color="#4F46E5" />
      </View>
      <Text className="mb-1 text-center text-lg font-semibold text-gray-800">
        {title}
      </Text>
      <Text className="text-center text-sm leading-5 text-gray-500">
        {message}
      </Text>
    </View>
  );
};
