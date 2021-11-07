import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import {modalHeight, headerHeight} from '_utils/useDimensions';

import TransactionItem from '../atoms/TransactionItem';

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
];

const TransactionsModal = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const scrollY = useRef(new Animated.Value(0)).current;

  const modalizeRef = useRef(null);

  const renderItem = ({item}) => <TransactionItem item={item} />;

  return (
    <Modalize
      modalStyle={styles.modal}
      ref={modalizeRef}
      modalTopOffset={headerHeight * 2}
      //adjustToContentHeight={true}
      alwaysOpen={modalHeight}
      handlePosition={'inside'}
      flatListProps={{
        data: DATA,
        renderItem: renderItem,
        keyExtractor: item => item.id,
        showsVerticalScrollIndicator: false,
        onScroll: Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        ),
        //scrollEventThrottle: 16,
        ListHeaderComponent: () => {
          return (
            <View style={styles.header}>
              <Text style={styles.title}>Recent Transactions</Text>
            </View>
          );
        },
        ItemSeparatorComponent: () => {
          return <View style={styles.divider}></View>;
        },
      }}
    />
  );
};

const useStyles = colors =>
  StyleSheet.create({
    modal: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 20,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: colors.surface.main,
    },
    divider: {
      height: 1,
      backgroundColor: colors.black.main,
    },
    header: {
      padding: 15,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.main,
    },
  });

export default TransactionsModal;
