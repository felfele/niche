import { RouteProp as NavigationRouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ImageData } from './models/ImageData'
import { HexString } from './hex'

export type RootStackNavigatorParams = {
    Home: undefined,
    Welcome: undefined,
    Init: undefined,
    CreateSpace: undefined,
    CreateSpaceDone: {
        name: string,
        description: string,
        image: ImageData,
    },
    Debug: undefined,
    Spaces: undefined,
    ViewSpace: {
        id: HexString,
    },
    CreatePost: {
        spaceId: HexString,
    },
    CreateComment: {
        spaceId: HexString,
        postId: HexString,
    },
    ViewPost: {
        spaceId: HexString,
        postId: HexString,
    },
    EditPost: {
        spaceId: HexString,
        postId: HexString,
    },
    EditComment: {
        spaceId: HexString,
        postId: HexString,
        commentId: HexString,
    },
}

export type NavigationProp<T extends keyof RootStackNavigatorParams> = StackNavigationProp<
    RootStackNavigatorParams,
    T
>

export type RouteProp<T extends keyof RootStackNavigatorParams> = NavigationRouteProp<
    RootStackNavigatorParams,
    T
>
