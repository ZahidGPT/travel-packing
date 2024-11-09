import React, { useState } from 'react';
import { Backpack, Calendar, MapPin, Mountain, Umbrella, Sun, Thermometer, List, PlusCircle } from 'lucide-react';
import TripForm from './components/TripForm';
import PackingList from './components/PackingList';
import { generatePackingList } from './utils/packingLogic';
import { TripDetails, PackingItem } from './types';

function App() {
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [customItems, setCustomItems] = useState<PackingItem[]>([]);

  const handleTripSubmit = (tripDetails: TripDetails) => {
    const generatedList = generatePackingList(tripDetails);
    setPackingList(generatedList);
  };

  const addCustomItem = (item: PackingItem) => {
    setCustomItems([...customItems, item]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Backpack className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Smart Pack</h1>
          <p className="text-gray-600">Plan your perfect packing list for any adventure</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TripForm onSubmit={handleTripSubmit} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <PackingList 
              items={[...packingList, ...customItems]} 
              onAddCustomItem={addCustomItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;