import * as React from 'react'
import { Animated } from 'react-native'
import { useSelector } from 'react-redux'
import { State } from '../../state'
import { Colors } from '../../styles'

// TODO add animation similar to this: https://codepen.io/shshaw/pen/MXvLzm
export const AnimatedBlob = (props: {
    width: number,
}) => {
    const isAnimatedBlob = useSelector((state: State) => state.features.includes('animated-blob'))

    const blobWidth = props.width
    const borderTopLeftRadius = React.useRef(new Animated.Value(blobWidth / 2.1)).current
    const borderTopRightRadius = React.useRef(new Animated.Value(blobWidth / 1.3)).current
    const borderBottomRightRadius = React.useRef(new Animated.Value(blobWidth / 2.1)).current
    const borderBottomLeftRadius = React.useRef(new Animated.Value(blobWidth / 1.3)).current
    const top = React.useRef(new Animated.Value(0)).current
    const left = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        const animations = []
        const duration = 15000
        const centerAnimationDuration = duration
        animations.push(
            Animated.loop(
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(top, {
                            toValue: 10,
                            duration: centerAnimationDuration,
                            useNativeDriver: false,
                        })
                        ,
                        Animated.timing(top, {
                            toValue: 0,
                            duration: centerAnimationDuration,
                            useNativeDriver: false,
                        })
                    ])
                    ,

                ])
            )
        )
        animations.push(
            Animated.loop(
                Animated.sequence([
                    Animated.timing(left, {
                        toValue: 10,
                        duration: centerAnimationDuration,
                        useNativeDriver: false,
                    })
                    ,
                    Animated.timing(left, {
                        toValue: 20,
                        duration: centerAnimationDuration,
                        useNativeDriver: false,
                    })
                    ,
                    Animated.timing(left, {
                        toValue: 10,
                        duration: centerAnimationDuration,
                        useNativeDriver: false,
                    })
                    ,
                    Animated.timing(left, {
                        toValue: 0,
                        duration: centerAnimationDuration,
                        useNativeDriver: false,
                    })
                ])
            )
        )
        animations.push(
            Animated.loop(
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(borderTopLeftRadius, {
                            toValue: blobWidth / 1.6,
                            duration,
                            useNativeDriver: false,
                        })
                        ,
                        Animated.timing(borderTopLeftRadius, {
                            toValue: blobWidth / 2.1,
                            duration,
                            useNativeDriver: false,
                        })
                    ])
                    ,
                    Animated.sequence([
                        Animated.timing(borderTopRightRadius, {
                            toValue: blobWidth / 1.9,
                            duration,
                            useNativeDriver: false,
                        })
                        ,
                        Animated.timing(borderTopRightRadius, {
                            toValue: blobWidth / 1.3,
                            duration,
                            useNativeDriver: false,
                        })
                    ])
                    ,
                    Animated.sequence([
                        Animated.timing(borderBottomRightRadius, {
                            toValue: blobWidth / 1.6,
                            duration,
                            useNativeDriver: false,
                        })
                        ,
                        Animated.timing(borderBottomRightRadius, {
                            toValue: blobWidth / 2.1,
                            duration,
                            useNativeDriver: false,
                        })
                    ])
                    ,
                    Animated.sequence([
                        Animated.timing(borderBottomLeftRadius, {
                            toValue: blobWidth / 2.1,
                            duration,
                            useNativeDriver: false,
                        })
                        ,
                        Animated.timing(borderBottomLeftRadius, {
                            toValue: blobWidth / 1.3,
                            duration,
                            useNativeDriver: false,
                        })
                    ])
                ], {
                    stopTogether: false,
                })
            )
        )
        if (isAnimatedBlob) {
            animations.forEach(animation => animation.start())
        } else {
            animations.forEach(animation => animation.stop())
        }
    }, [isAnimatedBlob])
    return (
        <Animated.View style={{
            position: 'absolute',
            left: left,
            top: top,
            width: blobWidth,
            height: blobWidth,
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            backgroundColor: Colors.BRAND_GREEN,
        }}>
        </Animated.View>

    )
}

