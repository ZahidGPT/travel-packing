import React, { useState } from 'react';
import { Calendar, MapPin, Mountain } from 'lucide-react';
import { TripDetails } from '../types';

interface TripFormProps {
  onSubmit: (tripDetails: TripDetails) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    destination: '',
    startDate: '',
    endDate: '',
    activities: [],
    climate: '',
  });

  const activities = [
    'Beach', 'Hiking', 'City Exploration', 'Business', 
    'Camping', 'Winter Sports', 'Photography', 'Swimming'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tripDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trip Details</h2>
      
      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
          Destination
        </label>
        <input
          type="text"
          value={tripDetails.destination}
          onChange={(e) => setTripDetails({...tripDetails, destination: e.target.value})}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Where are you going?"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-gray-700 mb-2">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Start Date
          </label>
          <input
            type="date"
            value={tripDetails.startDate}
            onChange={(e) => setTripDetails({...tripDetails, startDate: e.target.value})}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="flex items-center text-gray-700 mb-2">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            End Date
          </label>
          <input
            type="date"
            value={tripDetails.endDate}
            onChange={(e) => setTripDetails({...tripDetails, endDate: e.target.value})}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="flex items-center text-gray-700 mb-2">
          <Mountain className="w-5 h-5 mr-2 text-indigo-600" />
          Activities
        </label>
        <div className="grid grid-cols-2 gap-2">
          {activities.map((activity) => (
            <label key={activity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={tripDetails.activities.includes(activity)}
                onChange={(e) => {
                  const newActivities = e.target.checked
                    ? [...tripDetails.activities, activity]
                    : tripDetails.activities.filter(a => a !== activity);
                  setTripDetails({...tripDetails, activities: newActivities});
                }}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{activity}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center text-gray-700 mb-2">
          Climate Type
        </label>
        <select
          value={tripDetails.climate}
          onChange={(e) => setTripDetails({...tripDetails, climate: e.target.value})}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        >
          <option value="">Select climate</option>
          <option value="tropical">Tropical</option>
          <option value="cold">Cold</option>
          <option value="temperate">Temperate</option>
          <option value="dry">Dry</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        Generate Packing List
      </button>
    </form>
  );
};

export default TripForm;