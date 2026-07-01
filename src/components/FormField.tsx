// React
import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FormField = ({
  label,
  error,
  multiline,
  ...inputProps
}: FormFieldProps) => {
  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-gray-700">{label}</Text>
      <TextInput
        className={`rounded-2xl border bg-gray-100 px-4 py-3 text-[16px] text-gray-900 ${
          error ? 'border-red-400' : 'border-gray-200'
        } ${multiline ? 'h-28' : ''}`}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...inputProps}
      />
      {error ? <Text className="text-xs text-red-500">{error}</Text> : null}
    </View>
  );
};
