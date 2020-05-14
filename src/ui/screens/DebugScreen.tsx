import * as React from 'react'
import { ScrollView } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader'
import { ComponentColors } from '../../styles';

import { RowItem } from '../components/RowButton';
import { TabBarPlaceholder, HeaderPlaceholder } from '../components/Placeholder';
import { useDispatch } from 'react-redux';
import { NavigationProp } from '../../navigationTypes';
import { clearSpaces, resetState } from '../../reducers';
import { areYouSureDialog } from '../../dialogs';

export const DebugScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    const dispatch = useDispatch()
    return (
        <>
            <ScreenHeader
                title='Debug'
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


