import React, { useState } from 'react';
import { List, PlusCircle, Check } from 'lucide-react';
import { PackingItem } from '../types';

interface PackingListProps {
  items: PackingItem[];
  onAddCustomItem: (item: PackingItem) => void;
}

const PackingList: React.FC<PackingListProps> = ({ items, onAddCustomItem }) => {
  const [newItemName, setNewItemName] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddCustomItem({
        name: newItemName.trim(),
        category: 'Custom',
        essential: false
      });
      setNewItemName('');
    }
  };

  const toggleItem = (itemName: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (checkedItems.has(itemName)) {
      newCheckedItems.delete(itemName);
    } else {
      newCheckedItems.add(itemName);
    }
    setCheckedItems(newCheckedItems);
  };

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
        <List className="w-6 h-6 mr-2 text-indigo-600" />
        Packing List
      </h2>

      <form onSubmit={handleAddCustomItem} className="flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add custom item..."
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </form>

      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">{category}</h3>
            <div className="space-y-2">
              {items
                .filter(item => item.category === category)
                .map(item => (
                  <div
                    key={item.name}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.has(item.name)}
                      onChange={() => toggleItem(item.name)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className={`flex-1 ${checkedItems.has(item.name) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {item.name}
                    </span>
                    {item.essential && (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Essential
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Fill in your trip details to get packing suggestions
        </div>
      )}
    </div>
  );
};

export default PackingList;