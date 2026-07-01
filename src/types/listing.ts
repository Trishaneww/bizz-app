// Libs
import { BUSINESS_CATEGORIES } from '@/constants/businessCategories';

export interface Listing {
  id: string;
  name: string;
  category: string;
  description: string;
  createdAt: number;
}

export type NewListing = Pick<Listing, 'name' | 'category' | 'description'>;
export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];
