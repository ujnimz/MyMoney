import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const InfoText = ({text}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
    text: {
      fontSize: 14,
      color: colors.text.main,
    },
  });

export default InfoText;
