import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';

const FormDateSelect = ({setDate, setTimestamp, date, ...rest}) => {
  const {colors, isDark} = useTheme();
  const styles = useStyles(colors);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(date);
    setTimestamp(new Date(date.toDateString()).getTime() / 1000);
    //console.log(date.toDateString());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconInputWrapper}>
        <View style={{flex: 1}}>
          <TextInput
            name='icon'
            value={date ? date.toDateString() : ''}
            style={styles.input}
            placeholderTextColor={colors.text.focus}
            editable={false}
            {...rest}
          />
        </View>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => showDatePicker()}
        >
          <Ionicons name='calendar' color={colors.primary.main} size={32} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        isDarkModeEnabled={isDark}
        themeVariant={isDark ? 'dark' : 'light'}
      />
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 20,
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
      borderColor: colors.text.focus,
      color: colors.text.main,
    },
    iconWrapper: {
      marginLeft: 10,
      padding: 5,
    },
    datePicker: {
      color: colors.text.main,
      //backgroundColor: 'white',
      padding: 5,
    },
  });

export default FormDateSelect;
