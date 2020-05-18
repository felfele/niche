import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { RootStackNavigatorParams } from '../../../navigationTypes'
import { Colors } from '../../../styles'
import { CreateSpaceScreen } from './CreateSpaceScreen'
import { CreateSpaceDoneScreen } from './CreateSpaceDoneScreen'

export const CreateSpaceNavigator = () => {
    const Stack = createStackNavigator<RootStackNavigatorParams>()
    return (
        <Stack.Navigator
            initialRouteName={'CreateSpace'}
            screenOptions={{
                headerTintColor: Colors.BLACK,
                headerBackTitleVisible: false,
                headerTitleStyle: {
                    fontFamily: 'NunitoSans-Bold',
                    fontSize: 14,
                },
                headerShown: false,
            }}
            mode='card'
        >
            <Stack.Screen
                name='CreateSpace'
                component={CreateSpaceScreen}
            />
            <Stack.Screen
                name='CreateSpaceDone'
                component={CreateSpaceDoneScreen}
            />
        </Stack.Navigator>
    )
}

