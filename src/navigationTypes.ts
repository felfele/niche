import { RouteProp as NavigationRouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackNavigatorParams = {
    Home: undefined,
    Welcome: undefined,
    Init: undefined,
    CreateSpace: undefined,
}

export type NavigationProp<T extends keyof RootStackNavigatorParams> = StackNavigationProp<
    RootStackNavigatorParams,
    T
>

export type RouteProp<T extends keyof RootStackNavigatorParams> = NavigationRouteProp<RootStackNavigatorParams, T>;
