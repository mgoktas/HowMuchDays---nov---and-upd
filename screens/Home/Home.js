import React, {useState, useEffect, Fragment, useCallback} from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, MyDialog, TextButton } from '../../components/Utilities';
import { CountryCnt, Seperator } from '../../components/Utilities';
import { DatePickerModal } from 'react-native-paper-dates';
import {useApp, useAuth, useUser} from '@realm/react';
import getCountryISO3 from 'country-iso-2-to-3'
import uuid from 'react-native-uuid';
import CountryFlag from 'react-native-country-flag';
import { horizontalScale, verticalScale } from '../../components/Metrics';
import { TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, Provider, Text as Text2 } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Travel, TravelRealmContext } from '../../components/Database/MongoDB';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
import { getDataString } from '../../components/Database/Storage';

const Home = ({route, navigation}) => {

    const [text, setText] = useState('');
    const hasUnsavedChanges = Boolean(text);

    const {email, loggedWith} = route.params; 
    const [myEmail, setMyEmail] = useState(email)
    const [account, setAccount] = useState(getDataString('loggedWith'))

    //hooks
    const [visibleDialogAccount, setVisibleDialogAccount] = useState(false)
    const [visibleDialogAccountDelete, setVisibleDialogAccountDelete] = useState(false)
    const [placeHolder, setPlaceHolder] = useState(false);
    const [isClicked, setIsClicked] = useState(false); 
    const [visible, setVisible] = useState(false); 
    const [adverb, setAdverb] = useState(false);
    const [open, setOpen] = useState(false)

    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [expectancyFrom, setExpectancyFrom] = useState([]);
    const [expectancyGo, setExpectancyGo] = useState([])
    const [countries, setCountries] = useState([]);
    
    const [Txtt, setTxtt] = useState('Change My Country')
    const [goCountry, setGoCountry] = useState(''); 
    
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [myCountry, setMyCountry] = useState({name: 'United States', iso: 'US'});
    const {useRealm, useQuery, useObject} = TravelRealmContext;
    
    const [dayDifferenceNegative, setDayDifferenceNegative] = useState(0)
    const [dayDifference, setDayDifference] = useState(0); 
    
    const [msg, setMsg] = useState()
    
    const realm = useRealm();
    const app = useApp();
    // const user = useUser();
    const travels = useQuery(Travel)
    
    //functions
    const hideDialogAccount = () => setVisibleDialogAccount(false)
    const hideDialogAccountDelete = () => setVisibleDialogAccountDelete(false)
    const showDialogAccount = () => {setVisibleDialogAccount(true); setMsg(''); setFilteredDataSource([])}
    const showDialogAccountDelete = () => {setVisibleDialogAccountDelete(true); setMsg(''); setFilteredDataSource([])}
    const showDialog = () => setVisible(true); 
    const hideDialog = () => setVisible(false);

    useFocusEffect(
    useCallback(() => {
        setMsg('')
        setFilteredDataSource([])
    }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            hideDialog()
        }, [])
    )

    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
            return;
        }
        e.preventDefault();
        }),
    [navigation, hasUnsavedChanges]
    );

    useEffect(() => {
        if(placeHolder) {
            setTxtt('Choose Travel Country')
        } else {
            setTxtt('Change My Country')
        }
    })

    useEffect(() => {
        const dataFetch1 = async () => {
            await fetch('https://api.countrystatecity.in/v1/countries', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSCAPI-KEY': 'UG9lVktzWEswQ3lTSlJEN0tGODRNMkkxZllnTDVzcW5abTFYSm1MQg=='
            },
            })
            .then(response => response.json())
            .then(json => {
                setCountries(json)
            })
            .catch(error => {
                console.error(error);
            });
            }
        dataFetch1()
    },[])

    const dataFetch2 = async (iso) => {
        const isoFrom = getCountryISO3(myCountry.iso)
        const isoGo = getCountryISO3(iso)

        await fetch('https://www.jsonkeeper.com/b/L1ZD', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(async (json) => {
            setExpectancyGo(json.filter(country => country['Country Code'] == isoGo)[0]['2020 [YR2020]'])
            setExpectancyFrom(json.filter(country => country['Country Code'] == isoFrom)[0]['2020 [YR2020]'])
        })
        .catch(error => {
        });
    }

    const searchCountries = (text) => {

        function checkName(item) {
            return item.name != myCountry.name;
        }

        setFilteredDataSource(countries.filter(checkName))
        setMasterDataSource(countries.filter(checkName))
        
        if (text) {
          const newData = masterDataSource.filter(
          function (item, index) {
            const itemData = item.name
                ? item.name.toUpperCase()
                : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
          setFilteredDataSource(newData.filter(checkName));
        } else {
            setTimeout(() => {
                // setIsDisabled(true)
            },500)
            setFilteredDataSource([]);
        }
    };

    const chooseDate = (item) => {
        setFilteredDataSource([item])
        setOpen(true)
    }

    const onDismiss = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = async ({ startDate, endDate }) => {
            await dataFetch2()
            setOpen(false);
            setRange({ startDate, endDate });
            await addToTravels(startDate, endDate)
    }
    
    const addToTravels = async (x, y) => {

        try{

            const ms = y.getTime() - x.getTime()
            const daySubtract = ms / (1000 * 60 * 60 * 24)
    
            const differenceInDays = (daySubtract) * (expectancyGo/expectancyFrom - 1)
    
    
            setDayDifferenceNegative(Math.round(daySubtract))
    
            if(differenceInDays >= 0) {
                setAdverb('for more')
                setDayDifference(Math.round(differenceInDays))
            } else {
                setAdverb('less')
                setDayDifference(Math.round(-differenceInDays))
            }
    
    
            realm.write(() => {
                realm.create('Travel', {
                    _id: uuid.v4(),
                    useremail: email,
                    from: myCountry.name,
                    to: goCountry,
                    startdate: x,
                    enddate: y,
                    lifeexpectancy: Math.round(differenceInDays)
                });
            });
            showDialog()
        
        }
        
        catch(err) {
            Alert.alert('Information Error', 'Please make sure to choose the start and the end date for your trip.')
        }
        

        setMsg('')
        setFilteredDataSource([])
        setRange({ startDate: undefined, endDate: undefined });

    }

    // const user = useUser();
    const {logOut} = useAuth()

    const logOutAll = async () => {


        if(account == 'gl'){
            GoogleSignin.configure({
                androidClientId:
                  '33642818548-epnv0vtq5e95ot7pp7n7ke3bc4qvc9p8.apps.googleusercontent.com',
                  webClientId:
                  '33642818548-daifm33tis2sgr441bf1s31u7kass81e.apps.googleusercontent.com'
              });
    
            try {
    
                await GoogleSignin.signOut();
                await logOut();
    
                navigation.navigate('Zero')
    
            } catch(err) {
                console.log(err)
            }
        } 
        if(account == 'fb'){
            
            try {
    
                LoginManager.logOut()
                await logOut();
    
                navigation.navigate('Zero')
    
            } catch(err) {
                console.log(err)
            }
        }


    }

    const deleteAccount = async () => {

        const currentUserTravels = travels.filtered(`useremail == '${email}'`)
            realm.write(() => {
              realm.delete(currentUserTravels);
        });

        await app.deleteUser(app.currentUser);
        await logOutAll()
        await navigation.navigate('Zero')
    }

    const changeCountry = (item) => {
        setMyCountry({name: item.name, iso: item.iso2});
    }

    const chooseCountry = (item) => {
        setIsClicked(true); 
        setGoCountry(item.name); 
        dataFetch2(item.iso2); 
        chooseDate(item)
    }

    return (
        <SafeAreaView style={styles.page}>
            <Header title={'Home'} color={'black'} />
            <View style={styles.textInputCnt}>
                <TextInput autoCapitalize='words' value={msg} placeholder={placeHolder ? 'Select your country' : 'Where do you want to go?'} onChangeText={(text) => {searchCountries(text); setMsg(text)}} ref={input => { this.textInput = input }} style={styles.textInput}>
                
                </TextInput>
            </View>
            <View style={{opacity: isClicked ? 1 : 1, }}>
                <ScrollView>
            {
                filteredDataSource.slice(0, 20).map((item, index) => (
                    <Fragment  key={index}>
                            <CountryCnt style={{borderTopLeftRadius: index == 0 ? 10 : 0, borderTopRightRadius: index == 0 ? 10 : 0,borderBottomLeftRadius: index == (filteredDataSource.length -1) ? 10 : 0, borderBottomRightRadius: index  == (filteredDataSource.length -1) ? 10 : 0}} txt={item.name} onPress={() => {setMsg(item.name); 
                                if(placeHolder){changeCountry(item)} 
                                else {chooseCountry(item)}}}
                                />
                    </Fragment>
                ))
            }
                </ScrollView>
            </View>
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                            <DatePickerModal
                            locale="en"
                            type
                            mode="range"
                            visible={open}
                            onDismiss={onDismiss}
                            startDate={range.startDate}
                            endDate={range.endDate}
                            onConfirm={onConfirm}
                            />
            </View>
            <Provider theme={{colors: {background: 'transparent', elevation: {level3: 'white'}}}} >
            <View>
                <Portal>
                <Dialog style={styles.provider} visible={visible} onDismiss={hideDialog}>
                    <View style={{flexDirection: 'column', marginHorizontal: horizontalScale(20)}}>
                    <Text style={{fontSize: 18, marginVertical: verticalScale(10), alignSelf: 'center', bottom: verticalScale(10)}}>You are travelling</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 12, alignSelf: 'center'}}>from</Text> 
                        <Text style={{fontSize: 20}}> {myCountry.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: verticalScale(20)}}>
                        <Text style={{fontSize: 12, alignSelf: 'center'}}>to</Text> 
                        <Text style={{fontSize: 20}}> {goCountry}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: verticalScale(10)}}>
                        <Text style={{fontSize: 12, alignSelf: 'center'}}>If you stay there for <Text>
                        <Text style={{fontSize: 20}}>{dayDifferenceNegative}</Text>
                        </Text> days</Text> 
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: verticalScale(20)}}>
                        <Text style={{fontSize: 12, alignSelf: 'center'}}>you are expected to live <Text>
                        
                        </Text>{adverb} <Text style={{fontSize: 20}}>{dayDifference} </Text>days
                        </Text> 

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
            <MyDialog title={'Do you want to log out?'} visible={visibleDialogAccount} hideDialog={hideDialogAccount} onPressYes={logOutAll} />
            <MyDialog title={'Log out and delete my account.'} visible={visibleDialogAccountDelete} hideDialog={hideDialogAccountDelete} onPressYes={deleteAccount}/>
            <View style={{opacity: visibleDialogAccount || visibleDialogAccountDelete ? 0 : 1}}>
                <View style={styles.myCountryCnt}>
                    <View>
                    <Text style={styles.myCountryText}>My Country >>> </Text>
                        <TouchableOpacity  onPress={() => {
                            placeHolder ? setPlaceHolder(false) : setPlaceHolder(true)
                        }}>
                            <Text style={[styles.myCountryTextChng, {color: placeHolder ? 'red' : '#6464EF'}]}>{Txtt}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                    <CountryFlag  style={styles.flagCnt} isoCode={myCountry.iso} size={42}/>
                    </TouchableOpacity>
                </View>
                <TextButton txt={'Change Account'} color={'#B2A496'} onPress={showDialogAccount} />
                <TextButton txt={'Delete Account'} color={'red'} onPress={showDialogAccountDelete} />
            </View>
        </SafeAreaView>
)};

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'black',
        flex: 1
    },
    provider: {
        position: 'relative',
        bottom: verticalScale(150),
        marginBottom: 0,
        paddingBottom: 0,
        height: verticalScale(400)
    },
    myCountryCnt : {
        marginHorizontal: horizontalScale(50),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    myCountryText: {
      fontSize: 24,
      color: 'white'
    },
    myCountryTextChng : {
        marginVertical: verticalScale(10),
        color: '#1524CB'
    },
    flagCnt : {
        borderWidth: 3
    },
    textInputCnt : {
        marginHorizontal: verticalScale(20),
        height: 50,
        marginVertical: verticalScale(30),
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 20,
        fontWeight: '400',
        marginHorizontal: horizontalScale(10),
    },
})

export default Home;


