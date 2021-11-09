import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Alert} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import AddIconModal from '_components/modals/AddIconModal';
import FormButton from '_components/atoms/FormButton';
import FormIconButton from '_components/atoms/FormIconButton';
import FormTextInput from '_components/atoms/FormTextInput';
import FormIconSelect from '_components/atoms/FormIconSelect';
// REDUX
import {connect} from 'react-redux';
import {
  addCat,
  updateCat,
  deleteCat,
  rollbackCompleted,
} from '_redux/actions/category';

const AddCategoryScreen = ({
  route,
  navigation,
  catState,
  addCat,
  updateCat,
  deleteCat,
  rollbackCompleted,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [title, setTitle] = useState(
    route.params.cat ? route.params.cat.title : '',
  );
  const [icon, setIcon] = useState(
    route.params.cat ? route.params.cat.icon : '',
  );

  const {isLoading, isCompleted} = catState;

  const modalizeRef = useRef(null);

  const onAdd = async () => {
    return await addCat({title, icon});
  };

  const onUpdate = async id => {
    return await updateCat({id, title, icon});
  };

  const onDelete = id => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to delete ' + title + ' from categories?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: async () => {
            await deleteCat(id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  useEffect(() => {
    if (isCompleted) {
      navigation.navigate('Categories');
    }
    return () => {
      rollbackCompleted();
    };
  }, [isCompleted]);

  return (
    <View style={styles.container}>
      <FormTextInput
        value={title}
        onChangeText={val => setTitle(val)}
        name='title'
        placeholder='Category Name'
        autoFocus={true}
      />
      <FormIconSelect
        modalizeRef={modalizeRef}
        icon={icon}
        onChangeText={val => setIcon(val)}
        value={icon}
        placeholder='Category Icon'
        autoCapitalize='none'
      />

      <View style={styles.buttons}>
        <FormButton
          text={route.params.cat ? 'Update Category' : 'Add Category'}
          bgColor={colors.primary.main}
          textColor={colors.primary.content}
          isAnimating={isLoading}
          onPress={
            route.params.cat
              ? () => onUpdate(route.params.cat.id)
              : () => onAdd()
          }
        />

        {route.params.cat ? (
          <FormIconButton
            icon='trash'
            bgColor={colors.primary.main}
            textColor={colors.primary.content}
            isAnimating={isLoading}
            onPress={() => onDelete(route.params.cat.id)}
          />
        ) : (
          <View></View>
        )}
      </View>

      <AddIconModal modalizeRef={modalizeRef} icon={icon} setIcon={setIcon} />
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: colors.background.main,
      paddingTop: 15,
    },
    buttons: {
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });

AddCategoryScreen.propTypes = {
  catState: PropTypes.object.isRequired,
  addCat: PropTypes.func.isRequired,
  updateCat: PropTypes.func.isRequired,
  deleteCat: PropTypes.func.isRequired,
  rollbackCompleted: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  catState: state.catState,
});

export default connect(mapStateToProps, {
  addCat,
  updateCat,
  deleteCat,
  rollbackCompleted,
})(AddCategoryScreen);
