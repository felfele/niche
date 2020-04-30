import * as React from 'react'
import { StyleSheet, ScrollView, Linking, Dimensions, View, TextInput } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader'
import { Colors, ComponentColors } from '../../styles';

import { RowItem } from '../components/RowButton';
import { RegularText } from '../components/Text';
import { TabBarPlaceholder, HeaderPlaceholder } from '../components/Placeholder';
import { TouchableView } from '../components/TouchableView';
import { Button } from '../components/Button'
import { useDispatch } from 'react-redux';
import { NavigationProp } from '../../navigationTypes';
import { clearSpaces, resetState } from '../../reducers';
import { areYouSureDialog } from '../../dialogs';

export const DebugScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    const dispatch = useDispatch()
    return (
        <>
            <ScreenHeader
                title='DEBUG'
                navigation={props.navigation}
            />
            <ScrollView style={{
                backgroundColor: ComponentColors.BACKGROUND_COLOR,
                paddingTop: 18,
            }}>
                <HeaderPlaceholder />

                <RowItem
                    title='Reset state'
                    buttonStyle='none'
                    onPress={async () => {
                        if (await areYouSureDialog('Are you sure you want to reset the state?')) {
                            dispatch(resetState())}
                        }
                    }
                />

                <RowItem
                    title='Delete all spaces'
                    buttonStyle='none'
                    onPress={async () => {
                        if (await areYouSureDialog('Are you sure you want to delete all spaces?')) {
                            dispatch(clearSpaces())}
                        }
                    }
                />

                <TabBarPlaceholder/>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    label: {
        paddingHorizontal: 9,
        paddingTop: 9,
        paddingBottom: 18,
        color: Colors.GRAY,
    },
    versionLabel: {
        color: ComponentColors.HINT_TEXT_COLOR,
        paddingTop: 8,
        paddingBottom: 10,
        paddingLeft: 10,
        fontSize: 14,
    },
    imagePickerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
    },
    imagePickerButton: {
        marginVertical: 18,
    },
    nameContainer: {
        padding: 18,
        width: '100%',
        height: 83,
        backgroundColor: Colors.WHITE,
        borderBottomColor: Colors.BLACK + '33',
        borderBottomWidth: 1,
        marginBottom: 60,
    },
    nameLabel: {
        fontSize: 12,
        color: Colors.GRAY,
    },
    nameInput: {
        paddingTop: 9,
        fontSize: 18,
    },

});
