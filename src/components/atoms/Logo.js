import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';

const Logo = ({color}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container}>
      <Ionicons name='wallet' color={color} size={30} />

      <Text style={[styles.logoText, {color: color}]}>MyMoney</Text>
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 22,
      fontStyle: 'italic',
      fontWeight: '700',
      color: colors.primary.content,
    },
  });

export default Logo;
