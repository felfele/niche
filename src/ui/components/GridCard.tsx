import * as React from 'react';
import { TouchableView, ZERO_HIT_SLOP } from './TouchableView';
import {
    Image,
    View,
    GestureResponderEvent,
    StyleSheet,
    Dimensions,
    StyleProp,
    ImageStyle,
} from 'react-native';
import { Colors } from '../../styles';
import { MediumText, BoldText } from './Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageDataView } from './ImageDataView';
import { ImageData } from '../../models/ImageData';

interface Props {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    imageStyle?: StyleProp<ImageStyle>;
    size: number;
    isSelected: boolean;
    image?: ImageData;
}

export const GRID_SPACING = 10;
export const GRID_CARD_COUNT_IN_ROW = 2;

export const calculateGridCardSize = () => {
    const windowWidth = Dimensions.get('window').width;
    return Math.floor((windowWidth - GRID_SPACING * (GRID_CARD_COUNT_IN_ROW + 1)) / GRID_CARD_COUNT_IN_ROW);
};

export const GridCard = React.memo((props: Props) => (
    <TouchableView style={styles.feedCard} onPress={props.onPress} hitSlop={ZERO_HIT_SLOP}>
        <ImageDataView
            source={props.image}
            style={[{
                width: props.size,
                height: props.size,
            }, props.imageStyle]}
        />
        <View style={styles.feedCardTextContainer}>
            <BoldText
                style={styles.feedCardText}
                ellipsizeMode='tail'
                numberOfLines={1}
            >
                {props.title}
            </BoldText>
        </View>
        {props.isSelected &&
            <View style={styles.feedCardOverlay}>
                <Icon name='check' color={Colors.WHITE} size={48} />
            </View>
        }
    </TouchableView>
));

const styles = StyleSheet.create({
    label: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 7,
        color: Colors.GRAY,
    },
    feedCard: {
        backgroundColor: Colors.WHITE,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.4,
        shadowRadius: 0.6,
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
    },
    feedCardOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: 'rgba(98, 0, 234, 0.5)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedCardOverlayText: {
        color: Colors.WHITE,
        fontSize: 14,
    },
    feedCardText: {
        color: Colors.DARK_GRAY,
        fontSize: 14,
    },
    feedCardTextContainer: {
        height: 30,
        alignItems: 'center',
        marginHorizontal: 10,
        justifyContent: 'center',
    },
});
