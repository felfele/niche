import { HexString } from "./hex"

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

export interface Transaction {
    contact: Contact
    work: Work
    hash: HexString
    previousHash: HexString
    envelopes: string
}

export type ContactMap = {[publicKey: string]: Contact}

export interface Space {
    name: string
    description: string
}

export interface State {
    identity: Identity
    history: Transaction[]
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
    history: [],
    contacts: {},
    spaces: [],
}
