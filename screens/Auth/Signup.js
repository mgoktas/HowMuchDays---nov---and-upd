import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomLgButton } from '../../components/Button';
import { BottomText, ScreenHeaderText } from '../../components/Texts';
import { FormElement } from '../../components/Utilities';
import {useApp, useUser} from '@realm/react';
import  Realm  from 'realm';
import { Dog, DogRealmContext } from '../../components/Database/MongoDB';

const Signup = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const app = useApp();
    
    const createAccount = async () => {

        if(name.length < 5 && name.split(' ').length < 2){
            Alert.alert('Security Error','Name should include your surname')
            return
        }
        
        try {
            await app.emailPasswordAuth.registerUser({email, password});
            navigation.navigate('Login')
          } 
          
          catch (err) {
            Alert.alert('Security Error',err.message)
          }
    }
     

    return (
    <SafeAreaView style={styles.page}>
        <View>
        <ScreenHeaderText text={'Create Account'}/>
            <FormElement onChangeText={(txt) => setName(txt)} label={'First and last name'}/>
            <FormElement onChangeText={(txt) => setEmail(txt)} label={'Email address'} none={'none'}/>
            <FormElement onChangeText={(txt) => setPassword(txt)} label={'Password'} none={'none'} secure={true} />
        </View>
        <BottomText value={'Already have an account?'} color={'#173FEE'} onPress={() => {navigation.navigate('Login')}}/>
        <CustomButton onPress={createAccount} text={'Sign up'} bck={'white'}/>
    </SafeAreaView>
)}

const styles = StyleSheet.create({
    page : {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between'
    }
})

export default Signup;
