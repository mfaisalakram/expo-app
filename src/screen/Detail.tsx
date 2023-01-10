import React, { useEffect, useState } from 'react';

import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import axios from 'axios';
import { API_KEY, POSTER_BASE_URL } from '@config';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { Color } from 'typed';

type DetailStack = StackScreenProps<StackHome<any, any, ItemsProps>, 'Detail'>;

const Detail: React.FC<DetailStack> = ({ route }) => {
  const params = route.params;
  const [movieDetail, setMovieDetail] = useState<any>({});
  const [loader, setLoader] = useState(false)

  const getMovieDetail = async (movieId: any) => {
    try {
      setLoader(true)
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&append_to_response=videos,credits`)
      if (response.data) {
        setLoader(false)
        setMovieDetail(() => response.data)
      }
      else {
        setLoader(false)
      }
    }
    catch (err) {
      setLoader(false)
    }
  }
  useEffect(() => {
    getMovieDetail(params?.key);
  }, [params?.key])



  return (
    <View style={[styles.root]}>
      {loader ? <ActivityIndicator size={'large'} style={{ top: '50%' }} /> :
        <>
          <SharedElement
            style={[{ flex: 1, borderBottomLeftRadius: 35, borderBottomRightRadius: 35, overflow: 'hidden' }]}
            id={`item.${params?.title}.card`}
          >
            <Image source={{ uri: `${POSTER_BASE_URL}${movieDetail?.poster_path}` }} resizeMode="cover" style={styles.img} />
            <View style={{ position: 'absolute', bottom: 20, left: 20, }}>
              <>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={styles.yearText}>2022</Text>
                  <Text style={styles.yearRaiting}>3.8 <AntDesign name="star" size={12} color="black" /></Text>
                </View>
                <Text style={styles.titleText}>{movieDetail?.original_title}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  {movieDetail?.genres?.map(({ name, id }: any) => (
                    <TouchableOpacity style={styles.genresTouch}>
                      <Text style={styles.genresText}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            </View>
          </SharedElement>
          <ScrollView style={styles.slider} >

            <View style={styles.summaryView}>
              <Text style={styles.summaryHeading}><FontAwesome name="pause" size={12} color={Color.purple2} /> Summary</Text>
              <Text style={styles.summaryText}>{movieDetail?.overview}</Text>
            </View>

            <View style={styles.summaryView}>
              <Text style={styles.summaryHeading}><FontAwesome name="pause" size={12} color={Color.purple2} /> Review</Text>
              <Text style={styles.summaryText}>{movieDetail?.overview}</Text>
            </View>

            <View style={styles.summaryView}>
              <Text style={styles.summaryHeading}><FontAwesome name="pause" size={12} color={Color.purple2} /> Cast</Text>
              <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>

                {movieDetail?.credits?.cast?.map(({ profile_path, known_for_department, name }: any) => {
                  return <View style={styles.actorCard}>
                    <View style={{ backgroundColor: Color.gray2 }}>
                      <Image source={{ uri: profile_path ? `${POSTER_BASE_URL}${profile_path}` : `fefwefwefew` }} style={styles.actorImage} />
                    </View>
                    <Text style={styles.actorNameText}>{name}</Text>
                    <Text style={styles.actorDepartmentText}>{known_for_department}</Text>
                  </View>
                })}
              </ScrollView>
            </View>

            <View style={styles.summaryView}>
              <Text style={styles.summaryHeading}><FontAwesome name="pause" size={12} color={Color.purple2} /> You May Linke</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={{ uri: `https://m.media-amazon.com/images/M/MV5BNzU4NWEwNDItMzMzYy00ZDYyLWIxZjMtMDlkYWVjNjQwYzBjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg` }} resizeMode="cover" style={{ width: 80, height: 80, marginRight: 10 }} />
                  <View>
                    <Text style={{ color: Color.white }}>Title of move</Text>
                    <Text style={{ color: Color.gray2 }}>2202 dat now you are</Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.movieRaiting}>3.8 <AntDesign name="star" size={12} color="black" /></Text>
                </View>

              </View>
            </View>



          </ScrollView></>}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Color.purple1, padding: 2 },
  img: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  slider: {
    flex: 1,
    backgroundColor: Color.purple1
  },
  titleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 20
  },
  yearText: { backgroundColor: Color.white, color: Color.black1, marginHorizontal: 5, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 2 },
  yearRaiting: { backgroundColor: Color.yellow1, color: Color.black1, marginHorizontal: 5, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 2 },
  genresTouch: {
    backgroundColor: Color.purple1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 2
  },
  genresText: {
    color: Color.white,
    fontSize: 10,
  },
  summaryView: {
    margin: 20,
  },
  summaryHeading: { color: Color.white, textTransform: 'uppercase', marginBottom: 20, fontSize: 16, letterSpacing: 1, fontWeight: 'bold' },
  summaryText: { color: Color.gray2 },
  actorCard: {
    marginHorizontal: 10,
  },
  actorImage: {
    width: 100,
    height: 120
  },
  actorDepartmentText: {
    color: Color.purple2
  },
  actorNameText: {
    color: Color.white
  },
  movieRaiting: { backgroundColor: Color.yellow1, color: Color.black1, marginHorizontal: 5, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 2, },

});
