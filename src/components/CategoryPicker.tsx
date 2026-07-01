// React
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Libs
import { BUSINESS_CATEGORIES } from '@/constants/businessCategories';
import type { BusinessCategory } from '@/types/listing';

interface CategoryPickerProps {
  label: string;
  value: BusinessCategory | null;
  onSelect: (category: BusinessCategory) => void;
  error?: string;
}

export const CategoryPicker = ({
  label,
  value,
  onSelect,
  error,
}: CategoryPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category: BusinessCategory) => {
    onSelect(category);
    setIsOpen(false);
  };

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-gray-700">{label}</Text>

      <Pressable
        onPress={() => setIsOpen(true)}
        className={`flex-row items-center justify-between rounded-2xl border bg-gray-100 px-4 py-3 ${
          error ? 'border-red-400' : 'border-gray-200'
        }`}
      >
        <Text
          className={`text-[16px] ${value ? 'text-gray-900' : 'text-gray-400'}`}
        >
          {value ?? 'Select a category'}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#6B7280" />
      </Pressable>

      {error ? <Text className="text-xs text-red-500">{error}</Text> : null}

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        {/* Tapping the dimmed backdrop closes the sheet. */}
        <Pressable
          className="flex-1 justify-end bg-black/40"
          onPress={() => setIsOpen(false)}
        >
          {/* Stop propagation so taps inside the sheet don't close it. */}
          <Pressable
            className="rounded-t-3xl bg-white pb-8 pt-3"
            onPress={(event) => event.stopPropagation()}
          >
            <View className="mb-2 h-1.5 w-12 self-center rounded-full bg-gray-300" />
            <Text className="px-5 py-2 text-base font-semibold text-gray-900">
              Choose a category
            </Text>

            {BUSINESS_CATEGORIES.map((category) => {
              const isSelected = category === value;
              return (
                <Pressable
                  key={category}
                  onPress={() => handleSelect(category)}
                  className="flex-row items-center justify-between px-5 py-3.5 active:bg-gray-50"
                >
                  <Text
                    className={`text-base ${
                      isSelected ? 'font-semibold text-brand' : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </Text>
                  {isSelected ? (
                    <Ionicons name="checkmark" size={20} color="#4F46E5" />
                  ) : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
