import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '_theme/ThemeContext';

const CategoryItem = ({item, onSetCategory}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSetCategory(item)}
    >
      <View style={styles.details}>
        <View style={styles.icon}>
          <Ionicons name={item.icon} color={colors.primary.main} size={24} />
        </View>

        <View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>

      <View>
        <Ionicons name='chevron-forward' color={colors.text.main} size={28} />
      </View>
    </TouchableOpacity>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text.main,
    },
    icon: {
      paddingRight: 10,
    },
  });

export default CategoryItem;
