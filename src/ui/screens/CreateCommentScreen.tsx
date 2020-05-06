import * as React from 'react'

import { ImageData } from '../../models/ImageData'
import { State } from '../../state'
import { NavigationProp, RouteProp } from '../../navigationTypes'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentToPost } from '../../reducers'
import { HexString } from 'src/hex'
import { PostEditor } from '../components/PostEditor'

export const CreateCommentScreen = (props: {navigation: NavigationProp<'Home'>, route: RouteProp<'CreateComment'>}) => {
    const identity = useSelector((state: State) => state.identity)
    const spaceId = props.route.params.spaceId
    const postId = props.route.params.postId
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
        dispatch(addCommentToPost({spaceId, postId, post}))
        props.navigation.goBack()
    }
    return (
        <PostEditor
            title='ADD COMMENT'
            text=''
            imagesEnabled={false}
            images={[]}
            navigation={props.navigation}
            onDonePress={onDonePress}
        />
    )
}
