import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import CategoryItem from '_components/atoms/CategoryItem';

const CategoriesList = ({onSetCategory, categoryList}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const renderItem = ({item}) => (
    <CategoryItem item={item} onSetCategory={() => onSetCategory(item)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
      backgroundColor: colors.text.focus,
    },
  });

export default CategoriesList;
