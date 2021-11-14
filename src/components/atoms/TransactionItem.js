import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const TransactionItem = ({item}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {amount, notes, category} = item;

  const convertToCurrency = amount => {
    return Number(amount).toFixed(3).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.icon}>
          <Ionicons
            name={category.icon}
            color={colors.primary.main}
            size={24}
          />
        </View>

        <View>
          <Text style={styles.title}>{notes}</Text>
          <Text style={styles.category}>{category.title}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.amount}>{convertToCurrency(amount)}</Text>
      </View>
    </View>
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
    category: {
      fontSize: 11,
      color: colors.text.focus,
    },
    amount: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text.main,
    },
    icon: {
      paddingRight: 10,
    },
  });

export default TransactionItem;
