import * as React from 'react'
import { View, StatusBar, Platform } from 'react-native'
import Modal from 'react-native-modal'

import { RegularText } from './Text'
import { CustomIcon } from './CustomIcon'
import { Colors, ComponentColors } from '../../styles'
import { useSafeArea } from 'react-native-safe-area-context'
import { TouchableView } from './TouchableView'

interface MenuItemProps {
    iconName: string
    iconSize: number
    label: string
    onPress: () => void
}

const ModalMenuItem = (props: MenuItemProps) => (
    <TouchableView
        style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 17,
        }}
        onPress={props.onPress}
    >
        <View style={{width: 40, alignItems: 'center', justifyContent: 'center'}}><CustomIcon name={props.iconName} size={props.iconSize} /></View>
        <RegularText style={{fontSize: 18}}>{props.label}</RegularText>
    </TouchableView>
)

const ModalMenuSeparator = () => <View style={{
        borderBottomColor: Colors.BLACK + '26',
        borderBottomWidth: 1,
    }}/>
;

export const ModalMenu = (props: {
    visible: boolean,
    onCancel: () => void,
    items: MenuItemProps[],
}) => {
    const insets = useSafeArea()
    return (
        <Modal
            isVisible={props.visible}
            onBackdropPress={props.onCancel}
            backdropTransitionOutTiming={0}
            animationOutTiming={0}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <StatusBar
                // hidden={Platform.OS === 'ios' ? true : false}
                // backgroundColor={'#4b4b4b'}
                // backgroundColor='rgba(255, 255, 255, 0)'
                barStyle='dark-content'
                translucent={true}
                // animated={true}
            />
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                paddingBottom: insets.bottom,
                flex: 1,
                backgroundColor: ComponentColors.BACKGROUND_COLOR,
            }}>
                <View style={{flex: 1}}>
                    {props.items.map((item, index) =>
                        <React.Fragment key={`modal-menu-item-${index}`}>
                            <ModalMenuItem
                                iconName={item.iconName}
                                iconSize={item.iconSize}
                                label={item.label}
                                onPress={item.onPress}
                             />
                            {index + 1 < props.items.length && <ModalMenuSeparator />}
                        </React.Fragment>
                    )}
                </View>
            </View>

        </Modal>
    )

}
