import * as React from 'react'

import { ImageData } from '../../models/ImageData'
import { State } from '../../state'
import { NavigationProp, RouteProp } from '../../navigationTypes'
import { useDispatch, useSelector } from 'react-redux'
import { addPostToSpace } from '../../reducers'
import { HexString } from 'src/hex'
import { PostEditor } from '../components/PostEditor'

export const CreatePostScreen = (props: {navigation: NavigationProp<'Home'>, route: RouteProp<'CreatePost'>}) => {
    const identity = useSelector((state: State) => state.identity)
    const spaceId = props.route.params.spaceId
    const dispatch = useDispatch()
    const onDonePress = (text: string, images: ImageData[]) => {
        const post = {
            id: '' + Date.now() as HexString,
            text,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            images,
            author: {
                name: identity.name,
                address: identity.address,
                image: identity.image,
            },
            comments: [],
        }
        dispatch(addPostToSpace({spaceId, post}))
        props.navigation.goBack()
    }
    return (
        <PostEditor
            title='Create post'
            text=''
            mode='create'
            images={[]}
            navigation={props.navigation}
            onDonePress={onDonePress}
        />
    )
}
