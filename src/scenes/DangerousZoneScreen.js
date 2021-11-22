import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import FormButton from '_components/atoms/FormButton';
// REDUX
import {connect} from 'react-redux';
import {removeUser} from '_redux/actions/user';

const DangerousZoneScreen = ({removeUser}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const handleDelete = () => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to delete all your data?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: async () => {
            await removeUser();
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
        //isAnimating={isLoading}
        onPress={() => handleDelete()}
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
  authState: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  removeUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.authState,
  userState: state.userState,
});

export default connect(mapStateToProps, {removeUser})(DangerousZoneScreen);
