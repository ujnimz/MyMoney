import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import CategoriesList from '_components/molecules/CategoriesList';
import InfoText from '_components/atoms/InfoText';
// REDUX
import {connect} from 'react-redux';
import {getCat} from '_redux/actions/category';

const CategoryScreen = ({navigation, route, getCat, catState}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {isLoading, catData} = catState;

  useEffect(() => {
    getCat();
  }, []);

  const onAddCategory = () => {
    navigation.navigate('AddCategory', {
      cat: undefined,
      select: route.params?.select,
    });
  };

  const onEditCategory = cat => {
    navigation.navigate('EditCategory', {cat});
  };

  const onSelectCategory = cat => {
    //navigation.goBack();
    navigation.navigate('AddNew', {cat});
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => onAddCategory()} style={styles.button}>
        <Text style={styles.buttonText}>Add New Category</Text>
        <Ionicons
          name='chevron-forward'
          color={colors.primary.content}
          size={28}
        />
      </TouchableOpacity>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='small' color={colors.text.main} />
        </View>
      ) : catData ? (
        <CategoriesList
          onSetCategory={
            route.params?.select ? onSelectCategory : onEditCategory
          }
          categoryList={catData}
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
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

CategoryScreen.propTypes = {
  catState: PropTypes.object.isRequired,
  getCat: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  catState: state.catState,
});

export default connect(mapStateToProps, {getCat})(CategoryScreen);
