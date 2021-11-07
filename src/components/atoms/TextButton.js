import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const TextButton = ({
  text,
  bgColor,
  textColor,
  isAnimating = false,
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: bgColor}]}
        {...rest}
      >
        <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
        <ActivityIndicator
          size='small'
          color={colors.primary.content}
          animating={isAnimating}
        />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      padding: 15,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 10,
      backgroundColor: colors.primary.main,
    },
    buttonText: {
      fontSize: 14,
      paddingLeft: 15,
      paddingRight: 15,
      fontWeight: '500',
      textAlign: 'center',
      color: colors.primary.content,
    },
  });

export default TextButton;
