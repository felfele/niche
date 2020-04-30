import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Identity, defaultState, State, ContactMap, Contact, Space } from './state'

const identitySlice = createSlice({
    name: 'identity',
    initialState: defaultState.identity,
    reducers: {
        setIdentity(state: Identity, action: PayloadAction<Identity>) {
            state.name = action.payload.name
            state.publicKey = action.payload.publicKey
        },
        clearIdentity(state: Identity) {
            state.name = defaultState.identity.name
            state.publicKey = defaultState.identity.publicKey
        }
    }
})

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: defaultState.contacts,
    reducers: {
        addContact(state: ContactMap, action: PayloadAction<Contact>) {
            if (state[action.payload.publicKey] == null) {
                state[action.payload.publicKey] = action.payload
            }
        },
        clearContacts(state: ContactMap) {
            state = {}
        }
    }
})

const spacesSlice = createSlice({
    name: 'spaces',
    initialState: defaultState.spaces,
    reducers: {
        addSpace(state: Space[], action: PayloadAction<Space>) {
            state.push(action.payload)
        },
        clearSpaces(state: Space[]) {
            state.splice(0)
        }
    }
})

export const { setIdentity, clearIdentity } = identitySlice.actions
export const { addContact, clearContacts } = contactsSlice.actions
export const { addSpace, clearSpaces } = spacesSlice.actions

export const resetState = () => ({
    type: 'RESET-STATE',
})

const combinedReducers = combineReducers({
    identity: identitySlice.reducer,
    contacts: contactsSlice.reducer,
    spaces: spacesSlice.reducer,
})

const stateReducer = (state: RootState | undefined, action: PayloadAction<State>): RootState => {
    const startTime = Date.now()
    try {
        if (action.type == 'RESET-STATE') {
            return defaultState
        }
        const newState = combinedReducers(state, action)
        if (action.type !== 'TIME-TICK') {
            const elapsed = Date.now() - startTime
            // tslint:disable-next-line:no-console
            console.log('appStateReducer', 'elapsed', elapsed, 'action', action, 'newState', newState)
        }
        return newState
    } catch (e) {
        console.log('reducer error: ', e)
        return state ?? defaultState
    }
}

export type RootState = ReturnType<typeof combinedReducers>
export const rootReducer = stateReducer
