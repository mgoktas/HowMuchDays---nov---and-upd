import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { horizontalScale, verticalScale } from './Metrics';

export const HeadText = ({
    value1, value2, value3, value4, style
}) => (
    <View style={[styles.headTxtCnt, style]}>
        <Text style={styles.headTxt}>{value1}</Text>
        <Text style={styles.headTxt}>{value2}</Text>
        <Text style={styles.headTxt}>{value3}</Text>
        <Text style={styles.headTxt}>{value4}</Text>
    </View>
);

export const HeadTextCst = ({
    value1, value2, value3, style
}) => (
    <View style={[styles.headTxtCntCst, style]}>
        <Text style={styles.headTxt}>{value1}</Text>
    </View>
);

export const TextSmall = ({
    value
}) => (
    <View style={[styles.txtCnt]}>
        <Text style={styles.txt}>{value}</Text>
    </View>
);

export const BottomText = ({
    value, onPress, color
}) => (
    <TouchableOpacity style={[styles.txtBtmCnt]} onPress={onPress}>
        <Text style={[styles.txtBtm, {color : color}]}>{value}</Text>
    </TouchableOpacity>
);

export const ScreenHeaderText = ({text}) => {

    return (
        <View style={styles.screenHeaderTextCnt}>
            <Text style={styles.screenHeaderText}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headTxt : {
        fontSize: 28,
        fontWeight: 500,
        color: '#f0c117',
        alignSelf: 'center',
    },
    headTxtCnt : {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: verticalScale(50)
    },
    headTxtCntCst : {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: verticalScale(0)
    },
    txtCnt: {
        marginVertical: verticalScale(10)
    },
    txt : {
        alignSelf: 'center',
        color: 'white'
    },
    txtBtmCnt: {
        marginVertical: verticalScale(10),
        justifyContent: 'center',
        marginTop: 'auto'
    },
    txtBtm : {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 400,
        fontSize: 20
    },
    screenHeaderText:{
        fontSize: horizontalScale(40),
        fontWeight: 500,
        color: 'white'
    },
    screenHeaderTextCnt: {
        marginStart: horizontalScale(42),
        marginVertical: verticalScale(42)
    }

})
