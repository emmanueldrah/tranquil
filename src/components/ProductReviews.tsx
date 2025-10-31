'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Review } from '@/types/reviews';
import { v4 as uuidv4 } from 'uuid';

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Review) => void;
  onUpdateReview: (reviewId: string, helpful: number) => void;
}

export function ProductReviews({
  productId,
  reviews,
  onAddReview,
  onUpdateReview,
}: ProductReviewsProps) {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
    images: [] as string[],
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newReview: Review = {
      id: uuidv4(),
      productId,
      userId: user.id,
      userName: user.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      images: reviewForm.images,
      createdAt: new Date().toISOString(),
      helpful: 0,
    };

    onAddReview(newReview);
    setShowReviewForm(false);
    setReviewForm({ rating: 5, comment: '', images: [] });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real app, you would upload these to a server
    // Here we're just creating object URLs for demo purposes
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setReviewForm({ ...reviewForm, images: [...reviewForm.images, ...imageUrls] });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>

      {/* Average Rating */}
      <div className="mt-4 flex items-center">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(averageRating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 15.585l-7.07 4.242 1.414-8.485L0 7.07l7.778-1.414L10 0l2.222 5.656L20 7.07l-4.343 4.272 1.414 8.485L10 15.585z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <p className="ml-2 text-sm text-gray-700">
          {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
        </p>
      </div>

      {/* Write Review Button */}
      {user && !showReviewForm && (
        <button
          onClick={() => setShowReviewForm(true)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Write a Review
        </button>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mt-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="mt-1 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setReviewForm({ ...reviewForm, rating: star })
                    }
                    className={`${
                      star <= reviewForm.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    } hover:text-yellow-400`}
                  >
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 15.585l-7.07 4.242 1.414-8.485L0 7.07l7.778-1.414L10 0l2.222 5.656L20 7.07l-4.343 4.272 1.414 8.485L10 15.585z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Review
              </label>
              <textarea
                id="comment"
                rows={4}
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photos
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {reviewForm.images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {reviewForm.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Review image ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="mt-8 space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {review.userName}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${
                      star <= review.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-7.07 4.242 1.414-8.485L0 7.07l7.778-1.414L10 0l2.222 5.656L20 7.07l-4.343 4.272 1.414 8.485L10 15.585z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {review.images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Review image ${index + 1}`}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => onUpdateReview(review.id, review.helpful + 1)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}