import { HexString } from "./hex"
import { ImageData } from "./models/ImageData"

export interface Contact {
    name: string
    publicKey: HexString
    address: HexString
}

export interface Identity extends Contact {
    privateKey: HexString
}

export interface Work {
    description: string
    timestamp: number
    weight: number
}

export type ContactMap = {[publicKey: string]: Contact}

export interface Post {
    text: string
}

export interface Space {
    name: string
    description: string
    coverImage: ImageData
    id: HexString
    posts: Post[]
}

export interface State {
    identity: Identity
    contacts: ContactMap
    spaces: Space[]
}

export const defaultState: State = {
    identity: {
        name: '',
        address: '' as HexString,
        publicKey: '' as HexString,
        privateKey: '' as HexString,
    },
    contacts: {},
    spaces: [],
}
