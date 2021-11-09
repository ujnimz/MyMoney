import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';

const FormIconButton = ({
  icon,
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
        {isAnimating ? (
          <ActivityIndicator size='small' color={colors.primary.content} />
        ) : (
          <Ionicons
            name={icon === '' ? 'add-circle' : icon}
            color={colors.primary.content}
            size={18}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 15,
    },
    button: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: colors.primary.main,
    },
  });

export default FormIconButton;
