// React
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import { CategoryPicker } from '@/components/CategoryPicker';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';

// Hooks
import { useCreateListing } from '@/hooks/useCreateListing';
import { useListingForm } from '@/hooks/useListingForm';

// Types
import type { RootStackParamList } from '@/navigation/types';

type CreateListingNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'CreateListing'
>;

export function CreateListingScreen() {
  const navigation = useNavigation<CreateListingNavigation>();
  const insets = useSafeAreaInsets();

  const {
    values,
    errors,
    setName,
    setCategory,
    setDescription,
    getSubmitPayload,
  } = useListingForm();
  const { mutate: createListing, isPending } = useCreateListing();

  const handleSubmit = () => {
    const payload = getSubmitPayload();
    if (!payload) return;

    createListing(payload, {
      onSuccess: () => navigation.goBack(),
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, gap: 18 }}
        keyboardShouldPersistTaps="handled"
      >
        <FormField
          label="Business name"
          placeholder="e.g. Maple Leaf Bakery"
          value={values.name}
          onChangeText={setName}
          error={errors.name}
          autoFocus
          returnKeyType="next"
        />

        <CategoryPicker
          label="Category"
          value={values.category}
          onSelect={setCategory}
          error={errors.category}
        />

        <FormField
          label="Short description"
          placeholder="What does this business offer?"
          value={values.description}
          onChangeText={setDescription}
          multiline
        />
      </ScrollView>

      <View
        style={{ paddingBottom: insets.bottom + 16 }}
        className="border-t border-gray-100 bg-white px-4 pt-4"
      >
        <PrimaryButton
          label="Save business"
          onPress={handleSubmit}
          loading={isPending}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
