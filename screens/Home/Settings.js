import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { HistoryCnt } from '../../components/Utilities';
import { HistoryList } from '../../components/Database/MongoDB';

const MyTravels = [
    {from: 'China', to: 'Japan', duration: '21 days'},
    {from: 'China', to: 'Turkey', duration: '21 days'},
    {from: 'China', to: 'India', duration: '21 days'},
    {from: 'China', to: 'Korea', duration: '42 days'},
]

// const {useRealm, useQuery} = realmContext



const History = ({route, navigation}) => {

    const {email} = route.params

    return (
    <View style={styles.page}>
        <ScrollView>
            {
                MyTravels.map((item, index) => (
                    <Fragment  key={index}>
                        <HistoryCnt />
                    </Fragment>
                ))
            }
        </ScrollView>
    </View>
    )};

const styles = StyleSheet.create({
    page : {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default History;


