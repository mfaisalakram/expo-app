import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Box from './Box';
import { Color } from 'types';
import { Entypo, Feather } from '@expo/vector-icons';
import { SearchMovies } from 'api';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const SearchBar = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  console.log({ query });
  const toggle = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <View style={styles.wraper}>
      <Box borderColor={Color.purple1} size={height * 0.06}>
        <TouchableOpacity onPress={toggle}>
          <Entypo name="menu" size={24} color={Color.purple2} />
        </TouchableOpacity>
      </Box>
      <View style={[styles.container]}>
        <TextInput
          numberOfLines={1}
          placeholderTextColor={Color.purple2}
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search Films..."
        />
        <TouchableOpacity
          onPress={async () => await SearchMovies(query)}
          style={styles.searchBox}
        >
          <Feather name="search" size={24} color={Color.purple2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wraper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    display: 'flex',
    width: '100%',
    marginTop: height * 0.06,
    zIndex: 10,
  },
  container: {
    width: width * 0.7,
    display: 'flex',
    flexDirection: 'row',
    borderColor: Color.purple1,
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: height * 0.06,
  },
  input: {
    fontSize: 15,
    flex: 1,
    marginRight: 10,
    letterSpacing: 1.3,
    textDecorationLine: 'none',
    borderWidth: 0,
    color: Color.purple2,
    // textShadowColor: Color.purple2,
    // textShadowOffset: {
    //   height: 0.5,
    //   width: 0.5,
    // },
    // textShadowRadius: 3,
  },
  searchBox: {
    backgroundColor: Color.purple1,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
});

export default SearchBar;
