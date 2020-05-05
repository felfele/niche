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
        {props.post.images.map((image, index) =>
            <ImageDataView
                key={'' + index}
                source={image}
                style={[{
                    marginTop: index > 0 ? 9 : 0,
                    width: windowWidth - 4 * 9,
                    height: (windowWidth * (image.height / image.width)) - 4 * 9,
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
    )
    if (space == null) {
        return null
    }
    const spaceId = space.id
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
                        onPress={() => props.navigation.navigate('ViewPost', {
                            postId: item.id,
                            spaceId,
                        })}
                    />
                }
                keyExtractor={(item: any) => item.id}
                ListFooterComponent={<TabBarPlaceholder color={ComponentColors.BACKGROUND_COLOR}/>}
                ListHeaderComponent={<HeaderPlaceholder extraHeight={9} />}
            />
            <FloatingButton
                iconName='compose'
                iconSize={48}
                onPress={() => props.navigation.navigate('CreatePost', {spaceId: space.id})}
            />
        </>
    )
}
