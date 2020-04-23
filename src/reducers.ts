import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Identity, defaultState, State, ContactMap, Contact } from './state'

const identitySlice = createSlice({
    name: 'identity',
    initialState: defaultState.identity,
    reducers: {
        setIdentity(state: Identity, action: PayloadAction<Identity>) {
            state.name = action.payload.name
            state.seedMnemonic = action.payload.seedMnemonic
            state.publicKey = action.payload.publicKey
        },
        clearIdentity(state: Identity) {
            state.name = defaultState.identity.name
            state.seedMnemonic = defaultState.identity.seedMnemonic
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

export const { setIdentity, clearIdentity } = identitySlice.actions
export const { addContact, clearContacts } = contactsSlice.actions

const combinedReducers = combineReducers({
    identity: identitySlice.reducer,
    contacts: contactsSlice.reducer,
})

const loggingReducer = (state: RootState | undefined, action: PayloadAction<State>): RootState => {
    const startTime = Date.now()
    try {
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
export const rootReducer = loggingReducer
