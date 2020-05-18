import * as React from 'react'

import { ImageData } from '../../models/ImageData'
import { State } from '../../state'
import { NavigationProp, RouteProp } from '../../navigationTypes'
import { useDispatch, useSelector } from 'react-redux'
import { updateComment } from '../../reducers'
import { PostEditor } from '../components/PostEditor'

export const EditCommentScreen = (props: {navigation: NavigationProp<'Home'>, route: RouteProp<'EditComment'>}) => {
    const spaceId = props.route.params.spaceId
    const postId = props.route.params.postId
    const commentId = props.route.params.commentId
    const comment = useSelector((state: State) =>
        state.spaces.find(space => space.id === spaceId)
        ?.posts.find(p => p.id === postId)
        ?.comments.find(c => c.id === commentId)
    )
    if (comment == null) {
        return null
    }
    const dispatch = useDispatch()
    const onDonePress = (text: string) => {
        const updatedComment = {
            ...comment,
            updatedAt: Date.now(),
            text,
        }
        dispatch(updateComment({spaceId, postId, comment: updatedComment}))
        props.navigation.goBack()
    }
    return (
        <PostEditor
            title='Edit comment'
            mode='update'
            text={comment.text}
            images={[]}
            imagesEnabled={false}
            navigation={props.navigation}
            onDonePress={onDonePress}
        />
    )
}
