import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, HeaderButton, HistoryCnt, Seperator, Seperator2, Space, TextEmpty } from '../../components/Utilities';
import { Travel, TravelRealmContext } from '../../components/Database/MongoDB';
import { useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import {  Dialog, Portal, Provider, Text as Text2 } from 'react-native-paper';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyTravels = [
    {from: 'China', to: 'Japan', duration: '21 days'},
    {from: 'China', to: 'Turkey', duration: '21 days'},
    {from: 'China', to: 'India', duration: '21 days'},
    {from: 'China', to: 'Korea', duration: '42 days'},
]

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')

const Travels = ({route, navigation}) => {

    const {email} = route.params

    const [allTravels, setAllTravels] = useState([])
    const [myCountry, setMyCountry] = useState('Turkey')
    const swipeableRef = useRef(null);

    const dataFetch = async () => {
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

    const {useRealm, useQuery, useObject} = TravelRealmContext;
    const realm = useRealm()
    const travels = useQuery(Travel)
    const[deleted, setDeleted] = useState(false)

    
    useFocusEffect(
      React.useCallback(() => {
        getData();
        setIsDelete(false)
        setIsDelete2(false)
        setVisible(false)
      }, [])
    );

    const getData = async () => {
      try {
          setAllTravels([])
            travels.map((item, index) => {
              if(item.useremail == email && item.useremail.length > 10){
                setAllTravels(arr => [...arr, {from: item.from, to: item.to, start: item.startdate.toLocaleString().split(',')[0], end: item.enddate.toLocaleString().split(',')[0], increase: item.lifeexpectancy, id: item._id}])
            }})
          }
        catch(e) {
          alert(e)
        }
      }

    const [count, setCount] = useState(5)

    const [visibleInfo, setVisibleInfo] = React.useState(false); 


    useEffect(() => {
        if(visibleInfo){
        if(count >=1 ){
        setTimeout(() => {
            setCount(count-1)
        }, 1000)} else {
            hideDialogInfo()
        }}
    })

    const hideDialogInfo = () => {
        setVisibleInfo(false);
        getData();
        setIsDelete(false)
        setIsDelete2(false)
    };

    const [visible, setVisible] = React.useState(false); 
    const showDialog = () => setVisible(true); 
    const hideDialog = () => {
        setVisible(false);
        getData();
        setIsDelete(false)
        setIsDelete2(false)
    };
    

    const [isDelete, setIsDelete] = useState(false)
    const [isDelete2, setIsDelete2] = useState(false)

    const deleteActive = () => {
        setIsDelete(true)
        setIsDelete2(true)
    }

    const deleteAll = () => {
        showDialog()
        setIsDelete2(false)
    }

    const deleteAllOfTravels = async () => {
      setAllTravels([])
      hideDialog()
      // showDialogInfo()
      setDeleted(true)
      await navigation.navigate('Home', {email: email})
      realm.write(() => {
          realm.delete(travels);
      });
    }

    const deleteItemNew = ({ item, index }) => {
        console.log(item, index);
        let a = allTravels;
        a.splice(index, 1);
        console.log(a);
        setAllTravels([...a]);
        const oneTravel = travels.filtered(`_id == '${item.id}'`)
            realm.write(() => {
              realm.delete(oneTravel);
        });
      };

    const renderItem = ({ item, index }, onClick) => {
        const closeRow = (index) => {
          if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
          }
          prevOpenedRow = row[index];
        };
    
        const renderLeftActions = (progress, dragX, onClick) => {
            const scale = dragX.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1]
            
              })
              

          return (

            <TouchableOpacity onPress={onClick}  style={[styles.deleteBox, {borderTopLeftRadius: index == 0 ? 10 : 0,borderBottomLeftRadius: index == (allTravels.length -1) ? 10 : 0}]}>
                <View>
                    <Animated.Text style={[{transform: [{scale: scale}]}, {color: 'white'}]}>
                    Delete
                    </Animated.Text>
                </View>
            </TouchableOpacity>
          );
        };
    
        return (
          <GestureHandlerRootView>
          <Swipeable
          renderLeftActions={(progress, dragX) =>
            renderLeftActions(progress, dragX, onClick)}
            onSwipeableOpen={() => closeRow(index)}
            ref={(ref) => (row[index] = ref)}
            rightOpenValue={-100}>
              
              <HistoryCnt style={{borderTopLeftRadius: index == 0 ? 10 : 0, borderTopRightRadius: index == 0 ? 10 : 0, borderBottomLeftRadius: index == (allTravels.length -1) ? 10 : 0, borderBottomRightRadius: index  == (allTravels.length -1) ? 10 : 0}} from={item.from} to={item.to} start={item.start} end={item.end} increase={item.increase} />
          </Swipeable>
          </GestureHandlerRootView>
          
        );
      };

    const ref = useRef(null)
    const row: Array<any> = [];
    let prevOpenedRow;
 
    return (
    <SafeAreaView style={styles.page}>
        <Header title={'Travels'} color={'black'} button={'Edit'}  onPress={isDelete || allTravels.length == 0 ? () => {} : deleteActive} zindex={isDelete || allTravels.length == 0 ? 0 : 2} opacity={isDelete || allTravels.length == 0 ? 0 : 2}/>
        <View>
      <Text style={{color: 'white', position: 'absolute', top: 0, opacity:allTravels.length == 0 && !visible ? 1 : 0}}>
        No Items Found.
      </Text>
    </View>
        <HeaderButton color={'red'} onPress={() => {if(isDelete){deleteAll(); setAllTravels([]); setCount(5)}}} button={'Delete All'}  zindex={!isDelete2 ? 0 : 2} opacity={!isDelete2 ? 0 : 2}/>
                <Space space={20}/>
                <FlatList
                 style={{zIndex: visible ? 0 : 0, opacity: visible ? 0 : 1}} 
              data={allTravels}
              renderItem={(v) =>
                renderItem(v, () => {
                  console.log('Pressed', v);
                  deleteItemNew(v);
                })
              }
              keyExtractor={(item) => item.id}></FlatList>
          
                  <Provider  theme={{colors: {background: 'transparent', elevation: {level3: 'white'}}}} >
        <Portal>
          <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Do you want to delete all the travels?</Dialog.Title>
            <Dialog.Actions style={{justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={hideDialog} style={{marginStart: 40, padding: 5, paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 5, borderWidth: 1.2,}}><Text style={{color: 'black'}}>No</Text></TouchableOpacity>
                <TouchableOpacity onPress={deleteAllOfTravels} style={{marginEnd: 40, padding: 5, paddingHorizontal: 20, backgroundColor: 'black', borderRadius: 5, borderWidth: 1.2,}}><Text style={{color: 'white'}}>Yes</Text></TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        </Provider>
       {/* <Provider>
        <Portal>
          <Dialog style={styles.dialogInfo} visible={visibleInfo} onDismiss={hideDialogInfo}>
            <Dialog.Title style={{fontWeight: 400}}>Travels history is empty.</Dialog.Title>
            <Dialog.Actions style={{justifyContent: 'center'}}>
                <TouchableOpacity onPress={hideDialogInfo} style={{marginStart: 0, padding: 6, paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 5, borderWidth: 1.2,}}><Text style={{color: 'black', fontWeight: 600}}>Ok({count})</Text></TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        </Provider> */}
    </SafeAreaView>
    )};

const styles = StyleSheet.create({
    page : {
        flex: 1,
        backgroundColor: 'black',
    },
    leftActionStyle: {

    },
    dialog: {
        position: 'absolute',
        opacity: 2,
        zIndex: 2,
        width: SCREEN_WIDTH/ 1.2,
        alignSelf: 'center',
        bottom: SCREEN_HEIGHT /2,
        backgroundColor: '#D8D3D0',
    },
    dialogInfo: {
        position: 'absolute',
        opacity: 2,
        zIndex: 2,
        width: SCREEN_WIDTH/ 1.2,
        alignSelf: 'center',
        backgroundColor: '#D8D3D0',
        bottom: SCREEN_HEIGHT/2
    },
    deleteBox: {
        justifyContent: 'center', 
        backgroundColor: '#EB0606', 
        alignItems: 'center',
        width: 120,
        height: 50,
    },
})

export default Travels;


