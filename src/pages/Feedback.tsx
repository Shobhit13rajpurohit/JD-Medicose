import React, { useState } from 'react';
import { MessageSquare, Star, ThumbsUp } from 'lucide-react';

const Feedback = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const feedbackData = {
      patient_name: name,
      feedback_text: comment
    };

    try {
      const response = await fetch("http://localhost:8000/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedbackData)
      });

      if (response.ok) {
        alert("Thank you for your feedback!");
        setName('');
        setComment('');
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <MessageSquare className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Your Feedback Matters</h1>
        <p className="text-gray-600">Help us improve our services by sharing your experience</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full p-2 border rounded-lg" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
            <textarea className="w-full p-2 border rounded-lg" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} required />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
            <ThumbsUp className="mr-2" />
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
