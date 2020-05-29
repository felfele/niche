import * as React from 'react'
import { StyleProp, ViewStyle, View } from 'react-native'

import { TouchableView } from './TouchableView'
import { CustomIcon } from './CustomIcon'

export const OverlayIcon = (props: {
    onPress?: () => void,
    name: string,
    color: string,
    size: number,
    style?: StyleProp<ViewStyle>,
}) => {
    const ViewComponent = props.onPress != null ? TouchableView : View
    return (
        <ViewComponent
            onPress={props.onPress}
            style={[{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 1,
            }, props.style]}
        >
            <CustomIcon name={props.name} size={props.size} color={props.color} />
        </ViewComponent>
    )
}
