"use client";

import React, { useState } from "react";

const RatingForm: React.FC<{
  onSubmit: (user_name: string, rating: number, review: string) => void;
  isLoading: boolean;
  message: string;
}> = ({ onSubmit, isLoading, message }) => {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !rating || !review) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit(userName, rating, review);
    setUserName("");
    setRating(null);
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Rating</label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              className={`text-3xl ${
                (hoveredRating && star <= hoveredRating) ||
                (rating && star <= rating)
                  ? "text-yellow-500"
                  : "text-gray-400"
              } hover:text-yellow-500`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </form>
  );
};

export default RatingForm;
