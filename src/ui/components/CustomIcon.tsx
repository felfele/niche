import * as React from 'react';
import { View } from 'react-native';
import { Colors } from '../../styles';
import ModernPictogramsProIcon from './ModernPictogramsProIcon'

export const CustomIcon = ModernPictogramsProIcon

export const CloseIcon = (props: {size: number, color?: string}) => (
    <View style={{
        width: props.size,
        height: props.size,
        left: 0,
    }}>
        <CustomIcon
            name='no'
            size={props.size}
            color={props.color != null ? props.color : Colors.BLACK}
        />
    </View>
);
