import React from 'react';
import {StyleSheet, Text, View, FlatList, SectionList} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import TransactionItem from '_components/atoms/TransactionItem';

const TransactionsList = ({transactionData}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  //console.log(transactionData);
  // const sortDates = arr => {
  //   return arr.sort(function compare(a, b) {
  //     var dateA = new Date(a.date);
  //     var dateB = new Date(b.date);
  //     return dateA - dateB;
  //   });
  // };

  // get unique dates array from transactionsData array
  function getUniqueDates(value, index, self) {
    return self.indexOf(value) === index;
  }
  // convert timestamp array to dates array
  const getDatesArray = arr => {
    return arr.map(item => item.toDate().toDateString());
  };
  // get all the time stamps array from transactionsData array
  const getTimeStampsArray = arr => {
    return arr.map(item => item.timestamp);
  };

  const changeDateInArray = arr => {
    return arr.map(item => ({
      ...item,
      date: item.date.toDate().toDateString(),
    }));
  };

  const timestampsArray = getTimeStampsArray(transactionData);

  var uniqueTimestampsArray = timestampsArray.filter(getUniqueDates);

  const getSectionListArray = (dateArr, fullArr) => {
    return dateArr.map(item => ({
      timestamp: item,
      data: fullArr.filter(transaction => transaction.timestamp === item),
    }));
  };

  const data = getSectionListArray(uniqueTimestampsArray, transactionData);
  //console.log(data);
  const Item = ({item}) => {
    return <TransactionItem item={item} />;
  };

  const convertTimestampToDate = timestamp => {
    return new Date(timestamp * 1000).toDateString();
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item item={item} />}
        renderSectionHeader={({section: {timestamp}}) => (
          <View style={styles.header}>
            <Text style={styles.date}>{convertTimestampToDate(timestamp)}</Text>
          </View>
        )}
      />

      {/* <FlatList
        data={transactionData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View style={styles.header}>
              <Text style={styles.title}>All Transactions</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.divider}></View>;
        }}
      /> */}
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    header: {
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: colors.background.main,
    },
    date: {
      fontSize: 14,
      fontWeight: '700',
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.main,
      marginBottom: 15,
    },
    divider: {
      height: 1,
      backgroundColor: colors.black.main,
    },
  });

export default TransactionsList;
