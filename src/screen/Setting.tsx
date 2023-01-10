import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Color } from 'types';

const { width } = Dimensions.get('screen');

type SettingStack = StackScreenProps<StackHome<object, ItemsProps>, 'Booking'>;

const Setting: React.FC<SettingStack> = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Color.purple1 }}>
      <Text style={{ color: '#fff' }}>Setting</Text>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});
