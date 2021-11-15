import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import {modalHeight, headerHeight} from '_utils/useDimensions';
import Message from '_components/atoms/Message';
import LoadingIcon from '_components/atoms/LoadingIcon';
import TransactionItem from '../atoms/TransactionItem';

const TransactionsModal = ({isLoading, transactionData}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const scrollY = useRef(new Animated.Value(0)).current;

  const modalizeRef = useRef(null);

  const renderItem = ({item}) => <TransactionItem item={item} />;

  return transactionData && transactionData.length > 0 ? (
    <Modalize
      modalStyle={styles.modal}
      ref={modalizeRef}
      modalTopOffset={headerHeight * 2}
      //adjustToContentHeight={true}
      alwaysOpen={modalHeight}
      handlePosition={'inside'}
      flatListProps={{
        data: transactionData,
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
  ) : (
    <Modalize
      modalStyle={styles.modal}
      ref={modalizeRef}
      modalTopOffset={headerHeight * 2}
      //adjustToContentHeight={true}
      alwaysOpen={modalHeight}
      handlePosition={'inside'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
      </View>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <Message message='No transactions found. Please add.' />
      )}
    </Modalize>
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
