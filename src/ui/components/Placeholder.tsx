import * as React from 'react';
import { View, Platform } from 'react-native';
import { TAB_BAR_HEIGHT, NAVIGATION_BAR_HEIGHT, ComponentColors } from '../../styles';
import { useSafeArea } from 'react-native-safe-area-context';

export const TabBarPlaceholder = (props: { color?: string }) => {
    if (Platform.OS === 'ios') {
        return (
            <View
                style={{
                    height: TAB_BAR_HEIGHT + 20,
                    backgroundColor: props.color ? props.color : ComponentColors.BACKGROUND_COLOR,
                }}
            />
        );

    } else {
        return null;
    }
};

export const HeaderPlaceholder = (props: { color?: string, extraHeight?: number }) => {
    const insets = useSafeArea()
    return (
        <View
            style={{
                height: NAVIGATION_BAR_HEIGHT + (Platform.OS === 'ios' ? insets.top : 0) + (props.extraHeight ?? 0),
                backgroundColor: props.color ? props.color : ComponentColors.BACKGROUND_COLOR,
            }}
        />

    )
}
