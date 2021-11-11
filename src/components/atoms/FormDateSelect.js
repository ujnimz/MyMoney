import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';

const FormDateSelect = ({handleDateSelect, date, ...rest}) => {
  console.log(date);
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    handleDateSelect(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconInputWrapper}>
        <View style={{flex: 1}}>
          <TextInput
            name='icon'
            value={String(date)}
            style={styles.input}
            placeholderTextColor={colors.text.focus}
            editable={false}
            {...rest}
          />
        </View>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setShow(true)}
        >
          <Ionicons name='add-circle' color={colors.primary.main} size={32} />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          hideText={true}
          value={date}
          is24Hour={true}
          display='default'
          onChange={onDateChange}
        />
      )}
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
  });

export default FormDateSelect;
