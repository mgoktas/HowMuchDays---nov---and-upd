import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/Button';
import { BottomText, ScreenHeaderText } from '../../components/Texts';
import { FormElement } from '../../components/Utilities';


const Login = ({route, navigation}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const app = useApp();
    
    const login = async () => {
        const credentials = Realm.Credentials.emailPassword(
            email,
            password
          );
          try{
              await app.logIn(credentials);
              navigation.navigate('Tabs', {email: email})
            }catch (err) {
                Alert.alert('Security Error',err.message)
            }
        }
        
    return (
    <SafeAreaView style={styles.page}>
        <View>
            <ScreenHeaderText text={'Login'}/>
            <FormElement onChangeText={(txt) => setEmail(txt)} label={'Email address'} none={'none'}/>
            <FormElement onChangeText={(txt) => setPassword(txt)} label={'Password'} none={'none'} secure={true} />
        </View>
        <BottomText value={"Don't have an account?"} color={'#173FEE'} onPress={() => {navigation.navigate('Signup')}}/>
        <CustomButton text={'Sign in'} bck={'#f8f8f8'} onPress={login}/>
    </SafeAreaView>
)}

const styles = StyleSheet.create({
    page : {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between'
    }
})

export default Login;
