import React, {useState, useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import CategoriesList from '_components/molecules/CategoriesList';
import InfoText from '_components/atoms/InfoText';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Food',
    icon: 'fast-food',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Transportation',
    icon: 'car-sport',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557dsdsd72',
    title: 'Shopping',
    icon: 'basket',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557dsdsds7',
    title: 'Utility',
    icon: 'bulb',
  },
  {
    id: '58694a0f-3da5-471f-bd96-14557dsdsds7',
    title: 'Rentals',
    icon: 'business',
  },
  {
    id: '58694a0f-3da1-981f-bd96-14557dsdsds7',
    title: 'Banking',
    icon: 'card',
  },
];

const CategoryScreen = ({navigation}) => {
  //const {newCat} = route.params;
  const [catList, setCatList] = useState([]);
  const [loading, setLoading] = useState(false);

  const {colors} = useTheme();
  const styles = useStyles(colors);

  let initialState = {
    title: '',
    icon: '',
  };

  useEffect(() => {
    setCatList(DATA);
    return () => {
      setCatList([]);
    };
  }, [loading]);

  const onSaveCategory = newCat => {
    setLoading(true);
    DATA.push(newCat);
    setLoading(false);
    navigation.navigate('Categories');
  };

  console.log(catList);

  const onAddCategory = cat => {
    navigation.navigate('AddCategory', {cat, onSaveCategory});
  };

  const onSetCategory = cat => {
    navigation.navigate('AddCategory', {cat, onSaveCategory});
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => onAddCategory(initialState)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add New Category</Text>
        <Ionicons
          name='chevron-forward'
          color={colors.primary.content}
          size={28}
        />
      </TouchableOpacity>
      {loading ? (
        <InfoText text='Loading..' />
      ) : catList.length > 0 ? (
        <CategoriesList
          onSetCategory={onSetCategory}
          key={catList.length}
          categoryList={catList}
        />
      ) : (
        <InfoText text='Oops! There are no Categories.' />
      )}
    </SafeAreaView>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: colors.background.main,
    },
    text: {
      fontSize: 14,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      margin: 15,
      borderRadius: 10,
      backgroundColor: colors.primary.main,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.primary.content,
    },
    infoText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text.main,
    },
  });

export default CategoryScreen;
