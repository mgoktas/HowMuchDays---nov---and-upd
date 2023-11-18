import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadTextCst, TextSmall, BottomText } from '../../components/Texts';
import { CustomButton, CustomLgButton } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Space } from '../../components/Utilities';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useApp } from '@realm/react';
import { v4 as uuid } from 'uuid'
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import Realm from 'realm';
import { MMKV } from 'react-native-mmkv'
import { setData } from '../../components/Database/Storage';



const One = () => {
      
    const [signinInProgress, setSigninInProgress] = useState(false)

    const navigation = useNavigation()
    const app = useApp()

    const loginWithGoogle = async () => {

    GoogleSignin.configure({
      androidClientId:
        '33642818548-epnv0vtq5e95ot7pp7n7ke3bc4qvc9p8.apps.googleusercontent.com',
        webClientId:
        '33642818548-daifm33tis2sgr441bf1s31u7kass81e.apps.googleusercontent.com'
    });

    try {


        // Sign into Google
        await GoogleSignin.hasPlayServices();
        const {idToken} = await GoogleSignin.signIn();

        console.log('idToken:', idToken)
        // use Google ID token to sign into Realm
        const credential = Realm.Credentials.google({idToken});
        console.log('credential:',credential)
        
        const user = await app.logIn(credential);
        console.log('user', user);
        
        console.log('signed in as Realm user', user);
        const currentUser = await GoogleSignin.getCurrentUser();
        setData('loggedWith', 'gl')
        navigation.navigate('Tabs', {email: currentUser.user.email})

    } catch (error) {
      // handle errors
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
       console.log(' // user cancelled the login flow')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('// operation (e.g. sign in) is in progress already')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('// play services not available or outdated')
      } else {
        console.log('// some other error happened: ', error)
      }
    } finally {
      setSigninInProgress(false);
    }
    };

    // const loginWithApple = async () => {
    //     // Generate secure, random values for state and nonce
    //     const rawNonce = uuid();
    //     const state = uuid();
      
    //     // Configure the request

    //     try{

    //     appleAuthAndroid.configure({
    //       // The Service ID you registered with Apple
    //       clientId: 'com.hmddays.domain',
      
    //       // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
    //       // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
    //       redirectUri: 'https://secure-stream-76625-3045a9b2f09a.herokuapp.com/apple-auth/callback',
      
    //       // The type of response requested - code, id_token, or both.
    //       responseType: appleAuthAndroid.ResponseType.ALL,
      
    //       // The amount of user information requested from Apple.
    //       scope: appleAuthAndroid.Scope.ALL,
      
    //       // Random nonce value that will be SHA256 hashed before sending to Apple.
    //       nonce: rawNonce,
      
    //       // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
    //       state,
    //     });

    //     const response = await appleAuthAndroid.signIn();
    //     if (response) {
    //         const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
    //         const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
    //         const user = response.user; // Present when user first logs in using appleId
    //         const state = response.state; // A copy of the state value that was passed to the initial request.
    //         console.log("Got auth code", code);
    //         console.log("Got id_token", id_token);
    //         console.log("Got user", user);
    //         console.log("Got state", state);

    //       }

    //     } catch (error) {
    //         console.log(error)
    //       if (error && error.message) {
    //         switch (error.message) {
    //           case appleAuthAndroid.Error.NOT_CONFIGURED:
    //             console.log("appleAuthAndroid not configured yet.");
    //             break;
    //           case appleAuthAndroid.Error.SIGNIN_FAILED:
    //             console.log("Apple signin failed.");
    //             break;
    //           case appleAuthAndroid.Error.SIGNIN_CANCELLED:
    //             console.log("User cancelled Apple signin.");
    //             break;
    //           default:
    //             break;
    //         }
    //       }

    // }
      
    //     // Open the browser window for user sign in
        
      
    //     // Send the authorization code to your backend for verification
    // }

    const loginWithFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile']).then(
          function (result) {
            if (result.isCancelled) {
              console.log('Login cancelled');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const credentials = Realm.Credentials.facebook(
                  data.accessToken.toString(),
                );
                app.logIn(credentials).then(async user => {
                  console.log(`Logged in with id: ${ user.profile}`);
                  setData('loggedWith', 'fb')
                  navigation.navigate('Tabs', {email: user.email})
                });
              });
              console.log(
                'Login success with permissions: ' +
                  result.grantedPermissions.toString(),
              );
            }
          },
          function (error) {
            console.log('Login fail with error: ' + error);
          },
        );
    };

    return  (
        <SafeAreaView style={{backgroundColor: 'black', flex: 1,}}>
            <HeadTextCst value1={'Welcome to HMD?'} />
            <CustomButton text={'Create an Account'} bck={'#f0c117'} onPress={() => {navigation.navigate('Signup')}}/>
            <TextSmall value={'or'} />
            <CustomLgButton onPress={loginWithGoogle} text={'Sign in with Google'} bck={'white'} icon={'google'} />
            <Space space={10}/>
            {/* <CustomLgButton onPress={loginWithApple} text={'Sign in with Apple'} bck={'white'}  icon={'apple'}/>
            <Space space={10}/> */}
            <CustomLgButton onPress={loginWithFacebook} text={'Sign in with Facebook'} bck={'white'} icon={'facebook'} />
            <Space space={10}/>
            <TextSmall value={'already signed up?'} />
            <Space space={10}/>
            <CustomButton onPress={() => {navigation.navigate('Login')}} text={'Sign in'} bck={'white'} />
            <BottomText value={'Remind  Me Later'} onPress={() => {navigation.navigate('Tabs')}}/>
        </SafeAreaView>
)}


export default One;
