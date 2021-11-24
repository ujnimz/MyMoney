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
import FormButton from '_components/atoms/FormButton';
import FormTextInput from '_components/atoms/FormTextInput';
import FormTextSelect from '_components/atoms/FormTextSelect';
import AddCurrencyModal from '_components/modals/AddCurrencyModal';
// REDUX
import {connect} from 'react-redux';
import {getUser, updateUser} from '_redux/actions/user';

const ProfileScreen = ({getUser, updateUser, userState}) => {
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
          <FormTextSelect
            modalizeRef={modalizeRef}
            onChangeText={val => setCurrency(val)}
            name='currency'
            value={currency}
            placeholder='Select Currency'
          />

          <FormButton
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
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

ProfileScreen.propTypes = {
  userState: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userState: state.userState,
});

export default connect(mapStateToProps, {getUser, updateUser})(ProfileScreen);
