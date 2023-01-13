import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from 'types';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import * as Location from 'expo-location';

const Theaters = () => {

    const navigation = useNavigation();
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);

    const getCurrentLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }


    let text = 'Loading...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

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
                <Text style={styles.summaryHeading}>
                    <EvilIcons name="location" size={14} color={Color.purple2} />
                    {' '}
                    Current Position
                </Text>
                <TouchableOpacity onPress={() => getCurrentLocation()} style={{ flexDirection: 'row', justifyContent: 'center' }}><Text style={{ color: Color.purple1, backgroundColor: Color.purple2, textAlign: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>Tap to get current location</Text></TouchableOpacity>
                <Text style={{ textAlign: 'center', marginTop: 10, color: Color.white, }}>{text}</Text>
            </View>

            <View style={styles.summaryView}>
                <Text style={styles.summaryHeading}>
                    <MaterialIcons name="location-searching" size={12} color={Color.purple2} />{' '}
                    Near You
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 10, color: Color.white }}>Empty</Text>
            </View>
        </ScrollView>
    )
}

export default Theaters;

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
})