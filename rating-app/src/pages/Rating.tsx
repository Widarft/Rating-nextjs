"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import RatingForm from "@/components/RatingForm";
import RatingsList from "@/components/RatingsList";

type Rating = {
  id: string;
  user_name: string;
  rating: number;
  review: string;
  created_at: string;
};

const Rating: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      const { data, error } = await supabase
        .from("ratings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching ratings:", error);
      } else {
        setRatings(data || []);
      }
    };

    fetchRatings();
  }, []);

  const handleAddRating = async (
    user_name: string,
    rating: number,
    review: string
  ) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("ratings")
      .insert([{ user_name, rating, review }])
      .select();

    setIsLoading(false);

    if (error) {
      setMessage("Error submitting review.");
      console.error(error);
    } else {
      setMessage("Review submitted successfully.");
      setRatings((prev) => [data[0], ...prev]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <RatingForm
        onSubmit={handleAddRating}
        isLoading={isLoading}
        message={message}
      />
      <RatingsList ratings={ratings} />
    </div>
  );
};

export default Rating;
