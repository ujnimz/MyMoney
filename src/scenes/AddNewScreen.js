import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const AddNewScreen = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add New</Text>
    </View>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 14,
    },
  });

export default AddNewScreen;
