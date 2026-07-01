// React
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3">
      <Ionicons name="search" size={18} color="#9CA3AF" />
      <TextInput
        className="flex-1 text-[16px] text-gray-900"
        placeholder="Search by business name"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
    </View>
  );
};
