import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const FormTextInput = ({...rest}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.text.focus}
        {...rest}
      />
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 10,
    },
    input: {
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: colors.surface.main,
      borderColor: colors.text.focus,
      color: colors.text.main,
    },
  });

export default FormTextInput;
