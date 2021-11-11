import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import {headerHeight} from '_utils/useDimensions';

const AddNewModal = ({modalizeRef}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Modalize
      modalStyle={styles.modal}
      ref={modalizeRef}
      modalTopOffset={headerHeight * 2}
      handlePosition={'inside'}
    >
      <Text>Modal</Text>
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

export default AddNewModal;
