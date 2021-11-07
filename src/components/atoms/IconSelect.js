import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';

const IconSelect = ({modalizeRef, icon, ...rest}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.iconInputWrapper}>
        <View style={{flex: 1}}>
          <TextInput name='icon' style={styles.input} {...rest} />
        </View>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => modalizeRef.current?.open()}
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
      padding: 15,
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
      borderColor: colors.black.main,
      color: colors.text.main,
    },
    iconWrapper: {
      marginLeft: 15,
      padding: 5,
    },
  });

export default IconSelect;
