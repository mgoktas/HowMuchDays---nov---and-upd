import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

//screens
import Zero from './screens/Front/Zero';
import One from './screens/Front/One';
import Home from './screens/Home/Home';
import Travels from './screens/Home/Travels';
import SplashScreen from './components/SplashScreen';
import SplashScreen2 from 'react-native-splash-screen';

import Icon from 'react-native-vector-icons/Ionicons'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from './screens/Auth/Signup';
import Login from './screens/Auth/Login';
import { TravelRealmContext} from './components/Database/MongoDB';
import { AppProvider, UserProvider } from '@realm/react';
import { Platform } from 'react-native';
import Next from './screens/Auth/Next';

const {RealmProvider} = TravelRealmContext;    

const Stack  = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const Tabs = ({route}: { route: any}) => {

  const email = 'route.params'

  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle:{backgroundColor: 'black'},
          })}
        >
      
      <Tab.Screen  name='Home' component={Home} initialParams={{email: email}}
        options={{tabBarLabel: 'Home', headerShown:false, headerStyle:{backgroundColor: 'black'}, headerTitleStyle:{color:'white'},tabBarLabelStyle:{fontWeight: '800', fontSize: 10},tabBarIcon: ({ color, size }) => (
        <Icon name="home-outline" color={color} size={26} style={{bottom: 0}} />),}}
        />
      
      <Tab.Screen  name='Travels' component={Travels} initialParams={{email: email}} 
        options={{tabBarLabel: 'Travels', headerShown:false, headerStyle:{backgroundColor: 'black'}, headerTitleStyle:{color:'white'},tabBarLabelStyle:{fontWeight: '800', fontSize: 10},tabBarIcon: ({ color, size }) => (
          <Icon name="list-outline" color={color} size={26} style={{bottom: 0}} />),}}
        />
      
    </Tab.Navigator>

  )
}


function App(): JSX.Element {

  useEffect(() => {
    if(Platform.OS == 'android'){
      SplashScreen2.hide()
    }
  },[])

  return (
    <NavigationContainer>
      <AppProvider id={'mdbs-kxcwn'}>
      <RealmProvider>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Zero' component={Zero} />
          <Stack.Screen name='One' component={One} />
          <Stack.Screen name='Next' component={Next} />
          <Stack.Screen name='Tabs' component={Tabs} />
          <Stack.Screen name='Travels' component={Travels} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
      </Stack.Navigator>
      </RealmProvider>
      </AppProvider>
    </NavigationContainer>
    );
}



export default App;

