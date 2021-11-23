import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Alert} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import AddIconModal from '_components/modals/AddIconModal';
import FormButton from '_components/atoms/FormButton';
import FormIconButton from '_components/atoms/FormIconButton';
import FormTextInput from '_components/atoms/FormTextInput';
import FormIconSelect from '_components/atoms/FormIconSelect';
import FormTextSwitch from '_components/atoms/FormTextSwitch';
import AlertPopup from '_components/atoms/AlertPopup';
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

  const [id, setId] = useState(
    route.params?.cat ? route.params.cat.id : undefined,
  );
  const [title, setTitle] = useState(
    route.params?.cat ? route.params.cat.title : '',
  );
  const [icon, setIcon] = useState(
    route.params?.cat ? route.params.cat.icon : '',
  );
  const [type, setType] = useState(
    route.params?.cat ? route.params.cat.type : 'debit',
  );
  // Show or hide alert popup
  const [showAlert, setShowAlert] = useState(false);

  const {isLoading, isCompleted} = catState;

  const modalizeRef = useRef(null);
  // Add a new category
  const onAdd = async () => {
    return await addCat({title, icon, type});
  };
  // Update an exisiting category
  const onUpdate = async () => {
    if (id) {
      await updateCat({id, title, icon, type});
    }
    return;
  };
  // Show alert poup
  const showDialog = () => {
    return setShowAlert(true);
  };
  // Hide alert popup
  const handleCancel = () => {
    return setShowAlert(false);
  };
  // delete category on Delete
  const handleDelete = async () => {
    if (id) {
      await deleteCat(id);
      setId(undefined);
      setShowAlert(false);
    }
    return;
  };

  useEffect(() => {
    if (isCompleted) {
      route.params?.select
        ? navigation.navigate('SelectCategory', {select: true}) // if comes from Select Category screen, go back
        : navigation.navigate('Categories'); // if comes from Category screen, go back
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
      <FormTextSwitch
        options={[
          {option: 'debit', label: 'Debit'},
          {option: 'credit', label: 'Credit'},
        ]}
        selected={type}
        onChange={val => setType(val)}
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
          onPress={route.params?.cat ? () => onUpdate() : () => onAdd()}
        />

        {route.params?.cat ? (
          <FormIconButton
            icon='trash'
            bgColor={colors.primary.main}
            textColor={colors.primary.content}
            isAnimating={isLoading}
            onPress={() => showDialog()}
          />
        ) : (
          <View></View>
        )}
      </View>

      <AlertPopup
        visible={showAlert}
        title='Delete category'
        message={`Are you sure you want to delete ${title} from categories?`}
        handleCancel={handleCancel}
        handleOk={handleDelete}
        okLabel='Delete'
      />

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
