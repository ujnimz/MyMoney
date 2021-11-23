import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import FormButton from '_components/atoms/FormButton';
import AlertInputPopup from '_components/atoms/AlertInputPopup';
// REDUX
import {connect} from 'react-redux';
import {removeUser} from '_redux/actions/user';

const DangerousZoneScreen = ({userState, removeUser}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const {isLoading} = userState;

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    return setVisible(false);
  };

  const handleDelete = async () => {
    // ...Your logic
    if (password !== '') {
      setIsError(false);
      await removeUser(password);
      setVisible(false);
      setPassword('');
    } else {
      setIsError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>We will miss you!</Text>

      <Text style={styles.text}>
        When you delete your account, you will also loose all your transaction
        data.
      </Text>
      <Text style={styles.text}>
        We do not keep any data of yours after deletion.
      </Text>

      <FormButton
        text='Delete My Account'
        bgColor={colors.primary.main}
        textColor={colors.primary.content}
        isAnimating={isLoading}
        onPress={() => showDialog()}
      />

      <AlertInputPopup
        visible={visible}
        title='Account delete'
        message='Do you want to delete this account? You cannot undo this action.'
        inputValue={password}
        setInputValue={setPassword}
        isError={isError}
        handleCancel={handleCancel}
        handleOk={handleDelete}
        okLabel='Delete'
      />
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
      padding: 15,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 15,
      marginTop: 15,
      color: colors.text.main,
    },
    text: {
      fontSize: 14,
      marginBottom: 15,
      color: colors.text.main,
    },
  });

DangerousZoneScreen.propTypes = {
  userState: PropTypes.object.isRequired,
  removeUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userState: state.userState,
});

export default connect(mapStateToProps, {removeUser})(DangerousZoneScreen);
