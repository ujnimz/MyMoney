import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';

const FormIconSelect = ({modalizeRef, icon, ...rest}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const handleOnIcon = () => {
    Keyboard.dismiss();
    modalizeRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconInputWrapper}>
        <View style={{flex: 1}}>
          <TextInput
            name='icon'
            style={styles.input}
            placeholderTextColor={colors.text.focus}
            editable={false}
            {...rest}
          />
        </View>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => handleOnIcon()}
        >
          <Ionicons
            name={icon === '' ? 'add-circle' : icon}
            color={colors.primary.main}
            size={32}
          />
        </TouchableOpacity>
      </View>
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
    iconInputWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.text.focus,
      color: colors.text.main,
    },
    iconWrapper: {
      marginLeft: 15,
      padding: 5,
    },
  });

export default FormIconSelect;
