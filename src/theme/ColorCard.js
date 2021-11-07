import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useTheme} from './ThemeContext';

const ColorCard = ({children, backgroundColor}) => {
  const {isDark} = useTheme();

  const backgroundStyle = {
    borderRadius: 15,
    padding: 5,
    marginBottom: 15,
    backgroundColor: backgroundColor,
  };

  return <View style={backgroundStyle}>{children}</View>;
};

ColorCard.propTypes = {
  children: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default ColorCard;
