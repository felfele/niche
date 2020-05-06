import * as React from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'

import { NavigationProp, RouteProp } from '../..//navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { CloseIcon, CustomIcon } from '../components/CustomIcon'
import { ComponentColors, Colors } from '../../styles'
import { TabBarPlaceholder, HeaderPlaceholder } from '../components/Placeholder'
import { FloatingButton } from '../components/FloatingButton'
import { Post, State } from '../../state'
import { TouchableView, ZERO_HIT_SLOP } from '../components/TouchableView'
import { ImageDataView } from '../components/ImageDataView'
import { RegularText, BoldText, MediumText } from '../components/Text'
import { printableElapsedTime } from '../../dateHelpers'
import { Avatar } from '../components/Avatar'

const windowWidth = Dimensions.get('window').width


const PostCard = React.memo((props: {
    isComment: boolean,
    post: Post,
    onPress: () => void,
}) => (
    <>
        <TouchableView
            style={{
                backgroundColor: props.isComment ? ComponentColors.BACKGROUND_COLOR : Colors.WHITE,
                flexDirection: 'column',
                width: windowWidth,
                shadowColor: Colors.BLACK,
                shadowOpacity: 0.4,
                shadowRadius: 0.6,
                shadowOffset: {
                    width: 0,
                    height: 0.5,
                },
                marginBottom: 1,
            }}
            hitSlop={ZERO_HIT_SLOP}
            onPress={props.onPress}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 9,
                }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar
                        image={props.post.author.image}
                        size={30}
                    />
                    <MediumText style={{fontSize: 14, paddingLeft: 5,}}>{props.post.author.name}</MediumText>
                </View>
                <RegularText style={{fontSize: 12, color: Colors.LIGHTISH_GRAY}}>{printableElapsedTime(props.post.createdAt) + ' ago'}</RegularText>
            </View>
            {props.post.images.map((image, index) =>
                <ImageDataView
                    key={'' + index}
                    source={image}
                    style={[{
                        marginTop: index > 0 ? 9 : 0,
                        width: windowWidth,
                        height: windowWidth * (image.height / image.width),
                    }]}
                />
            )}
            {props.post.images.length > 0 && props.post.text !== '' &&
                <View style={{paddingTop: 9}}></View>
            }
            {props.post.text !== '' &&
                <RegularText
                    style={{
                        fontSize: props.isComment ? 16 : 18,
                        padding: props.isComment ? 9 : 18,
                    }}
                >{props.post.text}
                </RegularText>
            }
        </TouchableView>
        {props.isComment === false &&
            <View
                style={{
                    height: 45,
                    paddingTop: 18,
                    paddingBottom: 8,
                    paddingLeft: 9,
                    backgroundColor: ComponentColors.BACKGROUND_COLOR,
                }}
            >
                <RegularText>{props.post.comments.length + ' comments'}</RegularText>
            </View>
        }
    </>
));

export const ViewPostScreen = (props: {navigation: NavigationProp<'Home'>, route: RouteProp<'ViewPost'>}) => {
    const postId = props.route.params.postId
    const spaceId = props.route.params.spaceId
    console.log('ViewPostScreen', {postId, spaceId})
    const identity = useSelector((state: State) => state.identity)
    const post = useSelector((state: State) =>
        state.spaces.find(space => space.id === spaceId)?.posts.find(p => p.id === postId)
    )!
    const title = `${post.author.name.toLocaleUpperCase()}'S POST`
    const posts = [post].concat(post.comments)
    const rightButton = post.author.address === identity.address
        ? {
            label: <CustomIcon name='settings' size={36} color={Colors.BLACK} />,
            onPress: () => props.navigation.navigate('EditPost', {spaceId, postId})
        }
        : undefined
    return (
        <>
            <ScreenHeader
                title={title}
                leftButton={{
                    label: <CloseIcon size={40} />,
                    onPress: () => props.navigation.goBack(),
                }}
                rightButton={rightButton}
            />
            <FlatList
                style={{ flex: 1, backgroundColor: ComponentColors.BACKGROUND_COLOR }}
                data={posts}
                renderItem={({ item, index }: any) =>
                    <PostCard
                        isComment={index !== 0}
                        key={item.id}
                        post={item}
                        onPress={() => {
                            console.log('ViewPostScreen/PostCard', {spaceId, postId, item})
                            if (index > 0 && item.author.address === identity.address) {
                                props.navigation.navigate('EditComment', {spaceId, postId, commentId: item.id})
                            }
                        }}
                    />
                }
                keyExtractor={(item: any) => item.id}
                ListFooterComponent={<TabBarPlaceholder color={ComponentColors.BACKGROUND_COLOR}/>}
                ListHeaderComponent={<HeaderPlaceholder/>}
            />
            <FloatingButton
                iconName='chat_active'
                iconSize={48}
                onPress={() => props.navigation.navigate('CreateComment', {postId: post.id, spaceId})}
            />
        </>
    )
}
