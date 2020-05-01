import * as React from 'react'
import { ImageLocation, ImageLocationPath, ImageLocationURL } from '../../models/ImageData'
import { Platform, Image, Dimensions, StyleProp, ImageStyle, StyleSheet, View} from 'react-native'

import { ImageData } from '../../models/ImageData'

export const isImageLocationPath = (location: ImageLocation): location is ImageLocationPath =>
    typeof (location as ImageLocationPath).path === 'string'

const isImageLocationURI = (location: ImageLocation): location is ImageLocationURL =>
    typeof (location as ImageLocationURL).url === 'string'

const RNFS = require('react-native-fs');

const getAbsolutePathFromLocalPath = (localPath: string): string => {
    if (Platform.OS === 'ios') {
        return `file://${RNFS.DocumentDirectoryPath}/${localPath}`;
    } else {
        return localPath;
    }
};

const getImageDataURI = (location: ImageLocation): string => {
    if (isImageLocationPath(location)) {
        return getAbsolutePathFromLocalPath(location.path)
    }
    if (isImageLocationURI(location)) {
        return location.url
    }
    return location.data
}

export const ImageDataView = (props: {source?: ImageData, style?: StyleProp<ImageStyle>, children?: React.ReactNode}) => {
    const uri = props.source && getImageDataURI(props.source.location)
    const width = props.style
        ? StyleSheet.flatten(props.style).width != null
            ? StyleSheet.flatten(props.style).width
            : props.source?.width
        : props.source?.width;
    const height = props.style
        ? StyleSheet.flatten(props.style).height != null
            ? StyleSheet.flatten(props.style).height
            : props.source?.height
        : props.source?.height;
    return (
        <>
        {uri !== ''
        ?
            <Image
                style={[{
                    width: width,
                    height: height,
                    resizeMode: 'stretch',
                }, props.style]}
                source={{
                    uri,
                }}
            />
        : <View style={{width, height}}></View>
        }
        </>
    )
}


