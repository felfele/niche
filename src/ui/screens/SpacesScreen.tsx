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
import { EmptyListPlaceholder } from '../components/EmptyListPlaceholder';

export const SpacesScreen = (props: {navigation: NavigationProp<'Home'>}) => {
    const spaces = useSelector((state: State) => state.spaces)
    const itemDimension = calculateGridCardSize();
    return (
        <>
            <ScreenHeader
                title='Spaces'
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
                            onPress={() => props.navigation.navigate('ViewSpace', {id: item.id})}
                            size={itemDimension}
                            isSelected={false}
                            image={item.coverImage}
                        />
                    );
                }}
                ListFooterComponent={<TabBarPlaceholder color={ComponentColors.BACKGROUND_COLOR}/>}
                ListHeaderComponent={<HeaderPlaceholder />}
                ListEmptyComponent={<EmptyListPlaceholder
                    title='Create your first space!'
                    text='Spaces in Felfele are always private, only invited people can access.'
                    explanation='E.g. “Kids photos”, “Ski trip” or “Yummy recipes”…'
                />}
            />
            <FloatingButton
                iconName='plus'
                onPress={() => props.navigation.navigate('CreateSpace')}
            />
        </>
    )
}
