import * as React from 'react';
import { View, Platform } from 'react-native';
import { TAB_BAR_HEIGHT, NAVIGATION_BAR_HEIGHT, ComponentColors } from '../../styles';

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

export const HeaderPlaceholder = (props: { color?: string }) => (
    <View
        style={{
            height: NAVIGATION_BAR_HEIGHT + (Platform.OS === 'ios' ? 20 : 0),
            backgroundColor: props.color ? props.color : ComponentColors.BACKGROUND_COLOR,
        }}
    />
)
