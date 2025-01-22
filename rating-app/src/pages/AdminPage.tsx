"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import ConfirmDeleteModal from "@/app/global/ConfirmDeleteModal";

type Rating = {
  id: string;
  user_name: string;
  rating: number;
  review: string;
  created_at: string;
};

const AdminPage: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState<Rating | null>(null);

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

  const handleDelete = async (id: string) => {
    setIsLoading(true);

    const { error } = await supabase.from("ratings").delete().eq("id", id);

    setIsLoading(false);

    if (error) {
      console.error("Error deleting rating:", error);
    } else {
      setRatings((prev) => prev.filter((rating) => rating.id !== id));
    }
  };

  const openModal = (rating: Rating) => {
    setModalData(rating);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const confirmAction = () => {
    if (modalData) {
      handleDelete(modalData.id);
    }
    closeModal();
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Page</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && ratings.length === 0 && <p>No ratings available.</p>}
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Rating
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Review
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating) => (
            <tr key={rating.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {rating.user_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rating.rating}/5
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rating.review}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => openModal(rating)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <ConfirmDeleteModal
          isOpen={!!modalData}
          onClose={closeModal}
          onConfirm={confirmAction}
          title="Confirm Deletion"
          message={`Are you sure you want to delete the rating by ${modalData.user_name}?`}
        />
      )}
    </div>
  );
};

export default AdminPage;
