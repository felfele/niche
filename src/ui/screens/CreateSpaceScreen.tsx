import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TextInput, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { FloatingButton } from '../components/FloatingButton';
import { NavigationProp } from '../../navigationTypes';
import { TouchableView } from '../components/TouchableView';
import { RegularText, BoldText } from '../components/Text';
import { Colors, ComponentColors } from '../../styles';
import { ScreenHeader } from '../components/ScreenHeader';
import Icon, { CloseIcon } from '../components/CustomIcon';
import { HeaderPlaceholder } from '../components/Placeholder';

interface StateProps {
    navigation: NavigationProp<'Home'>
}

// interface StatefulModalProps {
//     isVisible: boolean;
// }

// const ModalMenuItem = (props: {iconName: string, label: string, onPress: () => void}) => (
//     <View style={{
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         paddingVertical: 18,
//     }}>
//         <View style={{width: 45}}><Icon name={props.iconName} size={40} /></View>
//         <RegularText style={{fontSize: 18}}>{props.label}</RegularText>
//     </View>
// );

// const ModalMenuSeparator = () => <View style={{
//         borderBottomColor: Colors.BLACK + '26',
//         borderBottomWidth: 1,
//     }}/>
// ;

// class StatefulModal extends React.PureComponent<{}, StatefulModalProps> {
//     public state = {
//         isVisible: true,
//     };

//     public render() {
//         return (
//             <Modal
//                 isVisible={this.state.isVisible}
//                 onBackdropPress={() => this.setState({ isVisible: false })}
//                 backdropTransitionOutTiming={0}
//                 style={{
//                     justifyContent: 'flex-end',
//                     margin: 0,
//                 }}
//             >
//                 <SafeAreaView style={{
//                     position: 'absolute',
//                     bottom: 0,
//                     width: '100%',
//                     flex: 1,
//                     backgroundColor: ComponentColors.BACKGROUND_COLOR,
//                 }}>
//                     <View style={{flex: 1}}>
//                         <ModalMenuItem iconName='user_group' label='Take photo' onPress={() => {}} />
//                         <ModalMenuSeparator />
//                         <ModalMenuItem iconName='compose' label='Choose from Library' onPress={() => {}} />
//                     </View>
//                 </SafeAreaView>

//             </Modal>
//         );
//     }
// }

interface ValidatorState {
    title: string;
    description: string;
}

type ValidatorFunction = (state: ValidatorState) => boolean;

export class ValidatedCreatePage extends React.Component<StateProps & { isValid: ValidatorFunction}, ValidatorState> {
    public state = {
        title: '',
        description: '',
        picture: {},
    };

    public render() {
        return (
            <CreateSpaceView
                isValid={this.props.isValid(this.state)}
                navigation={this.props.navigation}
                navigateNext={navigation => navigation.navigate('Home')}
            />
        );
    }
}

export const CreateSpaceScreen = (props: StateProps) => (
    <ValidatedCreatePage
        {...props}
        isValid={(state) => state.title !== ''}
    />
);

interface ValidatorProps {
    isValid: boolean;
}

interface NavigationProps {
    navigateNext: (navigation: NavigationProp<'Home'>) => void;
}

interface ModalProps {
    isVisible: boolean;
    toggleModal: () => void;
    showModal: () => void;
    hideModal: () => void;
}

export const CreateSpaceView = (props: StateProps & ValidatorProps & NavigationProps) => (
    <>
        <ScreenHeader
            title='CREATE PAGE'
            navigation={props.navigation}
            leftButton={{
                label: <CloseIcon size={40} />,
                onPress: () => props.navigation.goBack(),
            }}
        />
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <ScrollView style={styles.scrollContainer}>
                <HeaderPlaceholder/>
                <TouchableView style={styles.coverImagePickerContainer}>
                    <View style={styles.coverImagePickerIconContainer}>
                        <Icon name='picture' size={48} color={Colors.LIGHTISH_GRAY} />
                    </View>
                    <BoldText style={styles.coverImagePickerLabel}>Add cover image</BoldText>
                </TouchableView>
                <View style={styles.pageTitleContainer}>
                    <RegularText style={styles.pageTitleLabel}>Page title</RegularText>
                    <TextInput
                        style={styles.pageTitleInput}
                        placeholder='Your title'
                        enablesReturnKeyAutomatically={true}
                        returnKeyType='next'
                    ></TextInput>
                </View>
                <View style={styles.pageDescriptionContainer}>
                    <RegularText style={styles.pageDescriptionLabel}>Description (optional)</RegularText>
                    <TextInput
                        style={styles.pageDescriptionInput}
                        placeholder='What is this page about?'
                        multiline={true}
                        numberOfLines={4}
                    ></TextInput>
                </View>
            </ScrollView>
            <FloatingButton
                iconName='arrow2_right3'
                iconSize={48}
                onPress={() => props.navigateNext(props.navigation)}
                enabled={props.isValid}
            />
        </KeyboardAvoidingView>
    </>
);

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: ComponentColors.BACKGROUND_COLOR,
    },
    scrollContainer: {
        flex: 1,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowRadius: 0.5,
    },
    coverImagePickerContainer: {
        width: windowWidth,
        height: windowWidth,
        backgroundColor: Colors.LIGHT_GRAY,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverImagePickerIconContainer: {
        width: 48,
        height: 48,
    },
    coverImagePickerLabel: {
        fontSize: 14,
        color: Colors.LIGHTISH_GRAY,
    },
    pageTitleContainer: {
        backgroundColor: Colors.WHITE,
        borderBottomColor: Colors.LIGHTER_GRAY,
        borderBottomWidth: 0.5,
    },
    pageTitleLabel: {
        paddingTop: 18,
        paddingLeft: 9,
        fontSize: 12,
        color: ComponentColors.LABEL_COLOR,
    },
    pageTitleInput: {
        paddingTop: 10,
        paddingLeft: 9,
        paddingBottom: 18,
        fontSize: 18,
        color: ComponentColors.TEXT_COLOR,
    },
    pageDescriptionContainer: {
        backgroundColor: Colors.WHITE,
        borderBottomColor: Colors.LIGHTER_GRAY,
        borderBottomWidth: 0.5,
    },
    pageDescriptionLabel: {
        paddingTop: 18,
        paddingLeft: 9,
        fontSize: 12,
        color: ComponentColors.LABEL_COLOR,
    },
    pageDescriptionInput: {
        paddingTop: 10,
        paddingLeft: 9,
        paddingBottom: 18,
        fontSize: 18,
        color: ComponentColors.TEXT_COLOR,
        height: 160,
    },

});
