import { Booking, Detail, Home } from '@screen';
import React from 'react';
import Animated from 'react-native-reanimated';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './drawer-content';
const Screen = createSharedElementStackNavigator<StackHome>();

export function springyFadeIn() {
  const transitionSpec = {
    timing: Animated.spring,
    tension: 10,
    useNativeDriver: true
  };

  return {
    transitionSpec,
    screenInterpolator: ({ position, scene }: any) => {
      const { index } = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1]
      });

      return { opacity };
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10
  }
};

export const HomeStack = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      drawerStyle: {
        width: 300,
      },
      headerTintColor: '#000',
      headerShown: false,
    }}
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Detail" component={Detail} options={{ headerShown: false }} /> */}
    </Drawer.Navigator>
  );
};
