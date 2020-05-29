import * as React from 'react'
import { Dimensions, View } from 'react-native'

import { Colors, ComponentColors } from '../../styles'
import { RegularText } from './Text'
import { PrimaryButton } from './Button'

interface Props {
    title: string
    text: string
    explanation?: string
    buttonText?: string
    onPress?: () => void
}

// TODO add animation similar to this: https://codepen.io/shshaw/pen/MXvLzm
export const EmptyListPlaceholder = (props: Props) => {
    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
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
                left: 0,
                width: width + 40,
                height: width + 40,
                borderRadius: (width + 40) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 18 + 20,
            }}>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: width,
                    height: width,
                }}>
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: width + 40,
                        height: width + 40,
                        borderRadius: width / 2,
                        backgroundColor: Colors.BRAND_GREEN,
                    }}></View>

                </View>
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
    )
}

