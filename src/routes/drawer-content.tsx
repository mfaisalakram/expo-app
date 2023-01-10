import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Color } from 'types';
interface Props {
  navigation?: any;
}
export type ButtonStylesContext = {
  disabled?: boolean;
};
export function DrawerContent(props: Props) {
  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt: never = {
      name: screen,
      key: undefined,
      params: {},
      merge: undefined,
    } as never;
    navigation.navigate(dt);
  };

  return (
    <View style={styles().container}>

      <DrawerContentScrollView>
        <Text style={styles().heading}>MENU</Text>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('Aboutus')}
        >
          <Feather
            name="alert-circle"
            style={styles().sectionViewIcon}
          />
          <Text style={styles().sectionViewText}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('TeamProfile')}
        >
          <Entypo
            name="users"
            style={styles().sectionViewIcon}
          />
          <Text style={styles().sectionViewText}>
            TV Shows
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('TeamProfile')}
        >
          <Entypo
            name="users"
            style={styles().sectionViewIcon}
          />
          <Text style={styles().sectionViewText}>
            TV Shows
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('TeamProfile')}
        >
          <Entypo
            name="users"
            style={styles().sectionViewIcon}
          />
          <Text style={styles().sectionViewText}>
            Theaters
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('TeamProfile')}
        >
          <Entypo
            name="users"
            style={styles().sectionViewIcon}
          />
          <Text style={styles().sectionViewText}>
            My Favorite
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.purple1,
    },
    heading: {
      fontWeight: 'bold',
      marginTop: '10%',
      marginBottom: '10%',
      color: Color.white,
      marginLeft: '6%',
    },
    TopView: {
      flexDirection: 'row',
      paddingLeft: '5%',
      height: 115,
      backgroundColor: Color.white,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    userNameView: { height: 50, marginTop: '33%', marginLeft: '6%' },
    userName: {
      fontWeight: 'bold',
      color: color,
      fontSize: 16,
    },
    text: { fontSize: 14, color: color, width: '100%' },
    profilePic: {
      width: 70,
      height: 70,
      borderRadius: 50,
      marginTop: '26%',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    sectionView: {
      marginBottom: '10%',
      marginLeft: '6%',
      display: 'flex',
      flexDirection: 'row',
    },
    sectionViewToggle: { top: -10, marginLeft: 10 },
    sectionViewText: {
      color: Color.white,
      fontSize: 14,
      marginLeft: '5%',
      marginTop: 2,
    },
    sectionViewIcon: {
      color: color,
      fontSize: 18,
      marginTop: '1%',
    },
    touchable: {
      marginTop: '5%',
      display: 'flex',
      flexDirection: 'row',
    },
  });
