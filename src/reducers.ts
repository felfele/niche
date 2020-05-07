import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Identity, defaultState, State, ContactMap, Contact, Space, Post } from './state'
import { HexString } from './hex'

const identitySlice = createSlice({
    name: 'identity',
    initialState: defaultState.identity,
    reducers: {
        setIdentity(state: Identity, action: PayloadAction<Identity>) {
            state.name = action.payload.name
            state.publicKey = action.payload.publicKey
            state.address = action.payload.address
            state.image = action.payload.image
            state.privateKey = action.payload.privateKey
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
        removeSpace(state: Space[], action: PayloadAction<{spaceId: HexString}>) {
            const spaceIndex = state.findIndex(s => s.id === action.payload.spaceId)
            if (spaceIndex !== -1) {
                state.splice(spaceIndex, 1)
            }
        },
        addPostToSpace(state: Space[], action: PayloadAction<{spaceId: HexString, post: Post}>) {
            const space = state.find(s => s.id === action.payload.spaceId)
            if (space != null) {
                space.posts.unshift(action.payload.post)
            }
        },
        removePostFromSpace(state: Space[], action: PayloadAction<{spaceId: HexString, postId: HexString}>) {
            const space = state.find(s => s.id === action.payload.spaceId)
            if (space != null) {
                const postIndex = space.posts.findIndex(p => p.id === action.payload.postId)
                if (postIndex !== -1) {
                    space.posts.splice(postIndex, 1)
                }
            }
        },
        addCommentToPost(state: Space[], action: PayloadAction<{spaceId: HexString, postId: HexString, post: Post}>) {
            const space = state.find(s => s.id === action.payload.spaceId)
            if (space != null) {
                const post = space.posts.find(p => p.id === action.payload.postId)
                if (post != null) {
                    post.comments.unshift(action.payload.post)
                }
            }
        },
        updatePost(state: Space[], action: PayloadAction<{spaceId: HexString, post: Post}>) {
            const space = state.find(s => s.id === action.payload.spaceId)
            if (space != null) {
                const postIndex = space.posts.findIndex(p => p.id === action.payload.post.id)
                if (postIndex !== -1) {
                    space.posts.splice(postIndex, 1, action.payload.post)
                }
            }
        },
        updateComment(state: Space[], action: PayloadAction<{spaceId: HexString, postId: HexString, comment: Post}>) {
            const post = state
                .find(s => s.id === action.payload.spaceId)
                ?.posts
                .find(p => p.id === action.payload.postId)

            if (post != null) {
                const commentIndex = post.comments.findIndex(c => c.id === action.payload.comment.id)
                if (commentIndex !== -1) {
                    post.comments.splice(commentIndex, 1, action.payload.comment)
                }
            }
        },
        clearSpaces(state: Space[]) {
            state.splice(0)
        }
    }
})

export const { setIdentity, clearIdentity } = identitySlice.actions
export const { addContact, clearContacts } = contactsSlice.actions
export const {
    addSpace,
    removeSpace,
    clearSpaces,
    addPostToSpace,
    removePostFromSpace,
    addCommentToPost,
    updatePost,
    updateComment,
} = spacesSlice.actions

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
