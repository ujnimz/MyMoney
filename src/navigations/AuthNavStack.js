import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';
import LoginScreen from '_scenes/LoginScreen';
import RegisterScreen from '_scenes/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavStack = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.primary.main,
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerLeft: ({canGoBack, onPress}) =>
            canGoBack && (
              <Ionicons
                name='chevron-back'
                onPress={onPress}
                color={colors.secondary.content}
                size={40}
              />
            ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavStack;
