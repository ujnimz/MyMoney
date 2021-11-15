import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {summaryHeight} from '_utils/useDimensions';
import {useTheme} from '_theme/ThemeContext';
import PieChart from '_components/atoms/PieChart';

const Summary = ({
  onPrevMonth,
  onCurrMonthYear,
  onNextMonth,
  title,
  disabled,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.monthSection}>
        <TouchableOpacity onPress={() => onPrevMonth()}>
          <Ionicons
            name='caret-back-circle-outline'
            color={colors.black.content}
            size={36}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onCurrMonthYear()}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNextMonth()} disabled={disabled}>
          <Ionicons
            name='caret-forward-circle-outline'
            color={colors.black.content}
            size={36}
            style={disabled ? {opacity: 0.4} : ''}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.centerSection}>
        <PieChart />
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.amount}>565.300 BHD</Text>
        <Text style={styles.available}>Available to spend this month</Text>
        <Text style={styles.spent}>You have spent 325.700 BHD</Text>
      </View>
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      height: summaryHeight,
      justifyContent: 'flex-start',
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 15,
    },
    monthSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    centerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 15,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.black.content,
    },
    amount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.black.content,
    },
    available: {
      fontSize: 14,
      color: colors.black.content,
    },
    spent: {
      fontSize: 12,
      color: colors.white.focus,
    },
  });

export default Summary;
