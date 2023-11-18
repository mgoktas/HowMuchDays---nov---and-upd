import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { verticalScale } from './Metrics';

export const WatchListIcon = ({
    name, text
}) => (
    <View style={styles.iconCnt}>
       <Icon style={styles.icon} name={name} color={'#f0c117'} size={52} />
       <Text style={styles.text}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({

    iconCnt : {
        alignSelf: 'center',
        marginBottom: verticalScale(30)
    },
    icon : {
        alignSelf: 'center'
    },
    text : {
        fontSize: verticalScale(36),
        color: '#f0c117',
        fontWeight: 600
    }
})