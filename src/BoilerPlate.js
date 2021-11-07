import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const BoilerPlate = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Text here</Text>
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 14,
    },
  });

export default BoilerPlate;
