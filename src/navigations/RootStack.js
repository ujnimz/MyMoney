import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';
import AppNavTabs from '_navigations/AppNavTabs';
import AddTransactionScreen from '_scenes/AddTransactionScreen';
import AddCategoryScreen from '_scenes/AddCategoryScreen';
import CategoryScreen from '_scenes/CategoryScreen';

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
        name='AddTransaction'
        component={AddTransactionScreen}
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
        name='AddCategory'
        component={AddCategoryScreen}
        options={{
          headerTitle: 'Add Category',
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
      <Stack.Screen
        name='EditCategory'
        component={AddCategoryScreen}
        options={{
          headerTitle: 'Edit Category',
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
      <Stack.Screen
        name='SelectCategory'
        component={CategoryScreen}
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
