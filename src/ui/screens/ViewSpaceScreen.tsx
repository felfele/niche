import * as React from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
// @ts-ignore
import PhotoGrid from 'react-native-thumbnail-grid'

import { NavigationProp, RouteProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder, TabBarPlaceholder } from '../components/Placeholder'
import { ComponentColors, Colors } from '../../styles'
import { FloatingButton } from '../components/FloatingButton'
import { State, Post } from '../../state'
import { RegularText } from '../components/Text'
import { TouchableView, ZERO_HIT_SLOP } from '../components/TouchableView'
import { getImageDataURI } from '../components/ImageDataView'
import { ModalMenu } from '../components/ModalMenu'
import { useState } from 'react'
import { CustomIcon } from '../components/CustomIcon'
import { areYouSureDialog } from '../../dialogs'
import { removeSpace } from '../../reducers'

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
        <PhotoGrid
            source={props.post.images.map(image => getImageDataURI(image.location))}
            width={windowWidth - 4 * 9}
            onPressImage={props.onPress}
            imageStyle={{
                borderWidth: 3,
            }}
            textStyles={{
                fontSize: 18,
                fontWeight: 'bold',
            }}
        />
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
    const [isMenuVisible, setMenuVisible] = useState(false)
    const space = useSelector((state: State) =>
        state.spaces.find(space => space.id === props.route.params.id)
    )
    if (space == null) {
        return null
    }
    const spaceId = space.id
    const dispatch = useDispatch()
    const rightButton = {
        label: <CustomIcon name='settings' size={36} color={Colors.BLACK} />,
        onPress: () => setMenuVisible(true),
    }
    const navigateToCreatePost = () => props.navigation.navigate('CreatePost', {spaceId: space.id})
    return (
        <>
            <ScreenHeader
                title={space.name}
                navigation={props.navigation}
                rightButton={rightButton}
            />

            <ModalMenu
                visible={isMenuVisible}
                onCancel={() => setMenuVisible(false)}
                items={[
                    {
                        iconName: 'compose',
                        label: 'Create post',
                        onPress: navigateToCreatePost,
                    },
                    {
                        iconName: 'share',
                        label: 'Invite people',
                        onPress: () => {},
                    },
                    {
                        iconName: 'user_group',
                        label: 'View members list',
                        onPress: () => {},
                    },
                    {
                        iconName: 'information',
                        label: 'About this space',
                        onPress: () => {},
                    },
                    {
                        iconName: 'no',
                        label: 'Leave this space',
                        onPress: async () => {
                            const confirmed = await areYouSureDialog('Do you really want to leave this private space?', 'You’ll need to be invited again if you change your mind later.')
                            if (confirmed) {
                                props.navigation.goBack()
                                dispatch(removeSpace({spaceId}))
                                setMenuVisible(false)
                            }
                        },
                    },
                ]}
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
                onPress={navigateToCreatePost}
            />
        </>
    )
}
