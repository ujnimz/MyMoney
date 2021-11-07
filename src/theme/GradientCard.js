import React from 'react';
import PropTypes from 'prop-types';
import {LinearGradient} from 'expo-linear-gradient';

const GradientCard = ({children, gradientColors}) => {
  const backgroundStyle = {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[...gradientColors]}
      style={backgroundStyle}
    >
      {children}
    </LinearGradient>
  );
};

GradientCard.propTypes = {
  children: PropTypes.array.isRequired,
};

export default GradientCard;
