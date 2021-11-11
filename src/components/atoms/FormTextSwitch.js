import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const DATA = [
  {
    option: 'option_1',
    label: 'Option 1',
  },
  {
    option: 'option_2',
    label: 'Option 2',
  },
  {
    option: 'option_3',
    label: 'Option 3',
  },
  {
    option: 'option_4',
    label: 'Option 4',
  },
];

const FormTextSwitch = ({options, selected, onChange, isLoading = false}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const handlePress = option => {
    onChange(option);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.switchPlaceholder}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.switch}>
          {options.map((item, index) => (
            <TouchableOpacity
              onPress={() => handlePress(item.option)}
              key={item.option}
              style={[
                styles.button,
                index === 0
                  ? {...styles.firstButton}
                  : index === options.length - 1
                  ? {...styles.lastButton}
                  : {},
                selected === item.option ? {...styles.activeButton} : {},
              ]}
            >
              <Text
                style={[
                  styles.text,
                  selected === item.option ? {...styles.activeText} : {},
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 20,
    },
    switch: {
      flexDirection: 'row',
      alignItems: 'stretch',
      alignContent: 'stretch',
      justifyContent: 'space-between',
    },
    switchPlaceholder: {
      padding: 12,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.text.focus,
    },
    button: {
      flex: 1,
      padding: 12,
      backgroundColor: colors.background.main,
      borderLeftWidth: 1,
      borderRightWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.text.focus,
    },
    activeButton: {
      backgroundColor: colors.primary.main,
    },
    firstButton: {
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    lastButton: {
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    text: {
      fontSize: 14,
      textAlign: 'center',
      color: colors.text.main,
    },
    activeText: {
      color: colors.primary.content,
    },
  });

FormTextSwitch.propTypes = {
  options: PropTypes.array.isRequired,
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default FormTextSwitch;
