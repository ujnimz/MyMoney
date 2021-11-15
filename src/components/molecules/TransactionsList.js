import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import TransactionItem from '_components/atoms/TransactionItem';

const TransactionsList = ({transactionData}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  // make unique dates array from datesArray array
  const getUniqueDates = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  // make all the dates array from transactionsData array
  const getDatesArray = arr => {
    return arr.map(item => item.date.toDate().toDateString());
  };

  // get unique dates array
  const uniqueDatesArray =
    getDatesArray(transactionData).filter(getUniqueDates);

  // format transactionData array before sending to SectionList
  const getSectionListArray = (datesArr, fullArr) => {
    return datesArr.map(item => ({
      date: item,
      data: fullArr.filter(
        transaction => transaction.date.toDate().toDateString() === item,
      ),
    }));
  };

  const data = getSectionListArray(uniqueDatesArray, transactionData);

  const Item = ({item}) => {
    return <TransactionItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item item={item} />}
        renderSectionHeader={({section: {date}}) => (
          <View style={styles.header}>
            <Text style={styles.date}>{date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
    },
    header: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.surface.focus,
    },
    date: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.text.focus,
    },

    divider: {
      height: 1,
      backgroundColor: colors.black.main,
    },
  });

export default TransactionsList;
