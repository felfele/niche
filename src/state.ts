import { HexString } from "./hex"
import { ImageData } from "./models/ImageData"

export interface Contact {
    name: string
    image: ImageData
    address: HexString
    publicKey: HexString
}

export interface Identity extends Contact {
    privateKey: HexString
}

export type ContactMap = {[publicKey: string]: Contact}

export interface Author {
    name: string
    image: ImageData
    address: HexString
}

export interface Post {
    id: HexString
    text: string
    createdAt: number
    updatedAt: number
    images: ImageData[]
    author: Author
    comments: Post[]
}

export interface Space {
    name: string
    description: string
    coverImage: ImageData
    id: HexString
    posts: Post[]
}

export type FeatureName = 'native-viewer'

export interface State {
    identity: Identity
    contacts: ContactMap
    spaces: Space[]
    features: FeatureName[]
}

export const defaultImage: ImageData = {
    location: {
        path: '',
    },
    width: 0,
    height: 0,
}

export const defaultState: State = {
    identity: {
        name: '',
        image: defaultImage,
        address: '' as HexString,
        publicKey: '' as HexString,
        privateKey: '' as HexString,
    },
    contacts: {},
    spaces: [],
    features: [],
}
