import { TripDetails, PackingItem } from '../types';

const essentials: PackingItem[] = [
  { name: 'Passport', category: 'Documents', essential: true },
  { name: 'Travel Insurance', category: 'Documents', essential: true },
  { name: 'Credit Cards', category: 'Documents', essential: true },
  { name: 'Phone & Charger', category: 'Electronics', essential: true },
  { name: 'Power Bank', category: 'Electronics', essential: true },
  { name: 'Basic First Aid Kit', category: 'Health', essential: true },
  { name: 'Medications', category: 'Health', essential: true }
];

const activityItems: Record<string, PackingItem[]> = {
  'Beach': [
    { name: 'Swimsuit', category: 'Clothing', essential: false },
    { name: 'Beach Towel', category: 'Beach Gear', essential: false },
    { name: 'Sunscreen', category: 'Health', essential: true },
    { name: 'Sunglasses', category: 'Accessories', essential: false },
    { name: 'Beach Bag', category: 'Beach Gear', essential: false },
    { name: 'Flip Flops', category: 'Footwear', essential: false }
  ],
  'Hiking': [
    { name: 'Hiking Boots', category: 'Footwear', essential: true },
    { name: 'Hiking Socks', category: 'Clothing', essential: true },
    { name: 'Water Bottle', category: 'Gear', essential: true },
    { name: 'Backpack', category: 'Gear', essential: true },
    { name: 'Trail Map', category: 'Navigation', essential: true },
    { name: 'Energy Snacks', category: 'Food', essential: false }
  ],
  'City Exploration': [
    { name: 'Comfortable Walking Shoes', category: 'Footwear', essential: true },
    { name: 'Day Bag', category: 'Accessories', essential: false },
    { name: 'Camera', category: 'Electronics', essential: false },
    { name: 'City Map/Guide', category: 'Navigation', essential: false },
    { name: 'Umbrella', category: 'Accessories', essential: false }
  ],
  'Business': [
    { name: 'Business Suits', category: 'Clothing', essential: true },
    { name: 'Dress Shoes', category: 'Footwear', essential: true },
    { name: 'Laptop', category: 'Electronics', essential: true },
    { name: 'Business Cards', category: 'Documents', essential: false },
    { name: 'Portable Iron', category: 'Accessories', essential: false }
  ],
  'Camping': [
    { name: 'Tent', category: 'Gear', essential: true },
    { name: 'Sleeping Bag', category: 'Gear', essential: true },
    { name: 'Flashlight', category: 'Gear', essential: true },
    { name: 'Multi-tool', category: 'Tools', essential: true },
    { name: 'Insect Repellent', category: 'Health', essential: true }
  ],
  'Winter Sports': [
    { name: 'Winter Jacket', category: 'Clothing', essential: true },
    { name: 'Thermal Underwear', category: 'Clothing', essential: true },
    { name: 'Gloves', category: 'Accessories', essential: true },
    { name: 'Winter Boots', category: 'Footwear', essential: true },
    { name: 'Hand Warmers', category: 'Accessories', essential: false }
  ]
};

const climateItems: Record<string, PackingItem[]> = {
  'tropical': [
    { name: 'Light Clothing', category: 'Clothing', essential: true },
    { name: 'Insect Repellent', category: 'Health', essential: true },
    { name: 'Sun Hat', category: 'Accessories', essential: false },
    { name: 'Sunscreen', category: 'Health', essential: true }
  ],
  'cold': [
    { name: 'Warm Jacket', category: 'Clothing', essential: true },
    { name: 'Thermal Layers', category: 'Clothing', essential: true },
    { name: 'Winter Hat', category: 'Accessories', essential: true },
    { name: 'Gloves', category: 'Accessories', essential: true }
  ],
  'temperate': [
    { name: 'Light Jacket', category: 'Clothing', essential: false },
    { name: 'Umbrella', category: 'Accessories', essential: false },
    { name: 'Layered Clothing', category: 'Clothing', essential: true }
  ],
  'dry': [
    { name: 'Water Bottle', category: 'Gear', essential: true },
    { name: 'Moisturizer', category: 'Health', essential: false },
    { name: 'Sun Protection', category: 'Health', essential: true }
  ]
};

export const generatePackingList = (tripDetails: TripDetails): PackingItem[] => {
  let packingList = [...essentials];

  // Add climate-specific items
  if (tripDetails.climate) {
    packingList = [...packingList, ...(climateItems[tripDetails.climate] || [])];
  }

  // Add activity-specific items
  tripDetails.activities.forEach(activity => {
    if (activityItems[activity]) {
      packingList = [...packingList, ...activityItems[activity]];
    }
  });

  // Remove duplicates based on item name
  const uniqueItems = Array.from(
    new Map(packingList.map(item => [item.name, item])).values()
  );

  return uniqueItems;
};