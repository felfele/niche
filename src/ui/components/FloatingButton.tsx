import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { CustomIcon } from './CustomIcon';
import { Colors } from '../../styles';
import { TouchableView } from './TouchableView';
import SafeAreaView from 'react-native-safe-area-view'

interface Props {
    onPress: () => void;
    iconName: string;
    iconSize?: number;
    extraBottom?: number;
}

const DEFAULT_BOTTOM_STYLE = 16;
const extraBottomStyle = (extraBottom?: number) => extraBottom != null
    ? {
        bottom: extraBottom + DEFAULT_BOTTOM_STYLE,
    }
    : undefined
;

const DEFAULT_ICON_SIZE = 36
const iconSize = (size?: number) => size != null ? size : DEFAULT_ICON_SIZE

const ActionButton = (props: Props) => (
    <TouchableView
        style={styles.floatingButton}
        onPress={props.onPress}
    >
        <CustomIcon name={props.iconName} size={iconSize(props.iconSize)} color={Colors.BLACK} />
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
        backgroundColor: Colors.WHITE,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        elevation: 2,
        paddingTop: 5,
    },
});
