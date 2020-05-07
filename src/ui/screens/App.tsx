import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { PersistGate } from 'redux-persist/integration/react'
// @ts-ignore
import { setCustomText } from 'react-native-global-props'

import configureStore from '../../store'
import { RootStackNavigatorParams } from '../../navigationTypes'
import { Colors, defaultTextProps } from '../../styles'

import { HomeScreen } from './HomeScreen'
import { WelcomeScreen } from './WelcomeScreen'
import { InitialScreen } from './InitialScreen'
import { CreateSpaceScreen } from './create-space/CreateSpaceScreen'
import { CreateSpaceDoneScreen } from './create-space/CreateSpaceDoneScreen'
import { DebugScreen } from './DebugScreen'
import { CreatePostScreen } from './CreatePostScreen'
import { ViewPostScreen } from './ViewPostScreen'
import { CreateCommentScreen } from './CreateCommentScreen'
import { EditPostScreen } from './EditPostScreen'
import { EditCommentScreen } from './EditCommentScreen'
import { AboutSpaceScreen } from './AboutSpaceScreen'

setCustomText(defaultTextProps);

const App = () => {
    const Stack = createStackNavigator<RootStackNavigatorParams>()
    const { store, persistor } = configureStore()
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={'Init'}
                        screenOptions={{
                            headerTintColor: Colors.BLACK,
                            headerBackTitleVisible: false,
                            headerTitleStyle: {
                                fontFamily: 'NunitoSans-Bold',
                                fontSize: 14,
                            },
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen
                            name='Init'
                            component={InitialScreen}
                        />
                        <Stack.Screen
                            name='Home'
                            component={HomeScreen}
                            options={{
                                animationEnabled: false,
                            }}
                        />
                        <Stack.Screen
                            name='Welcome'
                            component={WelcomeScreen}
                            options={{
                                animationEnabled: false,
                            }}
                        />
                        <Stack.Screen
                            name='CreateSpace'
                            component={CreateSpaceScreen}
                        />
                        <Stack.Screen
                            name='CreateSpaceDone'
                            component={CreateSpaceDoneScreen}
                        />
                        <Stack.Screen
                            name='Debug'
                            component={DebugScreen}
                        />
                        <Stack.Screen
                            name='CreatePost'
                            component={CreatePostScreen}
                        />
                        <Stack.Screen
                            name='ViewPost'
                            component={ViewPostScreen}
                        />
                        <Stack.Screen
                            name='CreateComment'
                            component={CreateCommentScreen}
                        />
                        <Stack.Screen
                            name='EditPost'
                            component={EditPostScreen}
                        />
                        <Stack.Screen
                            name='EditComment'
                            component={EditCommentScreen}
                        />
                        <Stack.Screen
                            name='AboutSpace'
                            component={AboutSpaceScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App
