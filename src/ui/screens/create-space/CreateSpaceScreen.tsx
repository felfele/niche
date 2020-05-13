import * as React from 'react'

import { NavigationProp } from '../../../navigationTypes'
import { ImageData } from '../../../models/ImageData'
import { SpaceEditor } from '../../components/SpaceEditor'

interface StateProps {
    navigation: NavigationProp<'Home'>
}

export const CreateSpaceScreen = (props: StateProps) => {
    const onDonePressed = (title: string, description: string, image: ImageData) => {
        props.navigation.navigate('CreateSpaceDone', { name: title, description, image })
    }
    return (
        <SpaceEditor
            title='Create space'
            navigation={props.navigation}
            name=''
            description=''
            coverImage={undefined}
            onDonePressed={onDonePressed}
        />
    )
}
