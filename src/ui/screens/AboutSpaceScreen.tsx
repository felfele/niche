import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { NavigationProp, RouteProp } from '../../navigationTypes'
import { SpaceEditor } from '../components/SpaceEditor'
import { State } from '../../state'
import { updateSpace } from '../../reducers'
import { ImageData } from '../../models/ImageData'

interface StateProps {
    navigation: NavigationProp<'Home'>
    route: RouteProp<'AboutSpace'>
    editable?: boolean
}

export const AboutSpaceScreen = (props: StateProps) => {
    const space = useSelector((state: State) =>
        state.spaces.find(space => space.id === props.route.params.spaceId)
    )
    if (space == null) {
        return null
    }
    const dispatch = useDispatch()
    const onDonePressed = (name: string, description: string, coverImage: ImageData) => {
        if (props.editable === true) {
            dispatch(updateSpace({spaceId: space.id, name, description, coverImage}))
        }
        props.navigation.goBack()
    }
    return (
        <SpaceEditor
            title='ABOUT'
            editable={props.editable}
            navigation={props.navigation}
            name={space.name}
            description={space.description}
            coverImage={space.coverImage}
            onDonePressed={onDonePressed}
        />
    )
}
