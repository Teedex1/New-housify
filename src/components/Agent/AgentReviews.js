import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const AgentReviews = ({ reviews }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" className="text-yellow-500" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<StarOutlineIcon key={`empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-6 mt-8">
      <h3 className="text-2xl font-semibold text-white mb-6">Client Reviews</h3>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-zinc-700 last:border-0 pb-6 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-lg font-medium text-white">{review.clientName}</h4>
                <p className="text-sm text-gray-400">{review.date}</p>
              </div>
              <div className="flex">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="text-gray-300">{review.comment}</p>
            <div className="mt-2 text-sm text-gray-400">
              <span className="font-medium">Property: </span>
              {review.property}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentReviews;
