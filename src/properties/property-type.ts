const propertyTypes = {
  House: 'House',
  Apartment: 'Apartment',
  Mobile: 'Mobile',
} as const;

export type PropertyType = keyof typeof propertyTypes;

export const propertyTypesArray: PropertyType[] = Object.values(propertyTypes);
