import { createSlice } from '@reduxjs/toolkit'

const UserInit = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: UserInit,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer
