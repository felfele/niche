import * as React from 'react'
import { View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';

import { NavigationProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder, TabBarPlaceholder } from '../components/Placeholder'
import { ComponentColors, NAVIGATION_BAR_HEIGHT } from '../../styles'
import { GridCard, getGridCardSize } from '../components/GridCard';
import { FloatingButton } from '../components/FloatingButton';

const data = [
    {
        name: 'Komondor',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
    {
        name: 'Page title',
        url: '',
        feedUrl: '',
        favicon: '',
    },
]

export const SpacesScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    const itemDimension = getGridCardSize();
    return (
        <>
            <ScreenHeader
                title='SPACES'
            />
            <FlatGrid
                style={{ flex: 1, backgroundColor: ComponentColors.BACKGROUND_COLOR }}
                spacing={10}
                fixed={true}
                itemDimension={itemDimension}
                items={data}
                renderItem={({ item }: any) => {
                    return (
                        <GridCard
                            title={item.name}
                            onPress={() => {}}
                            size={itemDimension}
                            isSelected={false}
                        />
                    );
                }}
                ListFooterComponent={<TabBarPlaceholder color={ComponentColors.BACKGROUND_COLOR}/>}
                ListHeaderComponent={<HeaderPlaceholder extraHeight={25} />}
            />
            <FloatingButton
                iconName='plus'
                iconSize={48}
                onPress={() => props.navigation.navigate('CreateSpace')}
            />
        </>
    )
}
