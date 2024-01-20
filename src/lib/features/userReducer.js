import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: { token: "", dbid: "" },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        clearToken: (state) => {
            state.token = ""
        },
        setUserDBID: (state, action) => {
            state.dbid = action.payload
        },
        clearUserDBID: (state) => {
            state.dbid = ""
        },
    },
})

// Extract and export each action creator by name
export const { setToken, clearToken, setUserDBID, clearUserDBID } = userSlice.actions
// Export the reducer, either as a default or named export
export default userSlice.reducer