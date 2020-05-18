import * as React from 'react'

import { ImageData } from '../../models/ImageData'
import { State } from '../../state'
import { NavigationProp, RouteProp } from '../../navigationTypes'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../../reducers'
import { PostEditor } from '../components/PostEditor'

export const EditPostScreen = (props: {navigation: NavigationProp<'Home'>, route: RouteProp<'EditPost'>}) => {
    const spaceId = props.route.params.spaceId
    const postId = props.route.params.postId
    const post = useSelector((state: State) =>
        state.spaces.find(space => space.id === spaceId)?.posts.find(p => p.id === postId)
    )
    if (post == null) {
        return null
    }
    const dispatch = useDispatch()
    const onDonePress = (text: string, images: ImageData[]) => {
        const updatedPost = {
            ...post,
            updatedAt: Date.now(),
            text,
            images,
        }
        dispatch(updatePost({spaceId, post: updatedPost}))
        props.navigation.goBack()
    }
    return (
        <PostEditor
            title='Edit post'
            mode='update'
            text={post.text}
            images={post.images}
            navigation={props.navigation}
            onDonePress={onDonePress}
        />
    )
}
