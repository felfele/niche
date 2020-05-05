import * as React from 'react';
import { View } from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../icomoon.json';
import { Colors } from '../../styles';

export const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);

export const CloseIcon = (props: {size: number, color?: string}) => (
    <View style={{
        width: props.size,
        height: props.size,
        paddingLeft: -30,
    }}>
        <CustomIcon
            name='arrow1_close'
            size={props.size}
            color={props.color != null ? props.color : Colors.BLACK}
        />
    </View>
);
