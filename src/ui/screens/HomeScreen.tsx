import * as React from 'react'
import { FlatList, View, Text } from 'react-native'

import { NavigationProp } from '../../navigationTypes'

export const HomeScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    return (
        <>
            <FlatList
                data={[]}
                renderItem={item => <View/>}
                keyExtractor={(item, index) => '' + index}
            />
        </>
    )
}
