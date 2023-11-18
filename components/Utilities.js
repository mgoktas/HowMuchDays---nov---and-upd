import { useNavigation } from '@react-navigation/native';
import { useApp } from '@realm/react';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { horizontalScale, verticalScale } from './Metrics';
import { Button, Dialog, Portal, Provider, Text as Text2 } from 'react-native-paper';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')

export const Space = ({space}) => (
    <View style={{marginVertical: verticalScale(space)}}>
    </View>
);

export const InputHome = React.forwardRef((props, ref) => {
  return (
    <View style={styles.textInputCnt}>
        <TextInput ref={input => { this.textInput = input }} style={styles.textInput}>
        
        </TextInput>
    </View>
)}
);

export const CountryCnt = ({txt, onPress, country, style }) => {


    return (
      <TouchableOpacity onPress={onPress} style={[styles.countryCnt, style]}>
        <View style={[styles.countryCnt]}>
            <Text style={{top:10, right:5, fontWeight:500, fontSize: 14, color: '#766E6E'}}>{txt}</Text>
            <Text style={{top: 10, fontWeight:600, fontSize: 12, opacity: .8}}>{country}</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

export const Seperator = ({margin}) => {
    return (
        <View style={[styles.seperator, {marginHorizontal: margin}]}>

        </View>
    )
}  

export const HistoryCnt = ({onPress, from, to, start, end, increase, style }) => {


    return (
      <TouchableOpacity onPress={onPress} style={[ style, {flexDirection: 'row'}]}>
        <View style={[styles.historyCnt, style]}>
        <View style={styles.historyCntTextCnt1}>
          <Text style={styles.historyCntTextSmall}>from: </Text>
          <Text style={styles.historyCntText}>{from}</Text>
        </View>
         <View style={styles.historyCntTextCntInc}>
          <Text style={styles.historyCntTextDurationInc}>{increase} days</Text>
        </View>
        <View style={styles.historyCntTextCntTime}>
          <Text style={styles.historyCntTextDuration}>{start} - {end}</Text>
        </View>
        <View style={styles.historyCntTextCnt2}>
          <Text style={styles.historyCntTextSmall}>to: </Text>
          <Text style={styles.historyCntText}>{to}</Text>
        </View>
        </View>
        <View style={styles.seperatorTravels}>

        </View>
      </TouchableOpacity>
    )
  }

export const FormElement = ({onChangeText, label, none, secure, autoComplete}) => {

  return (
    <View style={styles.formCnt}>
      <Text style={styles.formText}>
            {label}
      </Text>
      <View style={styles.formElementCnt}>
        <TextInput autoCapitalize={none} autoComplete={autoComplete} style={styles.formTextInput} secureTextEntry={secure} onChangeText={onChangeText} placeholder={''}>
        </TextInput>
      </View>
    </View>
  )
}

export const MyCountry = ({iso}) => {
  <View style={styles.myCountryCnt}>
    <Text style={styles.myCountryText}>I'm in </Text>
  </View>
}

export const Header = ({title, button, onPress, zindex, opacity, color}) => {
  return (
      <View style={[styles.header, {backgroundColor: color}]}>
        <Text style={styles.haederText1}></Text>
        <Text style={styles.haederText2}>{title}</Text>
        <TouchableOpacity style={[styles.headerButtonCnt, {zIndex: zindex, opacity: opacity}]} onPress={onPress}>
          <Text style={styles.headerButton}>{button}</Text>
        </TouchableOpacity>
      </View>
    )}

export const HeaderButton = ({button, onPress, opacity, zindex, color}) => {
  return (
    <TouchableOpacity style={[styles.headerButtonCnt2, {opacity: opacity, zIndex: zindex}]} onPress={onPress}>
          <Text style={[styles.headerButton2, {color: color}]}>{button}</Text>
    </TouchableOpacity>
  )
}   

export const TextButton = ({onPress, txt, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.myCountryAccountCnt}>
        <Text style={[styles.myCountryAccountChng, {color: color}]}>{txt}</Text>
    </TouchableOpacity>
  )
}

export const MyDialog = ({visible, hideDialog, onPressYes, title}) => {

  return (
    <Provider theme={{colors: {background: 'transparent', elevation: {level3: 'white'}}}}>
    <Portal>
        <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={hideDialog} style={{marginStart: 40, padding: 5, paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 5, borderWidth: 1.2,}}><Text style={{color: 'black'}}>No</Text></TouchableOpacity>
              <TouchableOpacity onPress={onPressYes} style={{marginEnd: 40, padding: 5, paddingHorizontal: 20, backgroundColor: 'black', borderRadius: 5, borderWidth: 1.2,}}><Text style={{color: 'white'}}>Yes</Text></TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  )
}

export const InfoDialog = ({visible, hideDialog, onPressYes}) => {

  return (
    <Provider theme={{colors: {background: 'transparent', elevation: {level3: 'white'}}}} >
      <View>
          <Portal>
          <Dialog style={styles.provider} visible={visible} onDismiss={hideDialog}>
              <View style={{flexDirection: 'column', marginHorizontal: horizontalScale(20)}}>
              <Text style={styles.dialogTitle}>You are travelling</Text>
              <View style={{flexDirection: 'row'}}>
                  <Text style={styles.dialogFrontText}>from</Text> 
                  <Text style={{fontSize: 20}}> {myCountry.name}</Text>
              </View>
              <View style={styles.dialogRowCnt}>
                  <Text style={styles.dialogFrontText}>to</Text> 
                  <Text style={{fontSize: 20}}> {goCountry}</Text>
              </View>
              <View style={styles.dialogRowCnt}>
                  <Text style={styles.dialogFrontText}>If you stay there for <Text>
                  <Text style={{fontSize: 20}}>{dayDifferenceNegative}</Text>
                  </Text>days</Text> 
              </View>
              <View style={styles.dialogRowCnt}>
                  <Text style={styles.dialogFrontText}>you are expected to live <Text>
                  </Text>{adverb} <Text style={{fontSize: 20}}>{dayDifference} </Text>days</Text> 
              </View>
              </View>
              <Dialog.Title>
                  ENJOY YOUR HOLIDAY!
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={hideDialog} textColor={'blue'}>Thank You!</Button>
              </Dialog.Actions>
          </Dialog>
          </Portal>
      </View>
    </Provider>
  )
}

export const TextEmpty = ({txt}) => {
  return (
    <View st>
      <Text color={'white'}>
        {txt}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
    textInputCnt : {
        marginHorizontal: verticalScale(20),
        height: 50,
        marginVertical: verticalScale(30),
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 24,
        fontWeight: '400'
    },
    countryCnt: {
        backgroundColor: '#212121',
        borderRadius: 1,
        borderColor: 'transparent',
        fontSize: 24,
        paddingHorizontal:20,
        height: 40,
        flexDirection: 'column',
        marginHorizontal: 20
      },
      historyCnt: {
        backgroundColor: '#212121',
        borderRadius: 0,
        color: '#161617',
        borderColor: 'transparent',
        fontSize: 24,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      historyCntTextCnt1: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '25%',
        marginStart: horizontalScale(5)
      },
      historyCntTextCnt2: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '30%'
      },
      historyCntTextCntTime: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '30%'
      },
      historyCntTextCntInc: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '20%',
        fontWeight: 700,
        fontSize: 10
      },
      historyCntTextSmall: {
        alignSelf: 'center',
        fontSize: 12,
        marginEnd: verticalScale(10),
        top: verticalScale(5),
        opacity: .7,
        color: 'white'
      },
      historyCntText: {
        color: 'white',
        width: '60%',
        fontWeight: 500,
        fontSize: horizontalScale(13)
      },
      historyCntTextDuration: {
        alignSelf: 'center',
        fontSize: 10,
        top: verticalScale(5),
        opacity: .9,
        color: 'white'
      },
      historyCntTextDurationInc: {
        alignSelf: 'center',
        fontSize: 10,
        top: verticalScale(3),
        opacity: .7,
        color: 'white',
        fontWeight: 800,
        bottom: 10,
        marginStart: horizontalScale(10)
      },
      seperator : {
        height: 10,
        color: 'gray'
      },
      formCnt : {
        marginHorizontal: verticalScale(20),
        marginVertical: verticalScale(10),
      },
      formElementCnt : {
        height: 50,
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        justifyContent: 'center'
    },
      formTextInput : {
        fontSize: 24,
        fontWeight: '400'
      },
      formText : {
       color: 'white',
       fontWeight: 500,
       fontSize: 22,
       alignSelf: 'center',
       marginVertical: verticalScale(10),
       opacity: .9
      },
      myCountryCnt : {
      },
      myCountryText: {
        fontSize: 42,
      },
      header: {
        height: 65,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#212121',
        borderBottomWidth: .2,
        borderColor: 'gray',
      },
      haederText1: {
        color: 'white',
        fontSize: 17,
        fontWeight: 600,
        alignSelf: 'center',
        top: 9,
        width: '45%'
      },
      haederText2: {
        color: 'white',
        fontSize: 17,
        fontWeight: 600,
        alignSelf: 'center',
        top: 7,
        width: '33%'
      },
      headerButtonCnt: {
      color: '#1640EA', 
      fontSize: 15, 
      marginEnd: horizontalScale(10),
      width: '33%',
      marginTop: 32,
      left: 40
      },
      headerButton: {
        color: '#1640EA', 
        fontSize: 15, 
      },
      headerButtonCnt2: {
        color: '#1640EA', 
        fontSize: 15, 
        backgroundColor: 'transparent',
        position: 'absolute',
        height: 120,
        left: 20,
        justifyContent: 'center'
      },
      headerButton2: {
        color: 'red', 
        fontSize: 15, 
      },
      myCountryAccountCnt: {
        marginHorizontal: horizontalScale(50),
        flexDirection: 'row',
        justifyContent: 'space-between'
        },
      myCountryAccountChng : {
        marginVertical: verticalScale(10),
        color: '#B2A496'
      },
      dialog: {
      position: 'absolute',
      opacity: 2,
      zIndex: 2,
      width: SCREEN_WIDTH/ 1.2,
      alignSelf: 'center',
      backgroundColor: '#D8D3D0',
      bottom: SCREEN_HEIGHT / 7
      },
      dialogTitle : {
        fontSize: 18, 
        marginVertical: 
        verticalScale(10), 
        alignSelf: 'center', 
        bottom: verticalScale(10)
      },
      dialogRowCnt: {
        flexDirection: 'row', 
        marginBottom: verticalScale(20)
      },
      dialogFrontText : {
        fontSize: 12, 
        alignSelf: 'center'
      }
      
})