import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const LoadingIcon = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <ActivityIndicator size='small' color={colors.text.main} />
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LoadingIcon;
