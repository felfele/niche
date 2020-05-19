import * as React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, Text, Platform, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';

import { Colors, ComponentColors, NAVIGATION_BAR_HEIGHT } from '../../styles'
import { TouchableView, TOUCHABLE_VIEW_DEFAULT_HIT_SLOP } from './TouchableView'
import { NavigationProp } from '../../navigationTypes';

export interface ButtonProps {
    label: string | React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    testID?: string;
}

interface HeaderProps {
    leftButton?: ButtonProps;
    rightButton?: ButtonProps;
    title?: string;
    titleImage?: React.ReactNode;
    onPressTitle?: () => void;
    onLongPressTitle?: () => void;
    navigation?: NavigationProp<'Home'>;
    style?: StyleProp<ViewStyle>;
}

export type Props = HeaderProps;

const BUTTON_COLOR = ComponentColors.NAVIGATION_BUTTON_COLOR;

export const HeaderDefaultLeftButtonIcon = <Icon name={'arrow-left'} color={BUTTON_COLOR} size={24} />;

export const ScreenHeader = (props: Props) => {
    const insets = useSafeArea()
    return (
        <SafeAreaView style={[styles.headerContainer, { paddingTop: insets.top, height: NAVIGATION_BAR_HEIGHT + insets.top }, props.style]}>
            <StatusBar
                backgroundColor={ComponentColors.HEADER_COLOR}
                barStyle='dark-content'
                translucent={true}
            />
            <TouchableView onPress={
                    props.leftButton != null
                        ? props.leftButton.onPress
                        : props.navigation != null
                            ? () => props.navigation!.goBack()
                            : undefined
                }
                style={styles.leftContainer}
                testID={(props.leftButton && props.leftButton.testID) || 'NavigationHeader/LeftButton'}
            >
                <ButtonLabel
                    label={
                        props.leftButton != null
                            ? props.leftButton.label
                            : props.navigation != null
                                ? HeaderDefaultLeftButtonIcon
                                : undefined
                    }
                    disabled={props.leftButton?.disabled}
                />
            </TouchableView>
            <TouchableView
                onPress={props.onPressTitle}
                onLongPress={props.onLongPressTitle}
                style={styles.middleContainer}
            >
                {props.titleImage}
                <Text
                    style={styles.titleText}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >
                    {props.title ? props.title : ''}
                </Text>
            </TouchableView>
            <View style={styles.rightContainer}>
                {props.rightButton &&
                    <RightButton
                        onPress={props.rightButton.onPress}
                        label={props.rightButton.label}
                        testID={props.rightButton.testID || 'NavigationHeader/RightButton'}
                        disabled={props.rightButton.disabled}
                    />
                }
            </View>
        </SafeAreaView>
    )
}

const buttonLabelStyle = (disabled?: boolean) => disabled === true
    ? styles.headerButtonTextDisabled
    : undefined

const ButtonLabel = (props: { label?: string | React.ReactNode, disabled?: boolean }) => {
    return typeof props.label === 'string'
        ? <Text
            style={{
            ...styles.headerButtonText,
            ...buttonLabelStyle(props.disabled)
            }}
        >
                {props.label}
            </Text>
        : <View>{props.label}</View>
    ;
};

const RightButton = (props: ButtonProps) => {
    return (
        <TouchableView
            onPress={props.onPress}
            testID={props.testID}
            style={styles.rightButtonContainer}
            hitSlop={{...TOUCHABLE_VIEW_DEFAULT_HIT_SLOP, left: 10}}
        >
            <ButtonLabel label={props.label} disabled={props.disabled} />
        </TouchableView>
    );
};

const androidHeaderContainer = {
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: ComponentColors.HEADER_COLOR,
        zIndex: 100,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.3,
        shadowRadius: 0.5,
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        elevation: 1,
    },
    headerButtonText: {
        fontFamily: 'NunitoSans-Bold',
        color: ComponentColors.ACTIVE_BUTTON_COLOR,
        fontSize: 16,
    },
    headerButtonTextDisabled: {
        color: Colors.LIGHTISH_GRAY,
    },
    leftContainer: {
        flex: 1,
    },
    middleContainer: {
        maxWidth: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    titleText: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 16,
        color: ComponentColors.NAVIGATION_BUTTON_COLOR,
        textAlign: 'center',
    },
    rightButtonContainer: {
        marginLeft: 30,
    },
});
