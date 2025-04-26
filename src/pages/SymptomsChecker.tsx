import React, { useState } from 'react';
import { Brain, Search } from 'lucide-react';

interface Suggestion {
  illness: string;
  medicines: string[];
  doctorType: string;
}

const SymptomsChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion | null>(null);

  // Simple rule-based system for demo purposes
  const analyzeSympptoms = () => {
    const symptomsList = symptoms.toLowerCase();
    
    if (symptomsList.includes('headache') || symptomsList.includes('migraine')) {
      setSuggestions({
        illness: 'Possible Migraine or Tension Headache',
        medicines: ['Paracetamol', 'Ibuprofen'],
        doctorType: 'Neurologist'
      });
    } else if (symptomsList.includes('fever') || symptomsList.includes('cold')) {
      setSuggestions({
        illness: 'Common Cold or Flu',
        medicines: ['Paracetamol', 'Vitamin C', 'Cold Relief Tablets'],
        doctorType: 'General Physician'
      });
    } else if (symptomsList.includes('cough')) {
      setSuggestions({
        illness: 'Common Cold or Bronchitis',
        medicines: ['Cough Syrup', 'Throat Lozenges'],
        doctorType: 'Pulmonologist'
      });
    } else {
      setSuggestions({
        illness: 'Unable to determine specific condition',
        medicines: ['Please consult a doctor for proper diagnosis'],
        doctorType: 'General Physician'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">AI Symptoms Checker</h1>
          <p className="text-gray-600">
            Describe your symptoms below and our system will suggest possible conditions and medicines.
            Please note that this is not a replacement for professional medical advice.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows={4}
            placeholder="Describe your symptoms here... (e.g., headache, fever, cough)"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button
            onClick={analyzeSympptoms}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Search className="mr-2" />
            Analyze Symptoms
          </button>
        </div>

        {suggestions && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Possible Condition:</h3>
                <p className="text-blue-600">{suggestions.illness}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Suggested Medicines:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {suggestions.medicines.map((medicine, index) => (
                    <li key={index}>{medicine}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Recommended Specialist:</h3>
                <p className="text-blue-600">{suggestions.doctorType}</p>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ This is an automated suggestion system. Please consult with a qualified medical professional for accurate diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomsChecker;