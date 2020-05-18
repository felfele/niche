import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { CustomIcon } from './CustomIcon';
import { Colors } from '../../styles';
import { TouchableView } from './TouchableView';
import { useSafeArea } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view'

interface Props {
    onPress: () => void;
    iconName: string;
    iconSize: number;
    enabled?: boolean;
    extraBottom?: number;
}

const isEnabled = (enabled?: boolean) => enabled == null || enabled === true;

const buttonStyle = (enabled?: boolean) => isEnabled(enabled)
    ? styles.floatingButtonEnabled
    : styles.floatingButtonDisabled
;

const iconColor = (enabled?: boolean) => isEnabled(enabled)
    ? Colors.BLACK
    : Colors.BLACK + '4D'
;

const DEFAULT_BOTTOM_STYLE = 16;
const extraBottomStyle = (extraBottom?: number) => extraBottom != null
    ? {
        bottom: extraBottom + DEFAULT_BOTTOM_STYLE,
    }
    : undefined
;

const ActionButton = (props: Props) => (
    <TouchableView
        style={[styles.floatingButton, buttonStyle(props.enabled)]}
        onPress={isEnabled(props.enabled) ? props.onPress : undefined}
    >
        <CustomIcon name={props.iconName} size={props.iconSize} color={iconColor(props.enabled)} />
    </TouchableView>
)

export const FullscreenFloatingButton = (props: Props) => (
    <SafeAreaView
        forceInset={{bottom: 'always'}}
        style={[styles.buttonContainer, styles.floatingButtonContainer, extraBottomStyle(props.extraBottom)]}
        pointerEvents='box-none'
    >
        <ActionButton {...props} />
    </SafeAreaView>
)

export const FloatingButton = (props: Props) => (
    <View
        style={[styles.buttonContainer, styles.floatingButtonContainer, extraBottomStyle(props.extraBottom)]}
        pointerEvents='box-none'
    >
        <ActionButton {...props} />
    </View>
)

export const NonFloatingButton = (props: Props) => (
    <View style={[styles.buttonContainer, extraBottomStyle(props.extraBottom)]}>
        <ActionButton {...props} />
    </View>
)

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
    },
    floatingButtonContainer: {
        position: 'absolute',
        bottom: DEFAULT_BOTTOM_STYLE,
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonEnabled: {
        backgroundColor: Colors.WHITE,
    },
    floatingButtonDisabled: {
        backgroundColor: Colors.VERY_LIGHT_GRAY,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.BLACK + '33',
    },
});
