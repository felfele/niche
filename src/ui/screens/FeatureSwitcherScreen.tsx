import * as React from 'react'
import { ScrollView } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader'
import { ComponentColors } from '../../styles';

import { RowItem } from '../components/RowButton';
import { TabBarPlaceholder, HeaderPlaceholder } from '../components/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp } from '../../navigationTypes';
import { toggleFeature } from '../../reducers';
import { State } from '../../state';

export const FeatureSwitcherScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    const dispatch = useDispatch()
    const features = useSelector((state: State) => state.features)
    const isNativeViewer = features.includes('native-viewer')
    return (
        <>
            <ScreenHeader
                title='Features'
                navigation={props.navigation}
            />
            <ScrollView style={{
                backgroundColor: ComponentColors.BACKGROUND_COLOR,
                paddingTop: 18,
            }}>
                <HeaderPlaceholder />

                <RowItem
                    title='Use native viewer'
                    buttonStyle='switch'
                    switchState={isNativeViewer}
                    onSwitchValueChange={() => dispatch(toggleFeature('native-viewer'))}
                />

                <TabBarPlaceholder/>
            </ScrollView>
        </>
    );
};


