import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {summaryHeight} from '_utils/useDimensions';
import {useTheme} from '_theme/ThemeContext';
import PieChart from '_components/atoms/PieChart';

const Summary = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.centerSection}>
        <Text style={styles.monthText}>October</Text>
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
      padding: 15,
    },
    centerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 15,
    },
    monthText: {
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
