import * as React from 'react'
import { Dimensions, View } from 'react-native'

import { Colors, ComponentColors } from '../../styles'
import { RegularText } from './Text'
import { PrimaryButton } from './Button'
import { AnimatedBlob } from './AnimatedBlob'

interface Props {
    title: string
    text: string
    explanation?: string
    buttonText?: string
    onPress?: () => void
}

export const EmptyListPlaceholder = (props: Props) => {
    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    const blobWidth = width + 40
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: ComponentColors.BACKGROUND_COLOR,
        }}>
            <View style={{
                marginTop: height / 10,
                width: blobWidth,
                height: blobWidth + 40,
                borderRadius: blobWidth / 2,
            }}>
                <AnimatedBlob width={blobWidth} />

                <View style={{
                    paddingHorizontal: 18 + 20,
                    height: blobWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <RegularText style={{
                        color: Colors.BRAND_BLUE,
                        fontSize: 34,
                        fontFamily: 'YoungSerif-Regular',
                        textAlign: 'center',
                    }}>{props.title}</RegularText>
                    <RegularText style={{
                        color: Colors.BRAND_BLUE,
                        textAlign: 'center',
                        fontSize: 16,
                        marginTop: 18,
                    }}>{props.text}</RegularText>
                    {props.explanation != null &&
                        <RegularText style={{
                            color: Colors.BRAND_BLUE,
                            textAlign: 'center',
                            fontSize: 14,
                            fontFamily: 'YoungSerif-Regular',
                            marginTop: 18,
                        }}>{props.explanation}</RegularText>
                    }
                    {props.buttonText != null &&
                        <PrimaryButton
                            label={props.buttonText}
                            onPress={props.onPress || (() => {})}
                            style={{
                                marginTop: 36,
                                backgroundColor: Colors.BRAND_BLUE,
                                flexDirection: 'column',
                                alignItems: 'center',
                                alignSelf: 'center',
                            }}
                        />
                    }

                </View>
            </View>
        </View>
    )
}

