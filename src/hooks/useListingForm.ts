// React
import { useCallback, useState } from 'react';

// Types
import type { BusinessCategory, NewListing } from '@/types/listing';

export interface ListingFormValues {
  name: string;
  category: BusinessCategory | null;
  description: string;
}

export interface ListingFormErrors {
  name?: string;
  category?: string;
}

const EMPTY_VALUES: ListingFormValues = {
  name: '',
  category: null,
  description: '',
};

export function useListingForm() {
  const [values, setValues] = useState<ListingFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ListingFormErrors>({});

  const setName = useCallback((name: string) => {
    setValues((prev) => ({ ...prev, name }));
    setErrors((prev) => ({ ...prev, name: undefined }));
  }, []);

  const setCategory = useCallback((category: BusinessCategory) => {
    setValues((prev) => ({ ...prev, category }));
    setErrors((prev) => ({ ...prev, category: undefined }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setValues((prev) => ({ ...prev, description }));
  }, []);

  const reset = useCallback(() => {
    setValues(EMPTY_VALUES);
    setErrors({});
  }, []);

  const getSubmitPayload = useCallback((): NewListing | null => {
    const nextErrors: ListingFormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = 'Business name is required.';
    }
    if (!values.category) {
      nextErrors.category = 'Please pick a category.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !values.category) {
      return null;
    }

    return {
      name: values.name,
      category: values.category,
      description: values.description,
    };
  }, [values]);

  return {
    values,
    errors,
    setName,
    setCategory,
    setDescription,
    reset,
    getSubmitPayload,
  };
}
