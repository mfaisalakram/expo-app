import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import { Color } from 'types';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_KEY, POSTER_BASE_URL } from 'config';

const TvShows = () => {
    const navigation = useNavigation();
    const [tvShows, setTvShows] = useState([]);
    const [loader, setLoader] = useState(false);


    const getTvShows = async () => {
        try {
            setLoader(true);
            const res = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en&page=${1}&include_adult=false&append_to_response=videos`)
            if (res.data) {
                setTvShows(res?.data?.results)
                setLoader(false);
            } else {
                setTvShows([])
                setLoader(false);
            }
        } catch (error) {
            console.log(error)
            setLoader(false);
        }
    }

    useEffect(() => {
        getTvShows()
    }, [])


    const Item = ({ image, name, raiting, id, overview }: any) => (
        <TouchableOpacity style={styles.singleView} key={id} onPress={() => navigation.navigate('Detail', { id, tv: true })}>
            <Image source={{ uri: `${POSTER_BASE_URL}${image}` }} style={{ width: '100%', height: '100%' }} blurRadius={0} />

            <View style={styles.absoluteiew}>

                <Text style={styles.raiting}>  {(Math.round(raiting * 100) / 100).toFixed(1)} <AntDesign name="star" size={12} color="black" />

                </Text>

                <Text style={styles.titleText}>
                    {name}
                </Text>

                <Text style={styles.genresText} numberOfLines={2}>{overview}</Text>

            </View>
        </TouchableOpacity>
    )


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Feather name="search" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                </TouchableOpacity>
            </View>


            {loader ?
                <ActivityIndicator
                    size={'large'}
                    color={Color.purple2}
                    style={{ top: '50%' }} /> :
                <View>
                    <View style={styles.summaryView}>
                        <Text style={styles.summaryHeading}>
                            <FontAwesome name="pause" size={12} color={Color.purple2} />{' '}
                            Top Populr Tv Show
                        </Text>







                        <FlatList
                            data={tvShows}
                            renderItem={({ item }) => <Item image={item?.poster_path} raiting={item?.vote_average} name={item?.name} id={item?.id} overview={item?.overview} />}
                            keyExtractor={item => item?.file_path}
                            horizontal={true}
                        />



                    </View>


                </View>
            }







        </View>
    )
}

export default TvShows;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.purple1
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    summaryView: {
        margin: 20,
    },
    summaryHeading: {
        color: Color.white,
        textTransform: 'uppercase',
        marginBottom: 20,
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    summaryText: { color: Color.gray2 },
    singleView: { width: 230, height: 250, backgroundColor: 'gray', marginRight: 10 },
    absoluteiew: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    raiting: {
        backgroundColor: Color.yellow1,
        color: Color.black1,
        paddingRight: 2,
        borderRadius: 2,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    titleText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 21,
        marginVertical: 10,
        width: 200,
        letterSpacing: 1,
    },
    genresText: {
        color: 'gray',
        fontSize: 13,
        width: 200,

    },
})