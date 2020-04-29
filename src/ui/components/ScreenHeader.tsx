import * as React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native'
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
    const insets = useSafeArea();
    return (
        <SafeAreaView style={[styles.headerContainer, { paddingTop: insets.top }, props.style]}>
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
                <ButtonLabel label={
                        props.leftButton != null
                            ? props.leftButton.label
                            : props.navigation != null
                                ? HeaderDefaultLeftButtonIcon
                                : undefined
                    }
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
                    />
                }
            </View>
        </SafeAreaView>
    )
}

const ButtonLabel = (props: { label?: string | React.ReactNode }) => {
    return typeof props.label === 'string'
        ? <Text style={styles.headerButtonText}>
                {props.label}
            </Text>
        : <View>{props.label}</View>
    ;
};

const RightButton = (props: { onPress?: () => void, label?: string | React.ReactNode, testID?: string }) => {
    return (
        <TouchableView
            onPress={props.onPress}
            testID={props.testID}
            style={styles.rightButtonContainer}
            hitSlop={{...TOUCHABLE_VIEW_DEFAULT_HIT_SLOP, left: 10}}
        >
            <ButtonLabel label={props.label} />
        </TouchableView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 2 * NAVIGATION_BAR_HEIGHT,
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
    },
    headerButtonText: {
        fontFamily: 'NunitoSans-Regular',
        color: Colors.WHITE,
        fontSize: 14,
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
        fontSize: 14,
        color: ComponentColors.NAVIGATION_BUTTON_COLOR,
        textAlign: 'center',
    },
    rightButtonContainer: {
        marginLeft: 30,
    },
});
