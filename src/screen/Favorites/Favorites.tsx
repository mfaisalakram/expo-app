import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from 'types';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';


const Favorites = () => {

    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Feather name="search" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.summaryView}>

                {/* <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: 'Actor', value: 'actor' },
                        { label: 'Movies', value: 'movies' },
                        { label: 'TV Shows', value: 'tvshow' },
                    ]}
                /> */}

                <Text style={{ color: Color.white, width: 200, textAlign: 'center' }}>You don't save anything, Let's explore now!</Text>
            </View>


        </ScrollView>
    )
}

export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.purple1,
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    summaryView: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
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
})