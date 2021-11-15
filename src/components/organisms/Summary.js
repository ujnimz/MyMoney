import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {summaryHeight} from '_utils/useDimensions';
import {useTheme} from '_theme/ThemeContext';
import PieChart from '_components/atoms/PieChart';
// REDUX
import {connect} from 'react-redux';

const Summary = ({
  onPrevMonth,
  onCurrMonthYear,
  onNextMonth,
  title,
  disabled,
  transactionsState,
  transactionData,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [debitTotal, setDebitTotal] = useState(0);
  const [creditTotal, setCreditTotal] = useState(0);

  //const {transactionData} = transactionsState;

  useEffect(() => {
    if (transactionData) {
      setDebitTotal(getDebitTotal());
      setCreditTotal(getCreditTotal());
    } else {
      setDebitTotal(0);
      setCreditTotal(0);
    }
    return () => {
      setDebitTotal(0);
      setCreditTotal(0);
    };
  }, [transactionData]);

  const convertToCurrency = amount => {
    return Number(amount).toFixed(3);
  };

  function add(accumulator, a) {
    return accumulator + a;
  }

  const getDebitTotal = () => {
    const debitAmounts = transactionData
      .filter(item => item.category.type === 'debit')
      .map(item => item.amount);

    const debitSum = debitAmounts.reduce(add, 0);
    return debitSum;
  };

  const getCreditTotal = () => {
    const creditAmounts = transactionData
      .filter(item => item.category.type === 'credit')
      .map(item => item.amount);

    const creditSum = creditAmounts.reduce(add, 0);
    return creditSum;
  };

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
        <PieChart creditTotal={creditTotal} debitTotal={debitTotal} />
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.amount}>
          {convertToCurrency(creditTotal - debitTotal)} BHD
        </Text>
        <Text style={styles.available}>Available to spend this month</Text>
        <Text style={styles.spent}>
          You have spent {convertToCurrency(debitTotal)} BHD
        </Text>
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

Summary.propTypes = {
  transactionsState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  transactionsState: state.transactionsState,
});

export default connect(mapStateToProps, null)(Summary);
