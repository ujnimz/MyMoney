import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import TransactionItem from '_components/atoms/TransactionItem';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'McDonalds',
    category: 'Food',
    amount: '5.650',
    icon: 'fast-food',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Taxi',
    category: 'Transportation',
    amount: '2.000',
    icon: 'car-sport',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557dsdsd72',
    title: 'Supermarket',
    category: 'Shopping',
    amount: '6.580',
    icon: 'basket',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557dsdsds7',
    title: 'Batelco Bill',
    category: 'Utility',
    amount: '17.350',
    icon: 'bulb',
  },
  {
    id: '58694a0f-3da5-471f-bd96-14557dsdsds7',
    title: 'Flat Rent',
    category: 'Rentals',
    amount: '17.350',
    icon: 'business',
  },
  {
    id: '58694a0f-3da1-481f-bd96-14557dsdsds7',
    title: 'Zain Bill',
    category: 'Utility',
    amount: '21.750',
    icon: 'bulb',
  },
  {
    id: '58694a8f-3da1-471f-bd96-14557dsdsds7',
    title: 'Office Transport',
    category: 'Transportation',
    amount: '60.000',
    icon: 'car-sport',
  },
  {
    id: '58694a0f-3da1-471f-bd89-14557dsdsds7',
    title: 'Max Fashion',
    category: 'Shopping',
    amount: '18.350',
    icon: 'basket',
  },
  {
    id: '58694a0f-3da1-981f-bd96-14557dsdsds7',
    title: 'Credit Card',
    category: 'Banking',
    amount: '62.000',
    icon: 'card',
  },

  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad5gdfbb28ba',
    title: 'McDonalds',
    category: 'Food',
    amount: '5.650',
    icon: 'fast-food',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd9gfga97f63',
    title: 'Taxi',
    category: 'Transportation',
    amount: '2.000',
    icon: 'car-sport',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145fghhsd72',
    title: 'Supermarket',
    category: 'Shopping',
    amount: '6.580',
    icon: 'basket',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455jjysdsds7',
    title: 'Batelco Bill',
    category: 'Utility',
    amount: '17.350',
    icon: 'bulb',
  },
  {
    id: '58694a0f-3da5-471f-bd96-14554g5fsdsds7',
    title: 'Flat Rent',
    category: 'Rentals',
    amount: '17.350',
    icon: 'business',
  },
  {
    id: '58694a0f-3da1-481f-bd96-178gf5sdsds7',
    title: 'Zain Bill',
    category: 'Utility',
    amount: '21.750',
    icon: 'bulb',
  },
  {
    id: '58694a8f-3da1-471f-bd96-145578fgdsds7',
    title: 'Office Transport',
    category: 'Transportation',
    amount: '60.000',
    icon: 'car-sport',
  },
  {
    id: '58694a0f-3da1-471f-bd89-14557f85dsds7',
    title: 'Max Fashion',
    category: 'Shopping',
    amount: '18.350',
    icon: 'basket',
  },
  {
    id: '58694a0f-3da1-981f-bd96-1455g745sds7',
    title: 'Credit Card',
    category: 'Banking',
    amount: '62.000',
    icon: 'card',
  },
];

const TransactionsList = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const renderItem = ({item}) => <TransactionItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
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
      />
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
      padding: 15,
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
