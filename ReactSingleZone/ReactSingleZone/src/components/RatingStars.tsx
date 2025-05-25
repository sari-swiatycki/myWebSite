import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} color="warning" sx={{ color: '#FFD700'}} />
      ))}
      {hasHalfStar && <StarHalfIcon color="warning" sx={{ color: '#FFD700' }} />}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <StarBorderIcon key={`empty-${i}`} color="warning" sx={{ color:'#FFD700'}} />
      ))}
      <Typography variant="body2" sx={{ marginLeft: 1 }}>
        {rating.toFixed(1)}
      </Typography>
    </Box>
  );
};

export default RatingStars;