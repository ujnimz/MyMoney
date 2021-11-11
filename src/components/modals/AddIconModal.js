import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import {headerHeight} from '_utils/useDimensions';
import IconItem from '_components/atoms/IconItem';

const DATA = [
  {
    icon: 'fast-food',
    name: 'fast-food',
  },
  {
    icon: 'car-sport',
    name: 'car-sport',
  },
  {
    icon: 'basket',
    name: 'basket',
  },
  {
    icon: 'bulb',
    name: 'bulb',
  },
  {
    icon: 'business',
    name: 'business',
  },
  {
    icon: 'card',
    name: 'card',
  },
  {
    icon: 'airplane',
    name: 'airplane',
  },
  {
    icon: 'barbell',
    name: 'barbell',
  },
  {
    icon: 'beer',
    name: 'beer',
  },
  {
    icon: 'bus',
    name: 'bus',
  },
  {
    icon: 'bed',
    name: 'bed',
  },
  {
    icon: 'chatbox-ellipses',
    name: 'chatbox-ellipses',
  },
  {
    icon: 'desktop',
    name: 'desktop',
  },
  {
    icon: 'earth',
    name: 'earth',
  },
  {
    icon: 'restaurant',
    name: 'restaurant',
  },
  {
    icon: 'easel',
    name: 'easel',
  },
  {
    icon: 'game-controller',
    name: 'game-controller',
  },
  {
    icon: 'headset',
    name: 'headset',
  },
  {
    icon: 'gift',
    name: 'gift',
  },
  {
    icon: 'paw',
    name: 'paw',
  },
  {
    icon: 'medkit',
    name: 'Medkit',
  },
  {
    icon: 'heart',
    name: 'heart',
  },
  {
    icon: 'musical-notes',
    name: 'musical-notes',
  },
  {
    icon: 'pizza',
    name: 'pizza',
  },
  {
    icon: 'school',
    name: 'school',
  },
  {
    icon: 'shirt',
    name: 'shirt',
  },
];

const AddCategoryModal = ({modalizeRef, icon, setIcon}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const scrollY = useRef(new Animated.Value(0)).current;
  const renderItem = ({item}) => (
    <IconItem
      item={item}
      icon={icon}
      setIcon={setIcon}
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
        keyExtractor: item => item.icon,
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
      backgroundColor: colors.text.focus,
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

export default AddCategoryModal;
