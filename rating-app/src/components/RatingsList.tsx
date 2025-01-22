"use client";

import React from "react";

type Rating = {
  id: string;
  user_name: string;
  rating: number;
  review: string;
  created_at: string;
};

const RatingsList: React.FC<{ ratings: Rating[] }> = ({ ratings }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">Reviews</h3>
    {ratings.map((rating) => (
      <div key={rating.id} className="p-4 border rounded shadow mb-4">
        <p className="font-bold">{rating.user_name}</p>
        <p>Rating: {rating.rating}/5</p>
        <p>{rating.review}</p>
      </div>
    ))}
  </div>
);

export default RatingsList;
