import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import AddIconModal from '_components/modals/AddIconModal';
import TextButton from '_components/atoms/TextButton';
import FormTextInput from '_components/atoms/FormTextInput';
import IconSelect from '_components/atoms/IconSelect';
// REDUX
import {connect} from 'react-redux';
import {addCat, updateCat, rollbackCompleted} from '_redux/actions/category';

const AddCategoryScreen = ({
  route,
  navigation,
  catState,
  addCat,
  updateCat,
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
    await addCat({title, icon});
  };

  const onUpdate = async id => {
    await updateCat({id, title, icon});
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
      <IconSelect
        modalizeRef={modalizeRef}
        icon={icon}
        onChangeText={val => setIcon(val)}
        value={icon}
        placeholder='Category Icon'
        autoCapitalize='none'
      />
      <TextButton
        text={route.params.cat ? 'Update Category' : 'Add Category'}
        bgColor={colors.primary.main}
        textColor={colors.primary.content}
        isAnimating={isLoading}
        onPress={
          route.params.cat ? () => onUpdate(route.params.cat.id) : () => onAdd()
        }
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
  });

AddCategoryScreen.propTypes = {
  catState: PropTypes.object.isRequired,
  addCat: PropTypes.func.isRequired,
  updateCat: PropTypes.func.isRequired,
  rollbackCompleted: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  catState: state.catState,
});

export default connect(mapStateToProps, {addCat, updateCat, rollbackCompleted})(
  AddCategoryScreen,
);
