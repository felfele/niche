import * as React from 'react'
import { ImageDataView } from "./ImageDataView"
import { ImageData } from '../../models/ImageData'
import { Colors } from '../../styles'

export const Avatar = (props: {size: number, image: ImageData}) => {
    return (
        <ImageDataView
            source={props.image}
            style={{
                width: props.size,
                height: props.size,
                borderRadius: props.size,
                resizeMode: 'cover',
                backgroundColor: Colors.PINKISH_GRAY,
            }}
        />
    )
}
