import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const TransactionItem = ({item}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.icon}>
          <Ionicons name={item.icon} color={colors.primary.main} size={24} />
        </View>

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.amount}>{item.amount}</Text>
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
      padding: 15,
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
