import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeaderText } from '../../components/Texts';
import { Header, HeaderButton, Space } from '../../components/Utilities';

const Next = ({
    route, navigation
}) => (
    <SafeAreaView style={styles.page}>
         <HeaderButton onPress={() => {navigation.navigate('One')}} color={'gray'} button={'back'}/>
        <Space space={10}/>
        <ScreenHeaderText text={'Coming Soon..'}/>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    page : {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between'
    }
})

export default Next;
