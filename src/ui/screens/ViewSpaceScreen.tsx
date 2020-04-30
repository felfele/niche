import * as React from 'react'
import { FlatGrid } from 'react-native-super-grid'

import { NavigationProp, RouteProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder, TabBarPlaceholder } from '../components/Placeholder'
import { ComponentColors } from '../../styles'
import { FloatingButton } from '../components/FloatingButton'
import { useSelector } from 'react-redux'
import { State, Space, Post } from '../../state'
import { View } from 'react-native'
import { RegularText } from '../components/Text'

const PostCard = (props: {post: Post}) => (
    <View>
        <RegularText>{props.post.text}</RegularText>
    </View>
)

export const ViewSpaceScreen = (props: {navigation: NavigationProp<'Home'>, route: RouteProp<'ViewSpace'>}) => {
    const space = useSelector((state: State) =>
        state.spaces.find(space => space.id === props.route.params.id)
    )!
    return (
        <>
            <ScreenHeader
                title={space.name}
                navigation={props.navigation}
            />
            <FlatGrid
                style={{ flex: 1, backgroundColor: ComponentColors.BACKGROUND_COLOR }}
                spacing={10}
                fixed={true}
                items={space.posts}
                renderItem={({ item }: any) => <PostCard post={item}/>}
                ListFooterComponent={<TabBarPlaceholder color={ComponentColors.BACKGROUND_COLOR}/>}
                ListHeaderComponent={<HeaderPlaceholder />}
            />
            <FloatingButton
                iconName='plus'
                iconSize={48}
                onPress={() => props.navigation.navigate('CreateSpace')}
            />
        </>
    )
}
