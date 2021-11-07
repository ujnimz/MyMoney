import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import TextButton from '_components/atoms/TextButton';
import FormTextInput from '_components/atoms/FormTextInput';
import TextSelect from '_components/atoms/TextSelect';
import AddCurrencyModal from '_components/modals/AddCurrencyModal';
// REDUX
import {connect} from 'react-redux';
import {getUser, updateUser} from '_redux/actions/user';

const ProfileScreen = ({
  navigation,
  getUser,
  updateUser,
  userState,
  authState,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const modalizeRef = useRef(null);

  const {isLoading, userData} = userState;

  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    getUser();
    if (userData) {
      setName(userData.name);
      setCurrency(userData.currency);
      setImage(userData.image);
    }

    return () => {
      setName('');
      setCurrency('');
      setImage('');
    };
  }, []);

  const handleUpdateUser = () => {
    updateUser({name, currency, image});
    getUser();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
          <FormTextInput
            value={name}
            onChangeText={val => setName(val)}
            name='name'
            placeholder='Name'
            textContentType='name'
            autoFocus={true}
          />
          <FormTextInput
            value={image}
            onChangeText={val => setImage(val)}
            name='image'
            placeholder='Image'
          />
          <TextSelect
            modalizeRef={modalizeRef}
            onChangeText={val => setCurrency(val)}
            name='currency'
            value={currency}
            placeholder='Select Currency'
          />

          <TextButton
            text='Update'
            bgColor={colors.primary.main}
            textColor={colors.primary.content}
            isAnimating={isLoading}
            onPress={() => handleUpdateUser()}
          />

          <AddCurrencyModal
            modalizeRef={modalizeRef}
            currency={currency}
            setCurrency={setCurrency}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    form: {
      flex: 1,
      paddingTop: 15,
    },
  });

ProfileScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
  userState: state.userState,
});

export default connect(mapStateToProps, {getUser, updateUser})(ProfileScreen);
