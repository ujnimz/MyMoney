import React, {useRef, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import AddIconModal from '_components/modals/AddIconModal';
import TextButton from '_components/atoms/TextButton';
import FormTextInput from '_components/atoms/FormTextInput';
import IconSelect from '_components/atoms/IconSelect';

const AddIconScreen = ({route}) => {
  const {cat, onSaveCategory} = route.params;
  const [title, setTitle] = useState(cat.title);
  const [icon, setIcon] = useState(cat.icon);

  const {colors} = useTheme();
  const styles = useStyles(colors);

  const modalizeRef = useRef(null);

  const onSave = (title, icon) => {
    let newCat = {id: uuid(), title, icon};
    onSaveCategory(newCat);
  };

  return (
    <SafeAreaView style={styles.container}>
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
        text='Save Category'
        bgColor={colors.primary.main}
        textColor={colors.primary.content}
        onPress={() => onSave(title, icon)}
      />

      <AddIconModal modalizeRef={modalizeRef} icon={icon} setIcon={setIcon} />
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
    inputWrapper: {
      padding: 15,
    },
    iconInputWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.black.main,
      color: colors.text.main,
    },
    iconWrapper: {
      marginLeft: 15,
      padding: 5,
    },
  });

export default AddIconScreen;
