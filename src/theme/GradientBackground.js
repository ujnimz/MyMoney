import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useTheme} from './ThemeContext';

const GradientBackground = ({children, gradientColors}) => {
  const {isDark} = useTheme();

  const containerStyle = {
    flex: 1,
  };

  const backgroundStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  };

  return (
    <View style={containerStyle}>
      <LinearGradient
        // Background Linear Gradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[...gradientColors]}
        style={backgroundStyle}
      />
      {children}
    </View>
  );
};

GradientBackground.propTypes = {
  children: PropTypes.object.isRequired,
  gradientColors: PropTypes.array.isRequired,
};

export default GradientBackground;
