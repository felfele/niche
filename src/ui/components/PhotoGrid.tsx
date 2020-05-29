// This was originally forked from https://github.com/duyluonglc/react-native-thumbnail-grid/
import React from 'react'
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, GestureResponderEvent, StyleSheet, Image, ImageProps } from 'react-native'

interface Props {
    source: string[]
    style?: {}
    textStyles: {}
    imageStyle: {}
    imageProps?: {}
    width?: number
    height?: number
    ratio?: number
    activeOpacity?: number
    numberImagesToShow?: number
    onPressImage: (event: GestureResponderEvent, image: string, index: number) => void
    ImageComponent?: (props: ImageProps) => JSX.Element
}

export const PhotoGrid = (props: Props) => {
    const { imageProps } = props
    const source = props.source.slice(0, 5)
    const firstViewImages: string[] = []
    const secondViewImages: string[] = []
    const firstItemCount = source.length === 5 ? 2 : 1
    let index = 0
    source.forEach((img, callback) => {
        if (index === 0) {
            firstViewImages.push(img)
        } else if (index === 1 && firstItemCount === 2) {
            firstViewImages.push(img)
        } else {
            secondViewImages.push(img)
        }
        index++
    })

    const width = props.width || Dimensions.get('window').width
    const height = props.height || 400
    let ratio = 0
    if (secondViewImages.length === 0) {
        ratio = 0
    } else if (secondViewImages.length === 1) {
        ratio = 1 / 2
    } else {
        ratio = props.ratio || 1 / 3
    }
    const direction = source.length === 5 ? 'row' : 'column'

    const firstImageWidth = direction === 'column' ? (width / firstViewImages.length) : (width * (1 - ratio))
    const firstImageHeight = direction === 'column' ? (height * (1 - ratio)) : (height / firstViewImages.length)

    const secondImageWidth = direction === 'column' ? (width / secondViewImages.length) : (width * ratio)
    const secondImageHeight = direction === 'column' ? (height / secondViewImages.length) : (height * ratio)

    const secondViewWidth = direction === 'column' ? width : (width * ratio)
    const secondViewHeight = direction === 'column' ? (height * ratio) : height

    const isLastImage = (index: number, secondViewImages: string[]) => {
        const { source, numberImagesToShow } = props

        return (source.length > 5 || numberImagesToShow) && index === secondViewImages.length - 1
    }

    const handlePressImage = (event: GestureResponderEvent, image: string, index: number) =>
        props.onPressImage(event, image, index)

    const ImageComponent = props.ImageComponent || Image

    return source.length ? (
        <View style={[{ flexDirection: direction, width, height }, props.style]}>
            <View style={{ flex: 1, flexDirection: direction === 'row' ? 'column' : 'row' }}>
                {firstViewImages.map((image, index) => (
                    <TouchableOpacity activeOpacity={props.activeOpacity} key={index} style={{ flex: 1 }}
                        onPress={event => handlePressImage(event, image, index)}>
                        <ImageComponent
                            style={[styles.image, { width: firstImageWidth, height: firstImageHeight }, props.imageStyle]}
                            source={typeof image === 'string' ? { uri: image } : image}
                            {...imageProps}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            {
                secondViewImages.length ? (
                    <View style={{ width: secondViewWidth, height: secondViewHeight, flexDirection: direction === 'row' ? 'column' : 'row' }}>
                        {secondViewImages.map((image, index) => (
                            <TouchableOpacity activeOpacity={props.activeOpacity} key={index} style={{ flex: 1 }}
                                onPress={event => handlePressImage(event, image, index)}>
                                {isLastImage(index, secondViewImages) ? (
                                    <ImageBackground
                                        style={[styles.image, { width: secondImageWidth, height: secondImageHeight }, props.imageStyle]}
                                        source={typeof image === 'string' ? { uri: image } : image}
                                    >
                                        <View style={styles.lastWrapper}>
                                            <Text style={[styles.textCount, props.textStyles]}>+{props.numberImagesToShow || props.source.length - 5}</Text>
                                        </View>
                                    </ImageBackground>
                                )
                                    : <ImageComponent
                                        style={[styles.image, { width: secondImageWidth, height: secondImageHeight }, props.imageStyle]}
                                        source={typeof image === 'string' ? { uri: image } : image}
                                        {...imageProps}
                                    />}
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : null
            }
        </View >
    ) : null
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#fff'
    },
    lastWrapper: {
        flex: 1,
        backgroundColor: 'rgba(200, 200, 200, .5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCount: {
        color: '#fff',
        fontSize: 60
    }
})
