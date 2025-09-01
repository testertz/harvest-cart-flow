import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ReviewsStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getProductReviews: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  getReviewCount: (productId: string) => number;
  deleteReview: (reviewId: string) => void;
  userHasPurchased: (userId: string, productId: string) => boolean;
}

export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };
        set((state) => ({ reviews: [...state.reviews, newReview] }));
      },
      getProductReviews: (productId) => {
        const { reviews } = get();
        return reviews.filter(review => review.productId === productId);
      },
      getAverageRating: (productId) => {
        const productReviews = get().getProductReviews(productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
        return parseFloat((sum / productReviews.length).toFixed(1));
      },
      getReviewCount: (productId) => {
        return get().getProductReviews(productId).length;
      },
      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter(review => review.id !== reviewId)
        }));
      },
      // Simulate purchase verification - in real app, this would check order history
      userHasPurchased: (userId, productId) => {
        // For demo purposes, let's say all logged-in users can review
        return true;
      },
    }),
    {
      name: 'reviews-storage',
    }
  )
);