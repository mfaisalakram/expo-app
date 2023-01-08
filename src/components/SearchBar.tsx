import React,{ useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import {Search,Menu} from '../../assets/svg/svg';
import Box from './Box';
import { Color } from 'types';
import { Entypo ,Feather} from '@expo/vector-icons';
import { SearchMovies } from 'api';

const { width, height } = Dimensions.get('screen');

const SearchBar = () => {
  const [query,setQuery] = useState('')
  console.log({query});
  
  return (
    <View style={styles.wraper}>
      <Box borderColor={Color.white} size={height * 0.06}>
        <TouchableOpacity onPress ={() =>{console.log('hello')
        }}>
        <Entypo name="menu" size={24} color="white" />
        </TouchableOpacity>
      </Box>
      <View style={[styles.container]}>
        <TextInput
          numberOfLines={1}
          allowFontScaling
          placeholderTextColor={Color.white}
          style={styles.input}
          value = {query}
          onChangeText = {setQuery}
          placeholder="Search Films..."
        />
        <TouchableOpacity onPress ={async() =>await SearchMovies(query)}>
        <Feather name="search" size={24} color="white" />
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
    borderColor: '#FFFFFF',
    borderWidth: 1,
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
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {
      height: 1,
      width: 1,
    },
    textShadowRadius: 3,
  },
});

export default SearchBar;
