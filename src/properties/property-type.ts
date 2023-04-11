const PropertyTypes = {
  House: 'House',
  Apartment: 'Apartment',
  Mobile: 'Mobile',
} as const;

export type PropertyType = keyof typeof PropertyTypes;

export const PropertyTypesArray: PropertyType[] = [
  'House',
  'Apartment',
  'Mobile',
];
