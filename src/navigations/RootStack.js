import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';
import AppNavTabs from '_navigations/AppNavTabs';
import AddNewScreen from '_scenes/AddNewScreen';
import CategoryListScreen from '_scenes/CategoryListScreen';

const Stack = createStackNavigator();

const RootStack = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='AppNavTabs'
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: colors.primary.main},
      }}
    >
      <Stack.Screen
        name='AppNavTabs'
        component={AppNavTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='AddNew'
        component={AddNewScreen}
        options={{
          headerTitle: 'Add Transaction',
          headerLeft: ({canGoBack, onPress}) =>
            canGoBack && (
              <Ionicons
                name='chevron-back'
                onPress={onPress}
                color={colors.secondary.content}
                size={40}
              />
            ),
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name='CategoryList'
        component={CategoryListScreen}
        options={{
          headerTitle: 'Select Category',
          headerLeft: ({canGoBack, onPress}) =>
            canGoBack && (
              <Ionicons
                name='chevron-back'
                onPress={onPress}
                color={colors.secondary.content}
                size={40}
              />
            ),
          ...TransitionPresets.ModalTransition,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
