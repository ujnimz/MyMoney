import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import IconItem from '_components/atoms/IconItem';

const DATA = [
  {
    icon: '',
    name: '',
  },
];

const IconsList = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const renderItem = ({item}) => <IconItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.icon}
        showsVerticalScrollIndicator={false}
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
    divider: {
      height: 1,
      backgroundColor: colors.black.main,
    },
  });

export default IconsList;
