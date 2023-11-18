import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { horizontalScale, verticalScale } from './Metrics';
import Icon from 'react-native-vector-icons/FontAwesome'

export const ButtonZero = ({
    text, onPress
}) => {

    return (
    <TouchableOpacity style={[styles.btnCtn]} onPress={onPress}>
        <Text style={styles.text}>
            {text}
        </Text>
    </TouchableOpacity>
)}

export const CustomButton = ({
    text, onPress, bck
}) => {

    return (
    <TouchableOpacity style={[styles.btnCtnCst, {backgroundColor : bck}]} onPress={onPress}>
        <Text style={styles.textCst}>
            {text}
        </Text>
    </TouchableOpacity>
)}

export const CustomLgButton = ({
    text, onPress, bck, icon
}) => {

    return (
    <TouchableOpacity style={[styles.btnCtnCstLg, {backgroundColor : bck}]} onPress={onPress}>
        <Icon name={icon} style={styles.iconLg} size={32} color={'#151411'}/>
        <Text style={styles.textCstLg}>
            {text}
        </Text>
    </TouchableOpacity>
)}

const styles = StyleSheet.create({
    btnCtn : {
        marginHorizontal: horizontalScale(40),
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#f0c117',
        borderRadius: 10,
        marginTop: verticalScale(50)
    },
    text : {
        alignSelf: 'center',
        fontSize: 18,
        color: 'black',
        fontWeight: 500
    },
    btnCtnCst : {
        marginHorizontal: horizontalScale(40),
        height: 50,
        justifyContent: 'center',
        borderRadius: 6,
        marginVertical: verticalScale(10),
    },
    btnCtnCstLg : {
        marginHorizontal: horizontalScale(40),
        height: verticalScale(60),
        borderRadius: 6,
        // marginTop: verticalScale(10),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCst : {
        alignSelf: 'center',
        fontSize: 18,
        color: 'black',
        fontWeight: 500
    },
    textCstLg : {
        fontSize: 18,
        color: 'black',
        fontWeight: 500,
        marginStart: horizontalScale(10),
        // bottom: verticalScale(20),
        width: '75%',
        alignSelf: 'center'
    },
    iconLg : {
        // top: verticalScale(14),
        marginStart: horizontalScale(10),
        width: '15%'
    }
})