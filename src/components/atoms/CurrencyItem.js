import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const CurrencyItem = ({item, currency, setCurrency, modalizeRef}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const onSetIcon = () => {
    setCurrency(item.currency);
    modalizeRef.current?.close();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onSetIcon}>
      <View style={styles.details}>
        <View>
          <Text style={styles.title}>{item.currency}</Text>
        </View>
      </View>

      <View>
        <Ionicons
          name={item.currency === currency ? 'checkmark-circle' : 'add'}
          color={item.currency === currency ? colors.success : colors.text.main}
          size={28}
        />
      </View>
    </TouchableOpacity>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text.main,
    },
    icon: {
      paddingRight: 10,
    },
  });

export default CurrencyItem;
