import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const Message = ({message}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
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
      color: colors.text.main,
    },
  });

export default Message;
