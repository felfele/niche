import * as React from 'react'
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { Colors } from '../../styles'
import { ButtonProps } from './TwoButtons'

export const WideButton = (props: ButtonProps) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.mainContainer, props.style]}>
                <View style={styles.container}>
                    <View style={styles.icon}>{props.icon}</View>
                    <Text style={[styles.label, props.fontStyle]}>{props.label}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.BRAND_COLOR,
        margin: 10,
        height: 44,
        borderRadius: 3,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    icon: {
        alignItems: 'center',
        paddingRight: 6,
    },
})
