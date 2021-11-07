import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';
import HomeScreen from '_scenes/HomeScreen';
import SplashScreen from '_scenes/SplashScreen';
import SettingsScreen from '_scenes/SettingsScreen';
import CategoryScreen from '_scenes/CategoryScreen';
import AddCategoryScreen from '_scenes/AddCategoryScreen';
import ProfileScreen from '_scenes/ProfileScreen';
import TermsScreen from '_scenes/TermsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: colors.primary.main},
      }}
    >
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          title: 'My Account',
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
      <Stack.Screen
        name='Categories'
        component={CategoryScreen}
        options={{
          title: 'Categories',
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
      <Stack.Screen
        name='AddCategory'
        component={AddCategoryScreen}
        options={{
          title: 'Add/Edit Category',
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
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: 'Profile Settings',
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
      <Stack.Screen
        name='TermsAndConditions'
        component={TermsScreen}
        options={{
          title: 'Terms and Conditions',
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

export default HomeStack;
