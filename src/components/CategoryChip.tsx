// React
import { Text, View } from 'react-native';

interface CategoryChipProps {
  category: string;
}

export const CategoryChip = ({ category }: CategoryChipProps) => {
  return (
    <View
      className={`shrink-0 self-start rounded-full px-2.5 py-1 bg-gray-100`}
    >
      <Text className={`text-xs font-semibold text-gray-600`}>{category}</Text>
    </View>
  );
};
