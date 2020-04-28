import * as React from 'react'
import { FlatGrid } from 'react-native-super-grid';

import { NavigationProp } from '../../navigationTypes'
import { ScreenHeader } from '../components/ScreenHeader'
import { HeaderPlaceholder, TabBarPlaceholder } from '../components/Placeholder'
import { ComponentColors } from '../../styles'
import { GridCard, calculateGridCardSize } from '../components/GridCard';
import { FloatingButton } from '../components/FloatingButton';
import { useSelector } from 'react-redux';
import { State } from '../../state';

export const SpacesScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    const spaces = useSelector((state: State) => state.spaces)
    const itemDimension = calculateGridCardSize();
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
                items={spaces}
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
