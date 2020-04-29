import { ImageData } from './models/ImageData';
import { Platform, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export const FILE_PROTOCOL = 'file://';

// tslint:disable-next-line:no-var-requires
const RNFS = require('react-native-fs');
// tslint:disable-next-line:no-var-requires
const RNGRP = require('react-native-get-real-path');

interface Response {
    customButton: string;
    didCancel: boolean;
    error: string;
    data: string;
    uri: string;
    origURL?: string;
    isVertical: boolean;
    width: number;
    height: number;
    fileSize: number;
    type?: string;
    fileName?: string;
    path?: string;
    latitude?: number;
    longitude?: number;
    timestamp?: string;
}

interface CustomButtonOptions {
    name?: string;
    title?: string;
}

interface Options {
    title?: string;
    cancelButtonTitle?: string;
    takePhotoButtonTitle?: string;
    chooseFromLibraryButtonTitle?: string;
    customButtons?: Array<CustomButtonOptions>;
    cameraType?: 'front' | 'back';
    mediaType?: 'photo' | 'video' | 'mixed';
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    videoQuality?: 'low' | 'medium' | 'high';
    durationLimit?: number;
    rotation?: number;
    allowsEditing?: boolean;
    noData?: boolean;
    storageOptions?: StorageOptions;
}

interface StorageOptions {
    skipBackup?: boolean;
    path?: string;
    cameraRoll?: boolean;
    waitUntilSaved?: boolean;
}

const defaultImagePickerOptions: Options = {
    allowsEditing: false,
    noData: true,
    mediaType: 'photo',
    rotation: 360,
    storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        waitUntilSaved: true,
    },
};

const removePathPrefix = async (response: Response): Promise<string> => {
    if (Platform.OS === 'ios') {
        const documentPath = FILE_PROTOCOL + RNFS.DocumentDirectoryPath + '/';
        const path = response.uri;
        if (path.startsWith(documentPath)) {
            return path.substring(documentPath.length);
        }
    } else if (Platform.OS === 'android') {
        const filePath = await RNGRP.getRealPathFromURI(response.uri);
        return FILE_PROTOCOL + filePath;
    }
    return response.uri;
};

export const launchImageLibrary = (): Promise<ImageData | undefined> => {
    return launchPicker(launchImageLibraryWithPromise)
}

export const showImagePicker = (): Promise<ImageData | undefined> => {
    return launchPicker(showImagePickerWithPromise);
}

export const launchCamera = (): Promise<ImageData | undefined> => {
    return launchPicker(launchCameraWithPromise);
}

const launchPicker = async (pickerFunction: (options: Options) => Promise<Response>): Promise<ImageData | undefined> => {
    const response = await pickerFunction(defaultImagePickerOptions);
    if (response.error) {
        console.log('AsyncImagePicker.launchPicker', response.error);
        if (Platform.OS === 'ios') {
            Alert.alert('Allow permissions',
                '\nPlease go to Settings app, find Niche and enable access to photos',
            );
        }
        return undefined;
    }
    if (response.didCancel) {
        return undefined;
    }
    const uri = await removePathPrefix(response);
    console.log('launchPicker: ', {uri, response});
    const imageData: ImageData = {
        location: {
            path: uri,
        },
        width: response.width,
        height: response.height,
    };
    return imageData;
}

const launchImageLibraryWithPromise = (options: Options): Promise<Response> => {
    return new Promise((resolve, reject) => {
        ImagePicker.launchImageLibrary(options, resolve);
    });
}

const launchCameraWithPromise = (options: Options): Promise<Response> => {
    return new Promise((resolve, reject) => {
        ImagePicker.launchCamera(options, resolve);
    });
}

const showImagePickerWithPromise = (options: Options): Promise<Response> => {
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, resolve);
    });
}
