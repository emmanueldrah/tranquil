'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Review } from '@/types/reviews';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, ThumbsUp, ThumbsDown, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'rating'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'verified' | 'with-photos' | 'with-videos'>('all');
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
    images: [] as string[],
    videos: [] as string[],
    pros: [] as string[],
    cons: [] as string[],
  });
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

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
      videos: reviewForm.videos,
      pros: reviewForm.pros,
      cons: reviewForm.cons,
      verified: true, // Assuming verified for demo
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      helpful: 0,
    };

    onAddReview(newReview);
    setShowReviewForm(false);
    setReviewForm({ rating: 5, comment: '', images: [], videos: [], pros: [], cons: [] });
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
      <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>

      {/* Review Summary */}
      <div className="mt-4 bg-deep/80 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(averageRating)
                      ? 'text-green'
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
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">
              Based on {reviews.length} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 ml-8">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center mb-1">
                  <span className="text-sm text-gray-600 w-8">{rating}★</span>
                  <div className="flex-1 bg-deep/30 rounded-full h-2 mx-2">
                    <div
                      className="bg-green h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sort and Filter Controls */}
          <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <SortAsc className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border border-white/10 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="helpful">Most Helpful</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-400 mr-2" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="text-sm border border-white/10 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="all">All Reviews</option>
              <option value="verified">Verified Only</option>
              <option value="with-photos">With Photos</option>
              <option value="with-videos">With Videos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      {user && !showReviewForm && (
        <Button
          type="button"
          variant="primary"
          onClick={() => setShowReviewForm(true)}
          className="mt-4 inline-flex items-center"
        >
          Write a Review
        </Button>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mt-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white">Rating</label>
              <div className="mt-1 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant="ghost"
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className={`p-0 ${
                      star <= reviewForm.rating ? 'text-green' : 'text-gray-400'
                    } hover:text-green`}
                  >
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 15.585l-7.07 4.242 1.414-8.485L0 7.07l7.778-1.414L10 0l2.222 5.656L20 7.07l-4.343 4.272 1.414 8.485L10 15.585z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
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
                className="mt-1 block w-full border border-white/10 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal focus:border-teal sm:text-sm bg-deep/90 text-white"
                required
              />
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pros
                </label>
                <div className="space-y-2">
                  {reviewForm.pros.map((pro, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={pro}
                        onChange={(e) => {
                          const newPros = [...reviewForm.pros];
                          newPros[index] = e.target.value;
                          setReviewForm({ ...reviewForm, pros: newPros });
                        }}
                        className="flex-1 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green"
                        placeholder="What did you like?"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          const newPros = reviewForm.pros.filter((_, i) => i !== index);
                          setReviewForm({ ...reviewForm, pros: newPros });
                        }}
                        className="text-red-500 hover:text-red-700 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setReviewForm({ ...reviewForm, pros: [...reviewForm.pros, ''] })}
                    className="text-sm text-green hover:text-green flex items-center p-0"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Add Pro
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cons
                </label>
                <div className="space-y-2">
                  {reviewForm.cons.map((con, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={con}
                        onChange={(e) => {
                          const newCons = [...reviewForm.cons];
                          newCons[index] = e.target.value;
                          setReviewForm({ ...reviewForm, cons: newCons });
                        }}
                        className="flex-1 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep"
                        placeholder="What could be improved?"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          const newCons = reviewForm.cons.filter((_, i) => i !== index);
                          setReviewForm({ ...reviewForm, cons: newCons });
                        }}
                        className="text-red-500 hover:text-red-700 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setReviewForm({ ...reviewForm, cons: [...reviewForm.cons, ''] })}
                    className="text-sm text-white hover:text-white flex items-center p-0"
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Add Con
                  </Button>
                </div>
              </div>
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
                  className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal/20 file:text-teal hover:file:bg-teal/30"
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Videos
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;

                    // In a real app, you would upload these to a server
                    // Here we're just creating object URLs for demo purposes
                    const videoUrls = Array.from(files).map((file) =>
                      URL.createObjectURL(file)
                    );
                    setReviewForm({ ...reviewForm, videos: [...reviewForm.videos, ...videoUrls] });
                  }}
                  className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-deep/20 file:text-teal hover:file:bg-deep/30"
                />
              </div>
              {reviewForm.videos.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {reviewForm.videos.map((url, index) => (
                    <div key={index} className="relative">
                      <video
                        src={url}
                        className="h-20 w-20 object-cover rounded-md"
                        controls
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Button type="submit" variant="primary">Submit Review</Button>
              <Button type="button" variant="ghost" onClick={() => setShowReviewForm(false)}>Cancel</Button>
            </div>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="mt-8 space-y-8">
        {reviews
          .filter((review) => {
            if (filterBy === 'verified') return review.verified;
            if (filterBy === 'with-photos') return review.images && review.images.length > 0;
            if (filterBy === 'with-videos') return review.videos && review.videos.length > 0;
            return true;
          })
          .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (sortBy === 'helpful') return (b.helpful ?? 0) - (a.helpful ?? 0);
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
          })
          .map((review) => (
            <div key={review.id} className="border-t border-white/10 pt-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.userName}
                      </h3>
                      {review.verified && (
                        <span title="Verified Purchase">
                          <CheckCircle className="h-4 w-4 text-green" />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/80">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating
                          ? 'text-green'
                          : 'text-gray-400'
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

              {/* Pros and Cons */}
              {(review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {review.pros && review.pros.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-green mb-2">Pros</h4>
                      <ul className="space-y-1">
                        {review.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <ThumbsUp className="h-3 w-3 text-green mr-2" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {review.cons && review.cons.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Cons</h4>
                      <ul className="space-y-1">
                        {review.cons.map((con, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <ThumbsDown className="h-3 w-3 text-white/80 mr-2" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}

              <p className="mt-4 text-sm text-white/90">{review.comment}</p>

              {/* Images and Videos */}
              <div className="mt-4 space-y-4">
                {review.images && review.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.images.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Review image ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-md cursor-pointer hover:opacity-80"
                        onClick={() => window.open(url, '_blank')}
                      />
                    ))}
                  </div>
                )}

                {review.videos && review.videos.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.videos.map((url, index) => (
                      <div key={index} className="relative">
                        <video
                          src={url}
                          className="h-20 w-20 object-cover rounded-md"
                          controls
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

                <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onUpdateReview(review.id, (review.helpful ?? 0) + 1)}
                    className="flex items-center space-x-1 text-sm text-white/80 hover:text-white p-0"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful ({review.helpful ?? 0})</span>
                  </Button>
                </div>
                <div className="text-xs text-white/60">
                  {review.verified ? 'Verified Purchase' : 'Unverified'}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}