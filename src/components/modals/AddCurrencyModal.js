import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import {headerHeight} from '_utils/useDimensions';
import CurrencyItem from '_components/atoms/CurrencyItem';

const DATA = [
  {
    id: '0',
    currency: 'BHD',
  },
  {
    id: '1',
    currency: 'LKR',
  },
  {
    id: '2',
    currency: 'PHP',
  },
  {
    id: '3',
    currency: 'MYR',
  },
  {
    id: '4',
    currency: 'INR',
  },
  {
    id: '5',
    currency: 'USD',
  },
  {
    id: '6',
    currency: 'OMR',
  },
  {
    id: '7',
    currency: 'SAR',
  },
];

const AddCurrencyModal = ({modalizeRef, currency, setCurrency}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const scrollY = useRef(new Animated.Value(0)).current;
  const renderItem = ({item}) => (
    <CurrencyItem
      item={item}
      currency={currency}
      setCurrency={setCurrency}
      modalizeRef={modalizeRef}
    />
  );

  return (
    <Modalize
      modalStyle={styles.modal}
      ref={modalizeRef}
      modalTopOffset={headerHeight * 2}
      handlePosition={'inside'}
      flatListProps={{
        data: DATA,
        renderItem: renderItem,
        keyExtractor: item => item.currency,
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
              <Text style={styles.title}>Select an Icon</Text>
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

export default AddCurrencyModal;
