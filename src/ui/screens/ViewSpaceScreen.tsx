import * as React from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'

import { NavigationProp, RouteProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder, TabBarPlaceholder } from '../components/Placeholder'
import { ComponentColors, Colors } from '../../styles'
import { FloatingButton } from '../components/FloatingButton'
import { State, Post } from '../../state'
import { RegularText } from '../components/Text'
import { TouchableView, ZERO_HIT_SLOP } from '../components/TouchableView'
import { ImageDataView } from '../components/ImageDataView'
import { HOUR, DAY } from '../../dateHelpers'

const windowWidth = Dimensions.get('window').width

const PostCard = React.memo((props: {
    post: Post,
    onPress: () => void,
}) => (
    <TouchableView
        style={{
            backgroundColor: Colors.WHITE,
            shadowColor: Colors.BLACK,
            shadowOpacity: 0.4,
            shadowRadius: 0.6,
            shadowOffset: {
                width: 0,
                height: 0.5,
            },
            padding: 9,
            marginHorizontal: 9,
            marginTop: 0,
            marginBottom: 9,
            flexDirection: 'column',
            width: windowWidth - 18,
        }}
        onPress={props.onPress}
        hitSlop={ZERO_HIT_SLOP}
    >
        {props.post.images.map(image =>
            <ImageDataView
                source={image}
                style={[{
                    width: windowWidth - 4 * 9,
                    height: windowWidth - 4 * 9,
                }]}
            />
        )}
        {props.post.images.length > 0 && props.post.text !== '' &&
            <View style={{paddingTop: 9}}></View>
        }
        {props.post.text !== '' &&
            <RegularText
                style={{
                    fontSize: 16,
                    padding: 9,
                }}
            >{props.post.text}
            </RegularText>
        }
    </TouchableView>
));

export const ViewSpaceScreen = (props: {navigation: NavigationProp<'Home'>, route: RouteProp<'ViewSpace'>}) => {
    const space = useSelector((state: State) =>
        state.spaces.find(space => space.id === props.route.params.id)
    )!
    const identity = useSelector((state: State) => state.identity)
    return (
        <>
            <ScreenHeader
                title={space.name}
                navigation={props.navigation}
            />
            <FlatList
                style={{ flex: 1, backgroundColor: ComponentColors.BACKGROUND_COLOR }}
                data={space.posts}
                renderItem={({ item }: any) =>
                    <PostCard
                        key={item.id}
                        post={item}
                        onPress={() => props.navigation.navigate('ViewPost', { post: {
                            ...item,
                            comments: [
                                {
                                    id: '' + Date.now(),
                                    text: 'Master cleanse literally deep v poutine cliche intelligentsia salvia.',
                                    createdAt: Date.now() - 3 * HOUR,
                                    images: [],
                                    author: identity,
                                    comments: [],
                                },
                                {
                                    id: '' + Date.now() + 1,
                                    text: '3 wolf moon neutra prism everyday carry photo booth. Heirloom green juice shaman pok pok, master cleanse polaroid tumblr.',
                                    createdAt: Date.now() - 2 * DAY,
                                    images: [],
                                    author: identity,
                                    comments: [],
                                }
                            ],
                        }})}
                    />
                }
                keyExtractor={(item: any) => item.id}
                ListFooterComponent={<TabBarPlaceholder color={ComponentColors.BACKGROUND_COLOR}/>}
                ListHeaderComponent={<HeaderPlaceholder extraHeight={9} />}
            />
            <FloatingButton
                iconName='plus'
                iconSize={48}
                onPress={() => props.navigation.navigate('CreatePost', {spaceId: space.id})}
            />
        </>
    )
}
